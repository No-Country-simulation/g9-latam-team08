# 📊 Finance AI – Asistente Inteligente de Salud Financiera

## Pruebas y Validación del MVP

---

## Objetivo

Documentar y centralizar las pruebas realizadas durante el desarrollo, integración y validación del MVP de Finance AI, registrando los componentes evaluados, los resultados obtenidos, las incidencias detectadas y las correcciones realizadas.

Este documento permitirá realizar el seguimiento del proceso de validación y disponer de evidencia de las pruebas efectuadas antes de la presentación final del proyecto.

---

## Ciencia de Datos

El área de Ciencia de Datos realizó pruebas y evaluaciones durante el desarrollo de los modelos de Machine Learning utilizados por Finance AI.

Las validaciones realizadas se encuentran documentadas en la documentación técnica y notebooks correspondientes al área de Ciencia de Datos.

✅ Modelos desarrollados y evaluados.

✅ Resultados y métricas de evaluación documentados por el área.

✅ Integración de los modelos con Backend confirmada.

Para consultar el detalle técnico de las evaluaciones realizadas:

- [`Documentación técnica – Ciencia de Datos`](Ciencia_Datos.md)

---

## Backend

Backend realizó pruebas sobre los servicios y APIs desarrollados durante la implementación del MVP.

De acuerdo con la documentación validada por el área, se realizaron pruebas sobre los endpoints y componentes implementados, utilizando las herramientas disponibles para la validación de los servicios.

✅ API REST Spring Boot validada de acuerdo con la implementación realizada.

✅ API Python/Flask validada de acuerdo con la implementación realizada.

✅ Servicio de Nuevo Análisis implementado para la orquestación del procesamiento financiero y la generación de recomendaciones personalizadas.

✅ Swagger/OpenAPI utilizado para documentación y pruebas de endpoints.

✅ Integración Backend ↔ Ciencia de Datos confirmada.

✅ Backend desplegado y operativo en OCI Compute.

🔄 Pendiente completar la validación final de Backend dentro del flujo integrado del MVP con la versión definitiva de Frontend.

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


🔄 Las pruebas de Frontend se encuentran en progreso de acuerdo con el avance de la integración de la Aplicación Web para escritorio (PC) con Backend.

### Pruebas realizadas durante el desarrollo

- ✅ Validado el flujo del Dashboard integrado con Backend.
- ✅ Validada la recepción de datos reales desde Backend para su presentación en el Dashboard.
- ✅ Validado el flujo de recepción de datos, análisis y visualización de resultados en el Dashboard.
- ✅ Verificada la visualización del gráfico de barras.
- ✅ Verificada la presentación de la clasificación del mes.
- ✅ Verificada la visualización de la diferencia entre ingresos y gastos.
- ✅ Verificada la presentación de los porcentajes calculados a partir del score y ratio.
- ✅ Verificada la presentación de los cálculos definidos para el Dashboard.

### Pendiente

- 🔄 Continuar las pruebas de las demás páginas y funcionalidades que formen parte de la versión definitiva de Frontend.
- 🔄 Completar las pruebas finales del flujo integrado del MVP.

---

## Pruebas de Integración

🔄 Las pruebas de integración del MVP se encuentran en progreso.

### Validaciones realizadas

- ✅ Validado el flujo de integración entre el Dashboard y Backend.
- ✅ Validada la recepción de datos reales utilizados para el análisis financiero.
- ✅ Validada la presentación de los resultados recibidos en el Dashboard.

### Pendiente

- 🔄 Completar la validación de las demás funcionalidades que formen parte de la versión final de la Aplicación Web para escritorio (PC).
- 🔄 Completar las pruebas del flujo integrado definitivo del MVP:

**Frontend ↔ Backend ↔ servicios de análisis/modelos de Ciencia de Datos ↔ OCI**

---
## Ejemplos Reales de Uso del MVP

Como parte de los requisitos mínimos del proyecto, Finance AI contempla la ejecución de un mínimo de tres ejemplos reales de uso del MVP.

Los tres casos serán realizados utilizando el usuario de demostración **Mateo**, permitiendo verificar el procesamiento de diferentes datos financieros y transaccionales y los resultados generados por la solución.

La ejecución de estos casos formará parte de la demostración funcional del MVP presentada en el **Video Demo del proyecto**.

🔄 Pendiente realizar y validar los tres casos sobre la versión final desplegada de Finance AI.

---

## Incidencias y Correcciones

Esta sección registrará las incidencias que puedan detectarse durante las pruebas finales del MVP, las correcciones realizadas y el resultado de las nuevas validaciones.

🔄 Pendiente completar de acuerdo con los resultados de la validación final de la aplicación.

---

## Validación Final del MVP

🔄 Pendiente completar una vez finalizadas las pruebas funcionales y de integración.

La validación final deberá confirmar el correcto funcionamiento del flujo principal de Finance AI y que los componentes incluidos en la versión definitiva del MVP se encuentren integrados y preparados para la demostración final.