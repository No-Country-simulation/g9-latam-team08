# Área de Data Science - Sistema de Alerta Financiera Temprana

Esta carpeta contiene el flujo de trabajo de Datos y Machine Learning desarrollado por el Equipo 08. Nuestro objetivo principal es crear un **"radar de alerta temprana"** capaz de predecir la vulnerabilidad financiera de un usuario, basándonos en sus hábitos de consumo y no solo en sus ingresos.

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

## Clasificador de Gastos y Transacciones

Como complemento al modelo de riesgo financiero, se desarrolló un **clasificador de categoría de transacciones** encargado de asignar cada transacción a una categoría principal de gasto.

El modelo utiliza como principales entradas `nombre_tienda`, `subcategoria` y `esencial`. Para procesar la información textual se utiliza `TextVectorization` + `Embedding`, seguido de un **Transformer Encoder con Multi-Head Attention**. Los embeddings generados se fusionan mediante una capa de concatenación + Dense, mientras que `esencial` se incorpora como variable numérica adicional.

Las principales categorías que clasifica son:

*   **Alimentacion**
*   **Entretenimiento**
*   **Finanzas**
*   **Hogar**
*   **Salud**
*   **Transporte**

El modelo completo se mantiene como la variante principal frente a una versión reducida que no utilizaba `nombre_tienda`. El EDA mostró que `subcategoria` y `esencial` presentan una alta correlación con `categoria_principal`, mientras que `id_cliente`, `monto` y `metodo_pago` fueron descartados como entradas del modelo por las razones documentadas en el informe específico del clasificador.

### Resultado principal

Sobre un **set de test de 400 transacciones**, el clasificador obtuvo:

*   **Accuracy:** 100%
*   **Precision:** 100%
*   **Recall:** 100%
*   **F1-score:** 100%

El resultado fue de **100% de precision, recall y F1-score en las 6 categorías**. Este desempeño es consistente con la relación fuertemente correlacionada entre `subcategoria` y `categoria_principal` observada en el EDA, donde cada subcategoría pertenece en la práctica a una única categoría principal.

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

## Estructura de archivos

```
Dataset/
├── Perfil/
│   ├── Dataset_Salud_Financiera_Definido.csv
│   └── Estructura_Salud_Financiera.csv
└── Transacciones/
    ├── Estructura_gastos.csv
    └── dataset_gastos.csv

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
