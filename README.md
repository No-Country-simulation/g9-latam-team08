# API Python/Flask - Sistema de Alerta Financiera Temprana
Proyecto de No Country enfocado en desarrollar una herramienta de gestion de finanzas para usuarios.
# Descripción del Proyecto
Esta API en Python se encarga de procesar cálculos financieros, evaluar ratios de salud económica y realizar inferencias utilizando modelos de Machine Learning (descargados dinámicamente desde Oracle Cloud Infrastructure Object Storage).

## 🛠️ Tecnologías Utilizadas
* **Python** - Lenguaje principal de programación.
* **Flask** - Microframework para la creación de la API REST.
* **Pandas** - Manipulación y análisis de estructuras de datos.
* **Scikit-learn / Joblib** - Carga y ejecución de modelos predictivos de Machine Learning.
* **Requests** - Gestión de peticiones HTTP para descarga dinámica de artefactos.
* **OCI Object Storage** - Almacenamiento en la nube para los modelos `.pkl`.

## 🚀 Endpoints Disponibles
### Predecir Categoría de Gasto
* **URL:** `/predict/categoria`
* **Método:** `POST`
* **Descripción:** Recibe los datos de un gasto en formato JSON y devuelve la categoría predicha por el modelo de Machine Learning.
* **Cuerpo de la petición (Ejemplo):**
  ```json
  {
    "nombre_tienda": "Supermercado",
    "monto": 1500.0,
    "metodo_pago": "Tarjeta",
    "esencial": true
  }
* Respuesta exitosa (200 Ok):
  ```json
  {
    "categoria_predicha": "Alimentacion"
  }
### Calcular Finanzas y Perfil de Riesgo
* **URL:** /calcular-finanzas
* **Método:** POST
* **Descripción:** Procesa los ingresos, gastos y ahorros, calcula los ratios financieros correspondientes (supervivencia, endeudamiento, etc.) y evalúa el perfil de riesgo mediante un modelo predictivo.
* **Cuerpo de la petición (Ejemplo):**
  ```json
  {
    "ingreso_mensual_fijo": 500000,
    "ingreso_mensual_variable": 50000,
    "gastos_esenciales_mensuales": 200000,
    "gastos_no_esenciales_mensuales": 50000,
    "cuotas_mensuales_deuda": 30000,
    "ahorro_previo": 100000
  }

* **Respuesta exitosa (200 OK):** Retorna el objeto JSON original enriquecido con los cálculos, ratios y el campo "perfil_financiero" determinado por el modelo.

## Instalación y Ejecución Local
**Clona el repositorio en tu equipo local:**

   ```bash
   https://github.com/No-Country-simulation/g9-latam-team08.git 
    cd g9-latam-team08
```
(OPCIONAL) Crea y activa un entorno virtual (opcional pero recomendado):

  ```bash
    python -m venv venv
    # En Windows:
    venv\Scripts\activate
    # En macOS / Linux:
    source venv/bin/activate
 ``` 
**Instala las dependencias necesarias ejecutando el siguiente comando:**

  ```bash
  pip install flask pandas requests joblib scikit-learn
```

**Ejecuta la aplicación:**

  ```text
  python app.py
```

(Por defecto, la API se hostea en el puerto 500)

