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

El modelo entrenado y empaquetado mediante `joblib` (`modelo_riesgo_financiero.pkl`), junto con los artefactos del clasificador de gastos, se encuentran alojados en Oracle Object Storage (OCI), desde donde Backend puede descargarlos mediante el acceso provisto por el área de Datos.

*   **Archivo del Código:** La lógica completa está en el archivo `.ipynb` de esta rama.
*   **Archivo del Modelo:** El modelo entrenado (`modelo_riesgo_financiero.pkl`) y los artefactos del clasificador de gastos (`artefactos_categoria.pkl`, `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras`) están disponibles en el bucket de OCI Object Storage del proyecto.

---

### Clasificador de Gastos y Transacciones

Para comprender a fondo el comportamiento de los usuarios, implementamos un modelo de clasificación de transacciones que procesa los datos crudos de consumo (como el nombre de la tienda y el monto) y los estructura en dimensiones de negocio accionables. 

**Principales Categorías de Clasificación:**
*   **Categoría Principal (`categoria_principal`):** Agrupa el gasto en grandes rubros macro (ej. Supermercados, Entretenimiento, Salud, Pago de Deudas).
*   **Subcategoría (`subcategoria`):** Brinda un nivel de granularidad mayor sobre el tipo exacto de transacción.
*   **Nivel de Necesidad (`esencial`):** Etiqueta binaria/booleana que define si el gasto representa una necesidad básica para el usuario o si es un gasto prescindible (ocio, lujos, no esencial).

---

## Estructura de archivos

```
Dataset/
├── Perfil/
│   ├── Estructura_gastos.csv
│   └── dataset_gastos.csv
└── Transacciones/
    ├── Dataset_Salud_Financiera_Defi...
    └── Estructura_Salud_Financiera.csv

EDA/
├── Hackaton_No_Country_Entrena...
├── README_Salud_financiera.md
└── Reporte_EDA_Gastos.html

models/
├── ClasificacionGastos/
│   ├── README.md
│   ├── artefactos_categoria.pkl
│   ├── modelo_categoria_full.keras
│   └── modelo_categoria_reducido.keras
└── ClasificacionPerfil/
    └── modelo_riesgo_financiero.pkl

notebooks/
├── ClasificacionGastos/
│   ├── modeloClasificatorio.ipynb
│   └── pruebas_modeloClasificatorio.ipynb
└── ClasificacionPerfil/
    └── Hackaton_No_Country_Entrena...

Hackaton_No_Country_Entrenami...
README.md
modelo_riesgo_financiero.pkl
```

---

## Responsables

| Integrante | Rol |
| --- | --- |
| Lucía Jantus | Data Scientist |
| Fernando Thiele | Data Scientist |
| Matías Bueno | Data Engineer |
