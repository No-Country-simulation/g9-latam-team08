# 📊 Finance AI – Asistente Inteligente de Salud Financiera

## Pruebas y Validación del MVP

---

## Objetivo

Documentar y centralizar las pruebas realizadas durante el desarrollo, integración y validación del MVP de Finance AI, registrando los componentes evaluados, los resultados obtenidos, las incidencias detectadas y las correcciones realizadas.

Este documento permite disponer de un registro centralizado del proceso de validación y de las pruebas efectuadas antes de la presentación final del proyecto.

---

## Ciencia de Datos

El área de Ciencia de Datos realizó pruebas y evaluaciones durante el desarrollo de los modelos de Machine Learning utilizados por Finance AI.

Las validaciones realizadas se encuentran documentadas en la documentación técnica y notebooks correspondientes al área de Ciencia de Datos.

- ✅ Modelos desarrollados y evaluados.
- ✅ Resultados y métricas de evaluación documentados por el área.
- ✅ Integración de los modelos con Backend confirmada.

Para consultar el detalle técnico de las evaluaciones realizadas:

- [`Documentación técnica – Ciencia de Datos`](Ciencia_Datos.md)

---

## Backend

Backend realizó pruebas sobre los servicios y APIs desarrollados durante la implementación del MVP.

De acuerdo con la documentación validada por el área, se realizaron pruebas sobre los endpoints y componentes implementados, utilizando las herramientas disponibles para la validación de los servicios.

- ✅ API REST Spring Boot validada de acuerdo con la implementación realizada.
- ✅ API Python/Flask validada de acuerdo con la implementación realizada.
- ✅ Servicio de Nuevo Análisis implementado para la orquestación del procesamiento financiero y la generación de recomendaciones personalizadas.
- ✅ Swagger/OpenAPI utilizado para documentación y pruebas de endpoints.
- ✅ Integración Backend ↔ Ciencia de Datos confirmada.
- ✅ Backend desplegado y operativo en OCI Compute.
- ✅ Validado el funcionamiento de Backend dentro del flujo integrado del MVP ejecutado en entorno local.

Para consultar el detalle técnico:

- [`Documentación técnica – Backend`](Backend.md)

---

## Oracle Cloud Infrastructure (OCI)

La infraestructura implementada en Oracle Cloud Infrastructure (OCI) se encuentra integrada con los componentes de Ciencia de Datos y Backend utilizados por el MVP.

### Implementación y configuración verificadas

- ✅ Implementado Object Storage para el almacenamiento de los modelos entrenados y serializados por Ciencia de Datos.
- ✅ Organizados los modelos en dos carpetas correspondientes a clasificación de gastos y clasificación del perfil financiero.
- ✅ Configurado el acceso de Backend a los modelos mediante un Pre-Authenticated Request (PAR) con permisos de lectura y listado.
- ✅ Provisionada y configurada una instancia OCI Compute para el despliegue de la API REST.
- ✅ Configurada la infraestructura de red mediante VCN y subnet pública.
- ✅ Habilitado el puerto necesario para el acceso a la API mediante Security List.
- ✅ API REST desplegada sobre OCI Compute.
- ✅ Documentada la integración de Object Storage con Ciencia de Datos y Backend, y el despliegue de la API REST en OCI Compute.

### Configuración adoptada

- **Object Storage:** utilizado para el almacenamiento de los modelos.
- **Compute:** utilizado para alojar la API REST.
- **Networking:** utilizado para la configuración de red de la infraestructura.
- **Functions:** no implementado.
- **Base de datos:** no implementada en OCI; la persistencia utiliza MySQL alojado en Railway.

Para consultar el detalle técnico:

- [`Documentación técnica – OCI`](OCI.md)

---

## Frontend

Las pruebas de Frontend permitieron validar el funcionamiento de la Aplicación Web para escritorio (PC) y su participación dentro del flujo funcional del MVP en entorno local.

### Pruebas realizadas

- ✅ Validado el acceso a las funcionalidades principales de la aplicación.
- ✅ Validado el flujo del Dashboard integrado con Backend.
- ✅ Validada la recepción de datos desde Backend para su presentación en la aplicación.
- ✅ Validado el flujo de **Nuevo Análisis**, incluyendo el ingreso de datos financieros y transacciones, revisión de la información, procesamiento y presentación de resultados.
- ✅ Validada la visualización de los resultados del análisis financiero.
- ✅ Verificada la visualización del gráfico de barras.
- ✅ Verificada la presentación de la clasificación del perfil financiero.
- ✅ Verificada la visualización de la diferencia entre ingresos y gastos.
- ✅ Verificada la presentación de los porcentajes e indicadores calculados para el análisis.
- ✅ Validada la generación y presentación de recomendaciones financieras personalizadas.
- ✅ Validado el funcionamiento del flujo principal de la Aplicación Web en entorno local.

### Estado

✅ Frontend validado para el flujo funcional definido para la demostración del MVP en entorno local.

La versión pública de la WebApp se encuentra disponible; sin embargo, la comunicación de dicha versión con las APIs continúa en revisión.

Para consultar el detalle técnico:

- [`Documentación técnica – Frontend`](Frontend.md)

---

## Pruebas de Integración

Las pruebas de integración permitieron validar el funcionamiento conjunto de los principales componentes de Finance AI en entorno local.

### Validaciones realizadas

- ✅ Validada la comunicación entre Frontend y Backend dentro del flujo funcional del MVP.
- ✅ Validada la recepción y procesamiento de los datos financieros y transaccionales.
- ✅ Validada la integración de Backend con los servicios de análisis y los modelos desarrollados por Ciencia de Datos.
- ✅ Validada la utilización de los modelos de Machine Learning almacenados en OCI Object Storage.
- ✅ Validado el procesamiento del flujo de **Nuevo Análisis**.
- ✅ Validada la presentación de los resultados del análisis financiero en la Aplicación Web.
- ✅ Validada la generación y presentación de recomendaciones personalizadas.
- ✅ Validado el flujo integrado del MVP en entorno local:

**Frontend ↔ Backend ↔ servicios de análisis/modelos de Ciencia de Datos ↔ OCI**

### Estado

✅ Flujo integrado del MVP validado en entorno local y preparado para su demostración.

---

## Ejemplos Reales de Uso del MVP

Como parte de la validación funcional del proyecto, se ejecutaron tres ejemplos de uso del MVP de Finance AI.

Los casos fueron definidos utilizando el usuario de demostración **Mateo**, permitiendo verificar el procesamiento de diferentes escenarios financieros y transaccionales y los resultados generados por la solución.

Los casos permiten validar el flujo principal de la aplicación, desde el ingreso de la información financiera y las transacciones hasta la presentación de indicadores, perfil financiero y recomendaciones personalizadas.

- ✅ Caso de uso 1 validado en entorno local.
- ✅ Caso de uso 2 validado en entorno local.
- ✅ Caso de uso 3 validado en entorno local.

Los casos forman parte del recorrido funcional definido para la demostración del MVP en el **Video Demo del proyecto**.

---

## Incidencias y Correcciones

Durante el proceso de integración y validación se realizaron ajustes sobre los distintos componentes del MVP hasta obtener un flujo funcional para su ejecución y demostración en entorno local.

Las pruebas realizadas permitieron confirmar el funcionamiento de las funcionalidades principales incluidas en el recorrido definido para la demostración.

Como punto de seguimiento, se identificó que la versión pública de la WebApp presenta dificultades en la comunicación con las APIs. Esta situación no afecta la validación del flujo funcional del MVP ejecutado en entorno local, utilizado para las pruebas y la demostración del proyecto.

El funcionamiento del flujo principal del MVP en entorno local fue validado satisfactoriamente.

---

## Validación Final del MVP

Como resultado de las pruebas funcionales y de integración realizadas, se validó el funcionamiento del flujo principal de Finance AI en entorno local.

La validación permitió confirmar:

- ✅ Funcionamiento de la Aplicación Web para escritorio (PC).
- ✅ Comunicación entre Frontend y Backend en entorno local.
- ✅ Procesamiento de la información financiera y transaccional.
- ✅ Integración de Backend con los servicios y modelos desarrollados por Ciencia de Datos.
- ✅ Utilización de los modelos almacenados en OCI Object Storage.
- ✅ Funcionamiento del flujo de **Nuevo Análisis**.
- ✅ Generación y presentación de los resultados del análisis financiero.
- ✅ Clasificación del perfil financiero.
- ✅ Generación de recomendaciones personalizadas.
- ✅ Ejecución de los casos de uso definidos para la demostración.

La versión funcional del MVP se encuentra validada en entorno local y preparada para su demostración.

La API REST se encuentra desplegada en OCI Compute. Adicionalmente, se dispone de una versión pública de la WebApp cuya comunicación con las APIs continúa en revisión, sin afectar el flujo funcional validado en entorno local.

**Estado final: ✅ MVP validado para su demostración.**