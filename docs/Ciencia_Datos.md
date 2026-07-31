# Ciencia de Datos

## Objetivo

> Pendiente de completar por el equipo de Ciencia de Datos.

---

## Alcance

> Pendiente de completar por el equipo de Ciencia de Datos.

---

## Dataset

### Descripción

El dataset utilizado en el proyecto es sintético y fue generado mediante un script desarrollado en Python. No contiene datos reales de usuarios; toda la información fue construida a partir de reglas de negocio y rangos definidos por el equipo de Ciencia de Datos.

Cada registro representa la situación financiera mensual de un cliente e incluye información sobre ingresos, gastos, deuda, ahorro e indicadores financieros derivados de estos datos.

### Generación del Dataset

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

### Variables Calculadas

Entre las variables derivadas se encuentran:

- Ingreso mensual.
- Gastos totales del mes.
- Ahorro mensual.
- Ratio de ahorro neto.
- Ratio de endeudamiento (DTI).
- Ratio de gastos esenciales.
- Ratio de gastos de estilo de vida.
- Meses de supervivencia financiera.

### Clasificación del Perfil Financiero

El perfil financiero del usuario se determina mediante el ratio de endeudamiento (DTI):

- **Saludable:** ratio menor o igual a 0.20.
- **En Observación:** entre 0.21 y 0.36.
- **En Riesgo:** superior a 0.36.

---

## Base de Datos

### Modelo de Datos

Se implementó una base de datos MySQL con una tabla denominada **clientes_financiero**, cuya estructura replica el dataset generado por el equipo de Ciencia de Datos.

### Validaciones

Se incorporaron restricciones (CHECK) para garantizar la consistencia de los datos, evitando valores inválidos en campos numéricos y limitando los valores permitidos para el perfil financiero.

La columna **ahorro_mensual** admite valores negativos, ya que representan meses donde los gastos superan los ingresos.

### Evolución del Modelo de Datos

La estructura de la base de datos fue actualizada conforme evolucionó el dataset, incorporando nuevas columnas como:

- ahorro_previo
- modalidad_pago_tarjeta

---

## Análisis Exploratorio de Datos (EDA)

> Pendiente de completar.

---

## Preprocesamiento de Datos

> Pendiente de completar.

---

## Ingeniería de Características

> Pendiente de completar.

---

## Clasificación de Gastos

> Pendiente de completar.

---

## Modelos de Machine Learning

> Pendiente de completar.

---

## Entrenamiento del Modelo

> Pendiente de completar.

---

## Evaluación del Modelo

> Pendiente de completar.

---

## Serialización del Modelo

> Pendiente de completar.

---

## Dashboard

> Pendiente de completar.

---

## Integración con Backend

El modelo desarrollado por el área de Ciencia de Datos será consumido por la API REST implementada por el equipo Backend, permitiendo realizar el análisis financiero y la clasificación del perfil de los usuarios.

> Pendiente de completar el flujo de integración.

---

## Infraestructura

### Railway

Como entorno de desarrollo, se implementó una base de datos MySQL utilizando Railway.

Las actividades realizadas fueron:

1. Creación del proyecto en Railway.
2. Implementación del servicio MySQL.
3. Configuración de la conexión mediante DBeaver.
4. Creación de la tabla e importación del dataset generado.

### Oracle Cloud Infrastructure (OCI)

El proyecto contempla utilizar Oracle Object Storage para almacenar el modelo entrenado y permitir que el Backend lo descargue para su utilización dentro de la API REST.

> Pendiente de implementación.

---

## Tecnologías Utilizadas

> Pendiente de completar.

---

## Estructura de Carpetas

> Pendiente de completar.

---

## Estado del Desarrollo

Actualmente se encuentra implementado:

- Dataset sintético.
- Base de datos MySQL.
- Modelo de datos.
- Despliegue de la base de datos en Railway.

Pendiente:

- Entrenamiento del modelo.
- Evaluación.
- Dashboard.
- Integración Backend.
- Implementación en OCI.

---

## Mejoras Futuras

> Pendiente de completar.

---

## Equipo Responsable

- **Lucía Jantus** – Data Scientist
- **Fernando Thiele** – Data Scientist
- **Matías Bueno** – Data Engineer