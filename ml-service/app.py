import os
import io
import tempfile
import joblib
import pickle
import numpy as np
import pandas as pd
import requests
import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.models import load_model
from flask import Flask, jsonify, request
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# URLs desde .env
OCI_BASE_URL = os.getenv("OCI_BASE_URL", "")
OCI_ARTEFACTOS_PATH = os.getenv("OCI_ARTEFACTOS_PATH", "clasificacion-gastos/artefactos_categoria.pkl")
OCI_MODELO_CATEGORIA_PATH = os.getenv("OCI_MODELO_CATEGORIA_PATH", "clasificacion-gastos/modelo_categoria_full.keras")
OCI_MODELO_RIESGO_PATH = os.getenv("OCI_MODELO_RIESGO_PATH", "clasificacion-perfil/modelo_riesgo_financiero.pkl")

# MODELOS (se cargan al iniciar)
modelo_categoria = None
label_encoder = None
vocabulario = None
vectorize_layer = None
modelo_riesgo = None


def cargar_modelos():
    """Descarga y carga los modelos al iniciar la app."""
    global modelo_categoria, label_encoder, vocabulario, vectorize_layer, modelo_riesgo

    try:
        # 1. Descargar artefactos de categorización (label_encoder + vocabulario)
        url_artefactos = OCI_BASE_URL + OCI_ARTEFACTOS_PATH
        print(f"Descargando artefactos de categorización...")
        resp = requests.get(url_artefactos)
        resp.raise_for_status()
        artefactos = pickle.loads(resp.content)
        label_encoder = artefactos['label_encoder']
        vocabulario = artefactos['config_vectorizador']['vocabulario']
        print(f"  Clases: {list(label_encoder.classes_)}")
        print(f"  Vocabulario: {len(vocabulario)} tokens")

        # Reconstruir TextVectorization layer
        vectorize_layer = layers.TextVectorization(
            max_tokens=5000,
            output_mode='int',
            output_sequence_length=5
        )
        vectorize_layer.set_vocabulary(vocabulario)

        # 2. Descargar modelo Keras de categorización
        url_modelo_cat = OCI_BASE_URL + OCI_MODELO_CATEGORIA_PATH
        print(f"Descargando modelo Keras de categorización...")
        resp_model = requests.get(url_modelo_cat)
        resp_model.raise_for_status()

        # Guardar temporalmente para cargar con Keras
        with tempfile.NamedTemporaryFile(suffix='.keras', delete=False) as tmp:
            tmp.write(resp_model.content)
            tmp_path = tmp.name

        modelo_categoria = load_model(tmp_path)
        os.unlink(tmp_path)
        print("  Modelo de categorización cargado!")

        # 3. Descargar modelo de perfil financiero (RandomForest)
        url_riesgo = OCI_BASE_URL + OCI_MODELO_RIESGO_PATH
        print(f"Descargando modelo de perfil financiero...")
        resp_riesgo = requests.get(url_riesgo)
        resp_riesgo.raise_for_status()
        modelo_riesgo = joblib.load(io.BytesIO(resp_riesgo.content))
        print("  Modelo de riesgo financiero cargado!")

        print("\nModelos cargados exitosamente!")
    except Exception as e:
        print(f"Error al cargar modelos: {e}")


def normalizar_esencial(valor):
    """Convierte 'esencial' (si/no, true/false, 1/0) a float 0/1."""
    mapa = {'si': 1, 'sí': 1, 'true': 1, '1': 1, 'no': 0, 'false': 0, '0': 0}
    if isinstance(valor, (bool,)):
        return 1.0 if valor else 0.0
    if isinstance(valor, str):
        return float(mapa.get(valor.strip().lower(), 0))
    return float(valor) if valor else 0.0


@app.route("/predict/categoria", methods=["POST"])
def predecir_categoria():
    """Predice la categoría principal de un gasto usando el modelo Transformer."""
    if modelo_categoria is None or label_encoder is None:
        return jsonify({"error": "Modelo de categoría no disponible"}), 500

    try:
        data = request.get_json()
        nombre_tienda = data.get("nombre_tienda", "")
        subcategoria = data.get("subcategoria", "")
        esencial = data.get("esencial", False)

        # Preparar inputs para el modelo
        input_nombre = tf.constant([nombre_tienda], dtype=tf.string)
        input_subcategoria = tf.constant([subcategoria], dtype=tf.string)
        input_esencial = tf.constant([[normalizar_esencial(esencial)]], dtype=tf.float32)

        # Predecir
        pred = modelo_categoria.predict(
            {'input_nombre': input_nombre, 'input_subcategoria': input_subcategoria, 'input_esencial': input_esencial},
            verbose=0
        )

        idx = np.argmax(pred[0])
        categoria = label_encoder.inverse_transform([idx])[0]
        confianza = float(pred[0][idx])

        return jsonify({
            "categoria_predicha": categoria,
            "confianza": round(confianza, 4)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/calcular-finanzas", methods=["POST"])
def calcular_finanzas():
    """Calcula indicadores financieros y predice el perfil financiero."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    # Variables de entrada
    ingreso_fijo = data.get("ingreso_mensual_fijo", 0) or 0
    ingreso_variable = data.get("ingreso_mensual_variable", 0) or 0
    gastos_esenciales = data.get("gastos_esenciales_mensuales", 0) or 0
    gastos_no_esenciales = data.get("gastos_no_esenciales_mensuales", 0) or 0
    cuotas_deuda = data.get("cuotas_mensuales_deuda", 0) or 0
    ahorro_previo = data.get("ahorro_previo", 0) or 0

    # Cálculos
    ingreso_mensual = ingreso_fijo + ingreso_variable
    gastos_totales_del_mes = gastos_esenciales + gastos_no_esenciales + cuotas_deuda
    ahorro_mensual = ingreso_mensual - gastos_totales_del_mes
    ahorro_total = ahorro_mensual + ahorro_previo

    # Ratios
    ratio_ahorro_neto = ((ahorro_mensual / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    ratio_endeudamiento_dti = ((cuotas_deuda / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    gastos_esenciales_ratio = ((gastos_esenciales / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    gastos_estilo_vida_ratio = ((gastos_no_esenciales / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)

    # Meses de supervivencia
    denominador_supervivencia = gastos_esenciales + cuotas_deuda
    meses_supervivencia = (
        int(ahorro_total / denominador_supervivencia)
        if denominador_supervivencia > 0
        else 0
    )

    # Predicción del perfil financiero con modelo ML
    perfil_financiero = "En Observación"
    if modelo_riesgo is not None:
        try:
            # Convertir ratios a decimal (0-1) como se entrenó el modelo
            ratio_ahorro_decimal = ratio_ahorro_neto / 100.0
            ratio_dti_decimal = ratio_endeudamiento_dti / 100.0

            # score_supervivencia (máx 35 pts)
            if meses_supervivencia == 0:
                score_supervivencia = 0
            elif meses_supervivencia <= 3:
                score_supervivencia = 15
            elif meses_supervivencia <= 6:
                score_supervivencia = 25
            else:
                score_supervivencia = 35

            # score_ahorro (máx 35 pts)
            if ratio_ahorro_decimal < 0:
                score_ahorro = 0
            elif ratio_ahorro_decimal <= 0.10:
                score_ahorro = 15
            elif ratio_ahorro_decimal <= 0.20:
                score_ahorro = 25
            else:
                score_ahorro = 35

            # score_endeudamiento (máx 30 pts)
            if ratio_dti_decimal > 0.36:
                score_endeudamiento = 0
            elif ratio_dti_decimal > 0.20:
                score_endeudamiento = 15
            else:
                score_endeudamiento = 30

            # score_financiero = suma de scores (máx 100)
            score_financiero = score_supervivencia + score_ahorro + score_endeudamiento
            score_financiero = max(score_financiero, 0)

            # Enviar al modelo
            features = pd.DataFrame([[
                meses_supervivencia,
                score_supervivencia,
                score_ahorro,
                score_endeudamiento,
                score_financiero,
            ]], columns=[
                "meses_supervivencia",
                "score_supervivencia",
                "score_ahorro",
                "score_endeudamiento",
                "score_financiero",
            ])

            prediccion = modelo_riesgo.predict(features)
            resultado = str(prediccion[0]).strip().lower()

            if "saludable" in resultado:
                perfil_financiero = "Saludable"
            elif "riesgo" in resultado:
                perfil_financiero = "En riesgo"
            else:
                perfil_financiero = "En Observación"
        except Exception as e:
            print(f"Error en predicción del modelo: {e}")

    # Respuesta
    data["ingreso_mensual"] = ingreso_mensual
    data["gastos_totales_del_mes"] = gastos_totales_del_mes
    data["ahorro_mensual"] = ahorro_mensual
    data["ahorro_total"] = ahorro_total
    data["ratio_ahorro_neto"] = round(ratio_ahorro_neto, 2)
    data["ratio_endeudamiento_dti"] = round(ratio_endeudamiento_dti, 2)
    data["gastos_esenciales_ratio"] = round(gastos_esenciales_ratio, 2)
    data["gastos_estilo_vida_ratio"] = round(gastos_estilo_vida_ratio, 2)
    data["meses_supervivencia"] = meses_supervivencia
    data["perfil_financiero"] = perfil_financiero

    return jsonify(data), 200


@app.route("/health", methods=["GET"])
def health_check():
    """Endpoint de salud."""
    return jsonify({
        "status": "ok",
        "modelo_categoria": modelo_categoria is not None,
        "modelo_riesgo": modelo_riesgo is not None,
        "label_encoder": label_encoder is not None
    }), 200


if __name__ == "__main__":
    cargar_modelos()
    app.run(host="0.0.0.0", port=5000, debug=True)
