# Sistema de Alerta Financiera Temprana

## Ciencia de Datos

---

## Objetivo

Documentar la arquitectura, los procesos, los modelos de Machine Learning, la preparación de los datos y la integración del componente de Ciencia de Datos desarrollado para el Sistema de Alerta Financiera Temprana, proporcionando una referencia técnica para su comprensión, mantenimiento e integración con las demás áreas del proyecto.

---

## Alcance

Este documento describe el conjunto de actividades, procesos y componentes técnicos desarrollados por el área de Ciencia de Datos, incluyendo la generación y preparación de los datasets, el análisis exploratorio de datos, la ingeniería de características, el entrenamiento y evaluación de los modelos de Machine Learning, la integración con Backend, la infraestructura utilizada y las herramientas empleadas durante el desarrollo del proyecto.

---

## Desarrollo del Componente

### Dataset

#### Descripción

El dataset utilizado en el proyecto es sintético y fue generado mediante un script desarrollado en Python. No contiene datos reales de usuarios; toda la información fue construida a partir de reglas de negocio y rangos definidos por el equipo de Ciencia de Datos.

Cada registro representa la situación financiera mensual de un cliente e incluye información sobre ingresos, gastos, deuda, ahorro e indicadores financieros derivados de estos datos.

#### Generación del Dataset

El proceso de generación del dataset parte de variables base que simulan la información que un usuario registraría en una aplicación de finanzas personales, entre ellas:

- Ingreso mensual fijo.
- Ingreso mensual variable.
- Gastos esenciales.
- Gastos no esenciales.
- Cuotas mensuales de deuda.
- Ahorro acumulado.
- Frecuencia de gastos en ocio.
- Modalidad de pago de tarjeta.

A partir de estas variables se calcularon automáticamente distintos indicadores financieros mediante reglas definidas por el equipo.

Se generó un conjunto de **500 clientes**, buscando una distribución representativa de perfiles financieros saludables, en observación y en riesgo.

#### Variables Calculadas

Entre las variables derivadas se encuentran:

- Ingreso mensual.
- Gastos totales del mes.
- Ahorro mensual.
- Ratio de ahorro neto.
- Ratio de endeudamiento (DTI).
- Ratio de gastos esenciales.
- Ratio de gastos de estilo de vida.
- Meses de supervivencia financiera.

#### Clasificación del Perfil Financiero

El perfil financiero del usuario se determina mediante el ratio de endeudamiento (DTI):

- **Saludable:** ratio menor o igual a 0.20.
- **En Observación:** entre 0.21 y 0.36.
- **En Riesgo:** superior a 0.36.

---

### Base de Datos

#### Modelo de Datos

Se implementó una base de datos MySQL con una tabla denominada **clientes_financiero**, cuya estructura replica el dataset generado por el equipo de Ciencia de Datos.

#### Validaciones

Se incorporaron restricciones (CHECK) para garantizar la consistencia de los datos, evitando valores inválidos en campos numéricos y limitando los valores permitidos para el perfil financiero.

La columna **ahorro_mensual** admite valores negativos, ya que representan meses donde los gastos superan los ingresos.

#### Evolución del Modelo de Datos

La estructura de la base de datos fue actualizada conforme evolucionó el dataset, incorporando nuevas columnas como:

- ahorro_previo
- modalidad_pago_tarjeta

---

### Análisis Exploratorio de Datos (EDA)

Se generaron reportes automáticos con **ydata-profiling** para los dos datasets del proyecto: el de salud financiera (500 clientes, 23 variables) y el de gastos/transacciones (2.000 registros, 7 variables). En ambos casos se confirmó 0% de valores nulos y 0% de filas duplicadas.

Sobre el dataset de gastos se identificó alta correlación entre `categoria_principal`, `subcategoria` y `esencial`, algo esperable dado que la categoría de una transacción define en gran medida si es o no un gasto esencial. La variable `monto` presenta un rango entre $518 y $119.951, con una media de $60.410.

Para unir ambos datasets se normalizaron los IDs de cliente (extracción numérica mediante regex) y se realizó un merge por `id_cliente_limpio`.

---

### Preprocesamiento de Datos

- Normalización de los identificadores de cliente: extracción del componente numérico del ID (eliminando prefijos de texto) para poder cruzar el dataset de gastos con el de salud financiera.
- Verificación de nulos y duplicados sobre el dataset de salud financiera, sin encontrar inconsistencias.
- Codificación de la variable categórica `modalidad_pago_tarjeta` mediante `pd.get_dummies`.
- Balanceo de clases con **SMOTE** (Synthetic Minority Over-sampling Technique) sobre la variable objetivo `perfil_financiero`, para evitar que el modelo aprenda sesgado hacia la clase mayoritaria y pierda capacidad de detectar los perfiles "En Riesgo".

---

### Ingeniería de Características

Se diseñaron cinco variables (scores) que consolidan el comportamiento financiero del cliente, en lugar de evaluarlo solo por ingresos:

- **score_supervivencia** (máximo 35 pts): 0 si `meses_supervivencia = 0`, 15 si es menor o igual a 3, 25 si es menor o igual a 6, 35 si supera los 6 meses. Basado en el estándar de mantener un fondo de emergencia de 3 a 6 meses de gastos esenciales.
- **score_ahorro** (máximo 35 pts): 0 si el ratio de ahorro neto es negativo, 15 si es menor o igual a 0.10, 25 si es menor o igual a 0.20, 35 si supera 0.20.
- **score_endeudamiento** (máximo 30 pts): 0 si el DTI supera 0.36, 15 si supera 0.20, 30 si está dentro del rango saludable.
- **Penalización por pago parcial de tarjeta:** -15 puntos si `modalidad_pago_tarjeta` es "parcial".
- **score_financiero:** suma de los tres scores anteriores más la penalización, con un piso en 0 para que no se generen valores negativos.

Se evaluó incorporar variables transaccionales directas (por ejemplo, ticket promedio o porcentaje de gasto no esencial), pero se descartaron en la versión final del modelo porque introducían ruido estadístico y reducían la precisión frente al modelo basado únicamente en los cinco scores.

---
 
### Clasificación de Gastos
 
Modelo que clasifica cada transacción en una categoría a partir de su texto. Se definieron 6 categorías principales, cada una con sus subcategorías, y una marca de si el gasto es esencial o no. Esta marca es la que después alimenta al modelo, además de servir como base para los indicadores del perfil financiero (gastos esenciales vs. no esenciales).
 
**1. Hogar** — todo lo necesario para mantener la infraestructura del usuario.
- `Alquiler_y_Expensas` (esencial)
- `Servicios_Basicos`: luz, agua, gas, internet (esencial)
- `Mantenimiento_y_Muebles`: ferreterías, materiales, jardinería (no esencial)
- 
**2. Alimentación** — el pilar donde más varía el comportamiento del usuario, y donde las recomendaciones de la app tienen mayor impacto.
- `Supermercados_y_Almacenes` (esencial)
- `Carnicerias_y_Granjas` (esencial)
- `Restaurantes`: restaurantes, bares (no esencial)
- `Delivery_y_Apps`: PedidosYa, Rappi (no esencial)
  
**3. Transporte** — cómo se mueve el usuario; diferencia drásticamente entre perfiles de consumo.
- `Transporte_Publico`: SUBE, trenes, colectivos (esencial)
- `Combustible` (esencial)
- `Peajes` (esencial)
- `Mantenimiento_Vehicular`: seguro, mecánico (esencial)
- `taxi_y_apps`: Uber, Cabify (no esencial)
  
**4. Entretenimiento** — el dinero que no es de supervivencia; donde el modelo busca identificar "fugas" de capital.
- `Suscripciones_Digitales`: Netflix, Spotify, herramientas online (no esencial)
- `Hobbies_y_Deportes` (no esencial)
- `Indumentaria` (no esencial)
  
- `Cuidado_Personal`: peluquería, masajes, cosmética (no esencial)
**5. Salud** — gastos ineludibles pero variables.
- `Farmacias` (esencial)
- `Cobertura_Medica`: obras sociales, prepagas (esencial)
- `Atencion_Medica`: turnos, estudios (esencial)
  
**6. Finanzas** — el comportamiento crediticio del usuario.
- `Pago_tarjetas` (esencial)
- `Transferencias` (mixto: suele requerir análisis manual del caso)
- `Impuestos` (esencial)

---

### Clasificación de Gastos

Modelo que clasifica cada transacción en una categoría (Alimentación, Transporte, Entretenimiento, Hogar, Finanzas, Salud, etc.) a partir de su texto.

**Enfoque:** basado en el paper "Hierarchical Classification of Financial Transactions Through Context-Fusion of Transformer-based Embeddings" (Busson et al., BTG Pactual / PUC-Rio, 2023), que propone el modelo Two-headed DragoNet. La idea central es que una transacción sola rara vez tiene suficiente información, por lo que se genera un embedding para cada texto disponible por separado (nombre del comercio y subcategoría) y se fusionan antes de clasificar. Se adaptó el enfoque a un solo nivel de categoría (`categoria_principal`), en lugar del esquema jerárquico del paper original.

**Componentes del modelo:**
- TextVectorization + Embedding para convertir el texto libre (`nombre_tienda`, `subcategoria`) en vectores entrenables.
- Transformer Encoder (Multi-Head Attention), que en el paper de referencia superó consistentemente a LSTM, GRU, BLSTM y modelos clásicos (KNN, SVC, Random Forest).
- Context-Fusion (concatenación + capa Dense) para combinar los embeddings de nombre de comercio y subcategoría.
- La variable `esencial` se agregó como input numérico adicional, fuera del esquema del paper original.
- Capa final Softmax para la clasificación multiclase.

Se entrenaron y compararon dos variantes: Modelo A (nombre_tienda + subcategoria + esencial) y Modelo B (solo subcategoria + esencial, sin el nombre del comercio), para evaluar si el nombre del comercio aporta valor real sobre este dataset.

---

### Modelos de Machine Learning

**Clasificador de perfil financiero:** `RandomForestClassifier` de scikit-learn.

**Clasificador de transacciones:** modelo basado en Transformer con Context-Fusion (ver sección "Clasificación de Gastos").

---

### Entrenamiento del Modelo

**Clasificador de perfil financiero:**
- Variables de entrada: `meses_supervivencia`, `score_supervivencia`, `score_ahorro`, `score_endeudamiento`, `score_financiero`.
- División de datos: 80% entrenamiento / 20% testeo.
- Entrenamiento previo sobre el dataset balanceado con SMOTE.
- Hiperparámetros: `n_estimators=100`, `random_state=42`.

**Clasificador de transacciones:** se entrena a partir del dataset de gastos, normalizando la variable `esencial` (de booleano a 0/1) y vectorizando `nombre_tienda` y `subcategoria` antes de entrenar ambas variantes del modelo (A y B).

---

### Evaluación del Modelo

**Clasificador de perfil financiero:**
- Precisión global (accuracy): 96.21%.
- Recall para la clase "En Riesgo": 1.00 (sin falsos negativos en la detección de usuarios en situación crítica).

**Clasificador de transacciones:** según el paper de referencia, el modelo con Context-Fusion alcanzó entre 93% y 95% de F1 (macro), contra 57-59% usando únicamente el nombre del comercio.

---

### Serialización del Modelo

**Clasificador de perfil financiero:** exportado con `joblib.dump` como `modelo_riesgo_financiero.pkl`, descargado directamente desde el entorno de entrenamiento (Google Colab).

**Clasificador de transacciones:** se generan `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras` y `artefactos_categoria.pkl` (label encoder y vocabulario).

**Versiones de librerías utilizadas:**
- pandas == 2.2.2
- scikit-learn == 1.6.1
- imbalanced-learn == 0.14.2
- joblib == 1.5.3

---

### Dashboard

Se desarrolló un dashboard interactivo que cruza los resultados predictivos del modelo con la base de datos transaccional en la nube. Permite visualizar en qué subcategorías (por ejemplo, pago de tarjetas, delivery, supermercado) concentran su gasto los usuarios clasificados como "En Riesgo", con el objetivo de habilitar alertas tempranas de educación financiera o planes de refinanciación.

---

## Integración con otras áreas

### Integración con Backend

El componente de Ciencia de Datos se integra con la API REST desarrollada por el equipo de Backend, proporcionando los modelos de Machine Learning y los resultados del análisis financiero para su consumo desde la aplicación.

El intercambio de información entre ambas áreas se da por tres vías:

- **Base de datos compartida (Railway):** el dataset `clientes_financiero`, generado por el área de Datos, queda disponible en la base MySQL hosteada en Railway, a la cual Backend se conecta con las credenciales provistas. Sobre esta misma base, Backend administra sus propias tablas (por ejemplo, `usuarios`, con los campos `email`, `contraseña` y `nombre`).
- **Modelos entrenados (OCI Object Storage):** los artefactos de ambos modelos (perfil financiero y clasificación de gastos) se suben a un bucket de Oracle Object Storage, desde donde Backend los descarga para integrarlos a la API.
- **Contrato de datos (JSON):** pendiente de definición formal. Debe especificar qué variables recibe cada modelo como entrada, cómo se transforman desde la API antes de la predicción, y el formato exacto de la respuesta (clase predicha, probabilidad, indicadores asociados).

---

## Infraestructura

### Railway

Como entorno de desarrollo se implementó una base de datos MySQL utilizando Railway.

Las actividades realizadas fueron:

1. Creación del proyecto en Railway.
2. Implementación del servicio MySQL.
3. Configuración de la conexión mediante DBeaver.
4. Creación de la tabla e importación del dataset generado.

### Oracle Cloud Infrastructure (OCI)

Oracle Cloud Infrastructure (OCI) se utiliza mediante dos servicios:

**Object Storage.** Se creó un bucket que aloja los artefactos de ambos modelos, organizados en dos carpetas:

- `clasificacion-gastos/`: `artefactos_categoria.pkl`, `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras`.
- `clasificacion-perfil/`: `modelo_riesgo_financiero.pkl`.

El acceso se otorga mediante un Pre-Authenticated Request (PAR) a nivel de bucket, con permiso de lectura y listado de objetos habilitado, lo que permite a Backend descargar cualquiera de los cuatro archivos sin necesidad de credenciales de OCI.

**Compute.** Se provisionó una instancia (Ubuntu, shape `VM.Standard.E2.1.Micro`, dentro del nivel Always Free) para alojar la API REST del proyecto, con IP pública asignada y el puerto 8080 habilitado para el tráfico entrante. El acceso se comparte con Backend mediante conexión SSH con clave privada.

---

## Herramientas y Tecnologías Utilizadas

### Lenguaje de programación

- Python

### Librerías

- pandas
- numpy
- scikit-learn
- imbalanced-learn (SMOTE)
- TensorFlow / Keras
- joblib
- ydata-profiling
- plotly

### Base de datos

- MySQL

### Infraestructura

- Railway
- Oracle Cloud Infrastructure (OCI)

### Herramientas

- Google Colab
- DBeaver
- GitHub

---

## Mejoras Futuras

> Pendiente de completar.

---

## Equipo Responsable

- **Lucía Jantus** – Data Scientist
- **Fernando Thiele** – Data Scientist
- **Matías Bueno** – Data Engineer
