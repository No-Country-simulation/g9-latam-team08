# Área de Data Science - Sistema de Alerta Financiera Temprana

Este repositorio contiene todo el flujo de trabajo de Datos y Machine Learning desarrollado por el Equipo 08. Nuestro objetivo principal es crear un **"radar de alerta temprana"** capaz de predecir la vulnerabilidad financiera de un usuario, basándonos en sus hábitos de consumo y no solo en sus ingresos.

---

## Las 5 Normas de Salud Financiera que tomamos

Para evitar los sesgos del modelo bancario tradicional (que solo evalúa ingresos vs. egresos), diseñamos un motor de Feature Engineering que califica a los usuarios basándose en métricas de comportamiento real:

*   **Score de Ahorro:** Capacidad real de retención de capital mensual.
*   **Score de Endeudamiento:** Porcentaje de ingresos futuros comprometidos en deuda actual.
*   **Meses de Supervivencia:** Prueba de estrés (cuánto tiempo mantiene su nivel de vida ante una pérdida de ingresos a costo cero).
*   **Score de Supervivencia:** Normalización matemática de la métrica anterior para evitar discriminación por nivel salarial.
*   **Score Financiero:** Calificación global que pondera las variables anteriores para clasificar al usuario ("Saludable", "En Observación" o "En Riesgo").

---

## Modelo Predictivo 

El desarrollo del modelo se dividió en fases secuenciales documentadas en nuestro cuaderno principal:

*   **Limpieza y EDA:** Tratamiento de valores nulos, normalización de IDs transaccionales y Análisis Exploratorio de Datos.
*   **Balanceo de Clases:** Aplicación de técnicas de generación de datos sintéticos para balancear el dataset y asegurar que el algoritmo aprenda a detectar a la minoría crítica (perfiles vulnerables).
*   **Entrenamiento:** Implementación de un modelo de Random Forest Classifier.
*   **Validación y Métricas:** El modelo alcanzó una **precisión global del 96.21%**. Destaca un **Recall perfecto (1.00)** para la clase "En Riesgo", lo que significa un 0% de falsos negativos en la detección de usuarios críticos.

---

## Visualización

Se desarrolló un **Dashboard Interactivo** que cruza los resultados predictivos del modelo con la base de datos transaccional en la nube. 

Esta herramienta desglosa visualmente en qué subcategorías (ej. pago de tarjetas, delivery, supermercado) se fuga el capital de los usuarios "En Riesgo", permitiendo al equipo de negocio lanzar alertas tempranas de educación financiera o planes de refinanciación personalizados.

---

## Notas de Integración para Backend

Debido a las restricciones de almacenamiento de GitHub (límite de 25 MB), el modelo predictivo finalizado no se encuentra alojado físicamente en este repositorio.

*   **Archivo del Código:** La lógica completa está en el archivo `.ipynb` de esta rama.
*   **Archivo del Modelo:** El modelo ya entrenado y empaquetado mediante `joblib` (`modelo_riesgo_financiero.pkl`) se encuentra en el repositorio.

## 🛠️ Especificaciones Técnicas para Data Engineering

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


