import io
import os
import pickle
import tempfile

import joblib
import numpy as np
import pandas as pd
import requests
import tensorflow as tf
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from tensorflow.keras import layers
from tensorflow.keras.models import load_model

load_dotenv()

app = Flask(__name__)

OCI_BASE_URL = os.getenv("OCI_BASE_URL", "").rstrip("/") + "/"
OCI_ARTEFACTOS_PATH = os.getenv(
    "OCI_ARTEFACTOS_PATH", "clasificacion-gastos/artefactos_categoria.pkl"
)
OCI_MODELO_CATEGORIA_PATH = os.getenv(
    "OCI_MODELO_CATEGORIA_PATH", "clasificacion-gastos/modelo_categoria_full.keras"
)
OCI_MODELO_RIESGO_PATH = os.getenv(
    "OCI_MODELO_RIESGO_PATH", "clasificacion-perfil/modelo_riesgo_financiero.pkl"
)

modelo_categoria = None
label_encoder = None
modelo_riesgo = None
vectorize_layer = None


def descargar(path):
    if not OCI_BASE_URL.strip("/"):
        raise RuntimeError("OCI_BASE_URL no está configurada")
    response = requests.get(OCI_BASE_URL + path.lstrip("/"), timeout=120)
    response.raise_for_status()
    return response.content


def cargar_modelos():
    global modelo_categoria, label_encoder, modelo_riesgo, vectorize_layer

    artefactos = pickle.loads(descargar(OCI_ARTEFACTOS_PATH))
    label_encoder = artefactos["label_encoder"]
    vocabulario = artefactos["config_vectorizador"]["vocabulario"]
    vectorize_layer = layers.TextVectorization(
        max_tokens=5000, output_mode="int", output_sequence_length=5
    )
    vectorize_layer.set_vocabulary(vocabulario)

    modelo_bytes = descargar(OCI_MODELO_CATEGORIA_PATH)
    with tempfile.NamedTemporaryFile(suffix=".keras", delete=False) as model_file:
        model_file.write(modelo_bytes)
        model_path = model_file.name
    try:
        modelo_categoria = load_model(model_path)
    finally:
        os.unlink(model_path)

    modelo_riesgo = joblib.load(io.BytesIO(descargar(OCI_MODELO_RIESGO_PATH)))
    print("Modelos ML cargados correctamente", flush=True)


def normalizar_esencial(valor):
    if isinstance(valor, bool):
        return 1.0 if valor else 0.0
    if isinstance(valor, str):
        return float(
            {"si": 1, "sí": 1, "true": 1, "1": 1, "no": 0, "false": 0, "0": 0}
            .get(valor.strip().lower(), 0)
        )
    return float(valor or 0)


@app.post("/predict/categoria")
def predecir_categoria():
    if modelo_categoria is None or label_encoder is None:
        return jsonify({"error": "Modelo de categoría no disponible"}), 503
    try:
        data = request.get_json(silent=True) or {}
        prediccion = modelo_categoria.predict(
            {
                "input_nombre": tf.constant([data.get("nombre_tienda", "")]),
                "input_subcategoria": tf.constant([data.get("subcategoria", "")]),
                "input_esencial": tf.constant(
                    [[normalizar_esencial(data.get("esencial", False))]],
                    dtype=tf.float32,
                ),
            },
            verbose=0,
        )
        indice = int(np.argmax(prediccion[0]))
        return jsonify(
            {
                "categoria_predicha": label_encoder.inverse_transform([indice])[0],
                "confianza": round(float(prediccion[0][indice]), 4),
            }
        )
    except Exception as error:
        return jsonify({"error": str(error)}), 400


def perfil_desde_score(meses, ahorro_ratio, deuda_ratio):
    supervivencia = 0 if meses == 0 else 15 if meses <= 3 else 25 if meses <= 6 else 35
    ahorro = 0 if ahorro_ratio < 0 else 15 if ahorro_ratio <= 0.10 else 25 if ahorro_ratio <= 0.20 else 35
    deuda = 0 if deuda_ratio > 0.36 else 15 if deuda_ratio > 0.20 else 30
    return supervivencia, ahorro, deuda


@app.post("/calcular-finanzas")
def calcular_finanzas():
    data = request.get_json(silent=True) or {}
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    ingreso_fijo = data.get("ingreso_mensual_fijo", 0) or 0
    ingreso_variable = data.get("ingreso_mensual_variable", 0) or 0
    esenciales = data.get("gastos_esenciales_mensuales", 0) or 0
    no_esenciales = data.get("gastos_no_esenciales_mensuales", 0) or 0
    deuda = data.get("cuotas_mensuales_deuda", 0) or 0
    ahorro_previo = data.get("ahorro_previo", 0) or 0
    ingreso = ingreso_fijo + ingreso_variable
    gastos = esenciales + no_esenciales + deuda
    ahorro = ingreso - gastos
    ahorro_total = ahorro + ahorro_previo
    meses = int(ahorro_total / (esenciales + deuda)) if esenciales + deuda > 0 else 0
    ahorro_ratio = ahorro / ingreso if ingreso > 0 else 0.0
    deuda_ratio = deuda / ingreso if ingreso > 0 else 0.0
    score_supervivencia, score_ahorro, score_deuda = perfil_desde_score(
        meses, ahorro_ratio, deuda_ratio
    )
    perfil = "En Observación"
    if modelo_riesgo is not None:
        features = pd.DataFrame(
            [[meses, score_supervivencia, score_ahorro, score_deuda,
              score_supervivencia + score_ahorro + score_deuda]],
            columns=[
                "meses_supervivencia", "score_supervivencia", "score_ahorro",
                "score_endeudamiento", "score_financiero",
            ],
        )
        resultado = str(modelo_riesgo.predict(features)[0]).lower()
        if "saludable" in resultado:
            perfil = "Saludable"
        elif "riesgo" in resultado:
            perfil = "En riesgo"

    data.update(
        ingreso_mensual=ingreso,
        gastos_totales_del_mes=gastos,
        ahorro_mensual=ahorro,
        ahorro_total=ahorro_total,
        ratio_ahorro_neto=round(ahorro_ratio * 100, 2),
        ratio_endeudamiento_dti=round(deuda_ratio * 100, 2),
        gastos_esenciales_ratio=round(esenciales / ingreso * 100, 2) if ingreso > 0 else 0.0,
        gastos_estilo_vida_ratio=round(no_esenciales / ingreso * 100, 2) if ingreso > 0 else 0.0,
        meses_supervivencia=meses,
        perfil_financiero=perfil,
    )
    return jsonify(data)


@app.get("/health")
def health_check():
    models_loaded = modelo_categoria is not None and modelo_riesgo is not None and label_encoder is not None
    return jsonify(
        {
            "status": "ok" if models_loaded else "starting",
            "modelo_categoria": modelo_categoria is not None,
            "modelo_riesgo": modelo_riesgo is not None,
            "label_encoder": label_encoder is not None,
        }
    ), 200 if models_loaded else 503


if __name__ == "__main__":
    cargar_modelos()
    app.run(host="0.0.0.0", port=5000, debug=False)
