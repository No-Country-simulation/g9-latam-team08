# LIBRERIAS
import os
import joblib
from flask import Flask, jsonify, request
app = Flask(__name__)
# MODELO
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'modelo_financiero.pkl')

# CARGA DE MODELO
try:
  modelo = joblib.load(
      MODEL_PATH
  ) 
  print("Modelo cargado exitosamente")
except Exception as e:
  print(f"Error al cargar el modelo .pkl: {e}")
  modelo = None


@app.route("/calcular-finanzas", methods=["POST"])
def calcular_finanzas():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400

    # DEF de Variables
    ingreso_fijo = data.get("ingreso_mensual_fijo", 0) or 0
    ingreso_variable = data.get("ingreso_mensual_variable", 0) or 0
    gastos_esenciales = data.get("gastos_esenciales_mensuales", 0) or 0
    gastos_no_esenciales = data.get("gastos_no_esenciales_mensuales", 0) or 0
    cuotas_deuda = data.get("cuotas_mensuales_deuda", 0) or 0
    modalidad_pago_tarjeta = data.get("modalidad_pago_tarjeta", "sin_deuda")
    ahorro_previo = data.get("ahorro_previo", 0) or 0
    frecuencia_transacciones_ocio = (data.get("frecuencia_transacciones_ocio", 0) or 0)

    # Calculos:
    ingreso_mensual = ingreso_fijo + ingreso_variable

    gastos_totales_del_mes = gastos_esenciales + gastos_no_esenciales + cuotas_deuda

    ahorro_mensual = ingreso_mensual - gastos_totales_del_mes

    ahorro_total = ahorro_mensual + ahorro_previo
    # RATIOS
    ratio_ahorro_neto = ((ahorro_mensual / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    ratio_endeudamiento_dti = ((cuotas_deuda / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    gastos_esenciales_ratio = ((gastos_esenciales / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)
    gastos_estilo_vida_ratio = ((gastos_no_esenciales / ingreso_mensual) * 100 if ingreso_mensual > 0 else 0.0)

    # Formula de Resilencia
    denominador_supervivencia = gastos_esenciales + cuotas_deuda
    meses_supervivencia = (
        int(ahorro_total / denominador_supervivencia)
        if denominador_supervivencia > 0
        else 0
    )

    # Prediccion del perfil financiero
    perfil_financiero = "En Observación" # VALOR PREDETERMINADO

    if modelo is not None:
        try:
            # Variables a enviar al modelo
            features = [[
                ingreso_mensual,
                gastos_totales_del_mes,
                ahorro_mensual,
                ratio_endeudamiento_dti,
                ratio_ahorro_neto,
                meses_supervivencia,
            ]]
            prediccion = modelo.predict(features)
            perfil_financiero = str(prediccion[0])
        except Exception as e:
            print(f"Error al ejecutar la prediccion del modelo: {e}")

    # ENVIO DE DATOS
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == '__main__':
  # Corre en el puerto 5000 por defecto
  app.run(host='0.0.0.0', port=5000, debug=True)