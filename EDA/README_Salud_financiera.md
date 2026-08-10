## Especificaciones Técnicas para Data Engineering

A continuación se detalla la configuración exacta del entorno, el preprocesamiento y la arquitectura del modelo predictivo para facilitar su integración.

### 1. EDA y Preprocesamiento Aplicado
*   **Limpieza de datos:** Se aplicaron expresiones regulares (`regex`) para la extracción y casteo de IDs transaccionales a formato numérico (`int`). Tratamiento y relleno de valores nulos (`fillna(0)`) para evitar bloqueos en el cálculo de métricas.
*   **Balanceo de clases:** Se aplicó **SMOTE** (Synthetic Minority Over-sampling Technique) para el sobremuestreo de la clase minoritaria ("En Riesgo") mediante generación de datos sintéticos, logrando equidad en el conjunto de entrenamiento.

### 2. Ingeniería de Características (Feature Engineering)
*   **Variables maestras:** El modelo de producción consume 5 variables (scores) que consolidan el comportamiento financiero del usuario: 
    *   `score_ahorro`
    *   `score_endeudamiento`
    *   `meses_supervivencia`
    *   `score_supervivencia`
    *   `score_financiero`
*   *Nota de experimentación:* Se testeó inyectar volumetría transaccional directa (como `ticket_promedio` y `%_gasto_no_esencial`), pero fue descartado en la versión de producción ya que añadía ruido estadístico al modelo, disminuyendo la precisión frente al modelo basado estrictamente en los 5 scores consolidados.

### 3. Arquitectura del Modelo
*   **Algoritmo:** `RandomForestClassifier`
*   **Hiperparámetros principales:** `n_estimators=100`, `random_state=42`
*   **Tipo de tarea:** Clasificación multiclase.

### 4. Entrenamiento y Métricas
*   **Data Split:** 80% entrenamiento / 20% testeo.
*   **Accuracy (Precisión Global):** 96.21%
*   **Recall crítico:** 1.00 perfecto para la clase "En Riesgo" (0% de falsos negativos en el segmento vulnerable).

### 5. Serialización y Dependencias del Entorno
*   **Formato de exportación:** `.pkl` (generado mediante `joblib.dump`).
*   **Versiones de Librerías Core utilizadas:**
    *   `pandas == 2.2.2`
    *   `scikit-learn == 1.6.1`
    *   `imbalanced-learn == 0.14.2`
    *   `joblib == 1.5.3`
