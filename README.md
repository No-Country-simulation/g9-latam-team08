# g9-latam-team08
Proyecto de No Country enfocado en desarrollar una herramienta de gestion de finanzas para usuarios.
# Descripción del Proyecto
Esta API en Python se encarga de procesar cálculos financieros, evaluar ratios de salud económica y realizar inferencias utilizando modelos de Machine Learning (descargados dinámicamente desde Oracle Cloud Infrastructure Object Storage).

## 🛠️ Tecnologías Utilizadas
* **Python** - Lenguaje principal de programación.
* **Flask** - Microframework para la creación de la API REST.
* **Pandas** - Manipulación y análisis de estructuras de datos.
* **Scikit-learn / Joblib**[cite: 2] - Carga y ejecución de modelos predictivos de Machine Learning.
* **Requests**[cite: 2] - Gestión de peticiones HTTP para descarga dinámica de artefactos.
* **OCI Object Storage**[cite: 2] - Almacenamiento en la nube para los modelos `.pkl`.

## 🚀 Endpoints Disponibles
### 1. Predecir Categoría de Gasto
* **URL:** `/predict/categoria`
* **Método:** `POST`
* **Descripción:** Recibe los datos de un gasto en formato JSON y devuelve la categoría predicha por el modelo de Machine Learning[cite: 2].
* **Cuerpo de la petición (Ejemplo):**
  ```json
  {
    "nombre_tienda": "Supermercado",
    "monto": 1500.0,
    "metodo_pago": "Tarjeta",
    "esencial": true
  }
