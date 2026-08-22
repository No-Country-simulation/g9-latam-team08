# Finance AI – Asistente Inteligente de Salud Financiera

## Descripción del Proyecto

**Finance AI – Asistente Inteligente de Salud Financiera** es una solución desarrollada en el marco del **Hackathon ONE | Alura Latam | No Country**, orientada a ayudar a las personas a comprender mejor su situación financiera mediante el análisis inteligente de su información financiera y transaccional.

El proyecto tiene como propósito transformar datos financieros y transaccionales en conocimiento útil para apoyar la toma de decisiones, permitiendo clasificar automáticamente los gastos, analizar el perfil financiero del usuario y generar recomendaciones personalizadas para mejorar su salud financiera.

La solución integra **Ciencia de Datos**, una **API REST**, una **Aplicación Web para escritorio (PC)** y servicios de **Oracle Cloud Infrastructure (OCI)**, permitiendo transformar datos financieros y transaccionales en información útil para apoyar la toma de decisiones del usuario.

El desarrollo es realizado por un equipo multidisciplinario conformado por profesionales de **Project Management**, **Data Science**, **Data Engineering**, **Backend Development**, **Frontend Development**, **Full Stack Development** y **Software Engineering**, trabajando de forma colaborativa durante el Hackathon en el diseño, desarrollo e integración de los distintos componentes del MVP.

---

## Problema

Muchas personas tienen acceso a la información de sus transacciones financieras, pero les resulta difícil transformar esos datos en información útil para comprender sus hábitos de consumo y tomar mejores decisiones sobre sus finanzas personales.

Como consecuencia, pueden desconocer en qué categorías concentran sus gastos, cuál es su perfil financiero y qué acciones podrían implementar para mejorar su salud financiera.

**Finance AI** busca dar respuesta a esta necesidad mediante una solución inteligente que automatiza el análisis de los datos financieros y genera recomendaciones personalizadas que facilitan una gestión más consciente y organizada de las finanzas personales.

---

## Objetivo del Proyecto

Desarrollar un **MVP (Producto Mínimo Viable)** que permita analizar la información financiera y transaccional de un usuario, clasificar automáticamente sus gastos, identificar su perfil financiero y generar recomendaciones personalizadas que contribuyan a mejorar la toma de decisiones sobre sus finanzas personales.

Para alcanzar este objetivo, la solución integra componentes de **Ciencia de Datos**, una **API REST**, una **Aplicación Web para escritorio (PC)** y servicios de **Oracle Cloud Infrastructure (OCI)**, permitiendo procesar, analizar y presentar los resultados obtenidos de forma clara para el usuario.

---

## Usuario Objetivo

**Finance AI – Asistente Inteligente de Salud Financiera** está dirigido a personas que desean comprender mejor su situación financiera, organizar sus gastos, identificar sus hábitos de consumo y recibir recomendaciones personalizadas que les ayuden a mejorar la gestión de sus finanzas personales y fortalecer su salud financiera.

La solución busca ofrecer una experiencia sencilla e intuitiva que facilite la comprensión de la información financiera y promueva una administración más consciente y organizada de las finanzas personales.

---

## Solución Propuesta

Finance AI propone una solución inteligente orientada a transformar los datos financieros y transaccionales del usuario en información clara y útil que facilite la comprensión de sus hábitos y la toma de decisiones sobre sus finanzas personales.

La solución analiza información relacionada con ingresos, gastos, ahorro, endeudamiento y transacciones para generar una visión integral de la situación financiera del usuario.

El MVP integra diferentes componentes tecnológicos que trabajan de forma coordinada:

- **Ciencia de Datos:** procesamiento y análisis de la información financiera y transaccional, clasificación de transacciones, evaluación del perfil financiero y generación de resultados.
- **Backend:** API REST encargada de gestionar el procesamiento de la información y la integración entre los distintos componentes de la solución.
- **Frontend:** Aplicación Web para escritorio (PC) mediante la cual el usuario interactúa con Finance AI y visualiza los resultados del análisis financiero.
- **Oracle Cloud Infrastructure (OCI):** infraestructura cloud utilizada para el almacenamiento de los modelos de Machine Learning y archivos asociados mediante Object Storage y para proporcionar la infraestructura de despliegue de la API mediante Compute y servicios de red.

La integración de estos componentes permite transformar los datos financieros y transaccionales en información comprensible para el usuario, facilitando la identificación de hábitos de consumo, la evaluación de su situación financiera y la generación de recomendaciones orientadas a mejorar su salud financiera.

---

## Alcance del MVP

El MVP de Finance AI contempla las funcionalidades principales necesarias para analizar la información financiera y transaccional del usuario y presentar los resultados obtenidos.

### Funcionalidades principales

- Clasificación automática de transacciones en categorías financieras.
- Análisis del comportamiento financiero del usuario.
- Evaluación y clasificación del perfil financiero.
- Generación de indicadores financieros.
- Generación de recomendaciones personalizadas.
- Exposición de los resultados mediante una API REST.
- Integración con Oracle Cloud Infrastructure (OCI).
- **Aplicación Web para escritorio (PC)** para la interacción con el usuario y visualización de los resultados.

### Categorías de gastos

La solución contempla la clasificación automática de las transacciones en seis categorías financieras principales:

- Alimentación.
- Entretenimiento.
- Finanzas.
- Hogar.
- Salud.
- Transporte.

---

## Componentes de la Solución

Finance AI se desarrolla mediante la integración de cuatro componentes principales:

### Ciencia de Datos

Responsable del procesamiento y análisis de la información financiera y transaccional, incluyendo la preparación de los datos, el análisis exploratorio, la ingeniería de características, la clasificación de transacciones, la evaluación del perfil financiero y el entrenamiento y evaluación de los modelos de Machine Learning.

### Backend

Responsable de proporcionar los servicios necesarios para el procesamiento de la información y de facilitar la integración entre los distintos componentes de la solución mediante una API REST.

### Frontend

- Responsable de proporcionar la **Aplicación Web para escritorio (PC)** mediante la cual el usuario interactúa con Finance AI y consulta los resultados de su análisis financiero.

### Oracle Cloud Infrastructure (OCI)

Proporciona la infraestructura cloud del MVP mediante **Object Storage** para el almacenamiento de los modelos de Machine Learning y archivos asociados, **Compute** para el despliegue de la API REST y **Networking** para la configuración de red necesaria para el funcionamiento de la solución.

---

## Arquitectura General de la Solución

Finance AI integra diferentes componentes tecnológicos que trabajan de manera coordinada para procesar la información financiera del usuario y presentar los resultados del análisis.

El flujo general de la solución contempla:

1. El usuario interactúa con la aplicación web de Finance AI.
2. El Frontend envía la información requerida a los servicios del Backend.
3. El Backend gestiona las solicitudes y la integración con los servicios encargados del procesamiento financiero.
4. Los modelos de Ciencia de Datos procesan la información para clasificar las transacciones y evaluar el perfil financiero del usuario.
5. Los modelos de Machine Learning desarrollados por Ciencia de Datos se encuentran almacenados en OCI Object Storage y son puestos a disposición de Backend para su utilización dentro de la solución. La API REST se encuentra desplegada sobre una instancia de OCI Compute.
6. Los resultados obtenidos son procesados por los servicios de la solución y presentados al usuario mediante la aplicación web.
7. El usuario puede visualizar sus indicadores, distribución de gastos, perfil financiero y recomendaciones personalizadas.

---
## Gestión y Metodología de Trabajo

El proyecto fue desarrollado por un equipo multidisciplinario mediante una metodología de trabajo ágil basada en **Kanban**.

Para la planificación, organización y seguimiento de las actividades se utilizó **Trello**, estructurando la gestión del proyecto mediante tres tableros de trabajo:

- **Trello General:** utilizado para la planificación y seguimiento global del proyecto, consolidación de avances, documentación, entregables, reuniones y coordinación entre las distintas áreas.
- **Trello Ciencia de Datos:** utilizado para organizar y dar seguimiento a las actividades correspondientes a Ciencia de Datos e Ingeniería de Datos.
- **Trello Desarrollo:** utilizado para organizar y dar seguimiento a las actividades relacionadas con Backend, Frontend, integración y desarrollo de la solución.

Las tareas fueron organizadas mediante backlogs y estados de avance, permitiendo realizar un seguimiento continuo del desarrollo del MVP y mantener la coordinación entre las distintas áreas.

El seguimiento del proyecto se realizó mediante:

- Reuniones periódicas del equipo.
- Elaboración de minutas de reunión.
- Actualización del Trello General.
- Seguimiento de los tableros de Ciencia de Datos y Desarrollo.
- Consolidación de los avances de las distintas áreas.
- Revisión continua de la documentación.
- Seguimiento del repositorio GitHub y de los avances de integración.

La planificación se realizó de manera incremental, permitiendo reorganizar tareas y prioridades de acuerdo con las necesidades, dependencias y avances del MVP.

---

## Organización del Equipo

Finance AI fue desarrollado por el equipo **G9-LATAM-Team 08**, integrado por profesionales de diferentes áreas que participaron de forma colaborativa en el desarrollo del MVP.

| Integrante | Rol |
| --- | --- |
| Yanucelly Moreira | Project Manager |
| Lucía Evelyn Jantus | Data Scientist |
| Fernando Thiele | Data Scientist |
| Matías Bueno | Data Engineer |
| Alan Joel Romero | Software Engineer |
| Juan Manuel Roldán | Backend Developer |
| Leandro Baque | Backend Developer |
| Thiago Beber Feil | Full Stack Developer |
| Magalí Aldana Suarez | Frontend Developer |

---

## Herramientas y Tecnologías

El proyecto utiliza diferentes herramientas y tecnologías de acuerdo con las necesidades de cada componente de la solución.

Entre las principales se encuentran:

- **Ciencia de Datos:** Python, pandas, NumPy, scikit-learn, TensorFlow/Keras, joblib, Google Colab y MySQL.
- **Backend:** Java, Spring Boot, Python, Flask, Spring Data JPA/Hibernate, Spring Security, JWT, H2, MySQL, Maven y Swagger/OpenAPI.
- **Frontend:** React, TypeScript, Vite, pnpm y CSS.
- **Cloud:** Oracle Cloud Infrastructure (OCI), Object Storage, Compute y Networking.
- **Gestión y colaboración:** Trello, GitHub, GitHub Desktop, Discord y Figma.

El detalle completo de las herramientas, tecnologías, librerías y servicios utilizados se encuentra documentado en `Herramientas_y_Tecnologias.md`.

---

## Documentación del Proyecto

La documentación de Finance AI se organiza de manera centralizada en el repositorio del proyecto e incluye:

- README principal.
- README de las áreas.
- Documentación técnica de Ciencia de Datos.
- Documentación técnica de Backend.
- Documentación de Oracle Cloud Infrastructure (OCI).
- Documentación de Frontend.
- Manual de Usuario.
- Documento de Herramientas y Tecnologías.
- Minutas y documentación de seguimiento del proyecto.

La documentación se mantiene actualizada de acuerdo con los avances de cada área y la evolución del MVP.

---
## Entregables del Hackathon

Los principales entregables preparados por el equipo incluyen:

- Documentación del proyecto.
- Herramientas y tecnologías utilizadas.
- Enlaces oficiales del proyecto.
- Manual de Usuario.
- Repositorio GitHub.
- Video Demo – Entregable No Country.
- Presentación (Pitch) y Demo Day.

Los entregables son revisados y validados por el equipo antes de su publicación o carga en la plataforma correspondiente.

---

## Estado Final del Proyecto

Finance AI se encuentra en la jornada de cierre y consolidación final de su MVP en el marco del **Hackathon ONE | Alura Latam | No Country**.

Los componentes principales de **Ciencia de Datos, Backend, Frontend y Oracle Cloud Infrastructure (OCI)** fueron desarrollados de acuerdo con el alcance definido para el proyecto.

Ciencia de Datos completó el desarrollo, evaluación y serialización de los modelos de Machine Learning. Backend cuenta con los servicios necesarios para el procesamiento financiero, la integración con los modelos y el flujo de Nuevo Análisis. Frontend cuenta con una versión consolidada de la Aplicación Web para escritorio (PC), mientras que OCI proporciona Object Storage para el almacenamiento de los modelos de Machine Learning y Compute para el despliegue de la API REST.

Durante la jornada de cierre se completará la consolidación definitiva de las áreas en `main` y la validación final del funcionamiento integrado de la aplicación, antes de preparar la versión definitiva de los entregables del proyecto.

### Ciencia de Datos

- ✅ Generados y preparados los datasets utilizados para el análisis financiero y la clasificación de transacciones.

- ✅ Completado el análisis exploratorio de datos (EDA) y el preprocesamiento de los datos.

- ✅ Completada la ingeniería de características para el análisis del perfil financiero.

- ✅ Desarrollado y entrenado el modelo de clasificación del perfil financiero mediante Random Forest.

- ✅ Desarrollado y entrenado el modelo de clasificación de transacciones mediante Transformer con Context-Fusion.

- ✅ Evaluados los modelos de Machine Learning y documentadas sus métricas de desempeño.

- ✅ Serializados y exportados los modelos y artefactos necesarios para su integración.

- ✅ Implementada la integración con Backend mediante los modelos y artefactos de Machine Learning almacenados en OCI Object Storage.

- ✅ Definido y documentado el contrato de datos para el intercambio de información con Backend.

- ✅ Desarrollado un dashboard interactivo para visualizar resultados predictivos y comportamiento transaccional.

- ✅ Documentadas las herramientas, tecnologías e infraestructura utilizadas por el área.

**Estado:** ✅ El componente de Ciencia de Datos se encuentra desarrollado y preparado para su utilización dentro del flujo integrado del MVP.

### Backend

- ✅ Desarrollada e implementada la API REST principal mediante Java y Spring Boot.

- ✅ Implementados los servicios y endpoints necesarios para la gestión y procesamiento de la información financiera.

- ✅ Implementada la persistencia de datos mediante Spring Data JPA/Hibernate, utilizando MySQL alojado en Railway y H2 para desarrollo y pruebas locales.

- ✅ Implementada la seguridad mediante Spring Security y autenticación con JWT.

- ✅ Implementada una API Python/Flask para realizar cálculos financieros, evaluar indicadores de salud financiera y ejecutar los modelos de Machine Learning desarrollados por Ciencia de Datos.

- ✅ Implementada la utilización de los modelos almacenados en OCI Object Storage para la clasificación de transacciones y evaluación del perfil financiero.

- ✅ Implementado el flujo de **Nuevo Análisis** mediante un orquestador Backend For Frontend (BFF) desarrollado con Java y Spring Boot.

- ✅ El orquestador recibe la información financiera y transaccional proveniente del Frontend, coordina el procesamiento mediante los servicios correspondientes y devuelve una respuesta estructurada para la aplicación.

- ✅ Incorporada la generación de recomendaciones financieras personalizadas mediante LangChain4j y Google Gemini, enriqueciendo los resultados obtenidos durante el análisis financiero.

- ✅ Implementada la comunicación entre los diferentes servicios mediante API REST y formato JSON.

- ✅ Realizadas pruebas de entrada y salida de datos sobre los servicios correspondientes al flujo de análisis.

- ✅ API REST desplegada en una instancia de OCI Compute.

- 🔄 Consolidación definitiva de Backend en `main` prevista para la jornada de cierre.

- ⏳ Validación final del funcionamiento de Backend dentro del flujo completo de la aplicación.

**Estado:** 🔄 El componente Backend se encuentra desarrollado y con sus servicios principales implementados. Durante el cierre se completará su consolidación definitiva en `main` y la validación dentro del flujo completo del MVP.

### Frontend

- ✅ Desarrollada la Aplicación Web para escritorio (PC) mediante React, TypeScript y Vite.

- ✅ Consolidada la implementación de Frontend correspondiente al MVP en su rama de trabajo.

- ✅ Implementadas la Landing pública y las funcionalidades de autenticación.

- ✅ Implementado el Dashboard privado para la visualización de la información financiera del usuario.

- ✅ Implementado el flujo de **Nuevo Análisis** a nivel de interfaz, incluyendo el ingreso de datos financieros, carga de transacciones, revisión de información, procesamiento y visualización de resultados.

- ✅ Implementadas las vistas de resultados correspondientes a Resumen, Gastos y Recomendaciones.

- ✅ Implementado el Historial financiero a nivel de Frontend y preparada su comunicación con los servicios correspondientes de Backend.

- ✅ Implementada la sección de Soporte.

- ✅ Las funcionalidades de **Metas** y **Notificaciones** se encuentran desarrolladas a nivel de Frontend y preservadas dentro de la aplicación, aunque fuera de la navegación principal del MVP.

- ℹ️ La integración completa de **Metas y Notificaciones con Backend** se contempla como una mejora futura de Finance AI y no forma parte del flujo principal definido para la versión final del MVP.

- ℹ️ **Configuración** no forma parte de las funcionalidades implementadas para la versión final del MVP y se contempla como una posible evolución futura de la aplicación.

- 🔄 Consolidación definitiva de Frontend en `main` prevista para la jornada de cierre.

- ⏳ Pendiente la validación final de la Aplicación Web dentro del flujo completo e integrado del MVP.

**Estado:** 🔄 El componente Frontend se encuentra desarrollado y consolidado en su rama de trabajo de acuerdo con el alcance visible definido para el MVP. Durante el cierre se completará su incorporación definitiva a `main` y la validación final junto con los servicios de Backend.

### Oracle Cloud Infrastructure (OCI)

- ✅ Implementado **Object Storage** para el almacenamiento de los modelos de Machine Learning desarrollados por Ciencia de Datos.

- ✅ Organizados y almacenados los artefactos correspondientes a los modelos de clasificación de gastos y perfil financiero.

- ✅ Configurado el acceso de Backend a los modelos mediante **Pre-Authenticated Request (PAR)** con permisos de lectura y listado.

- ✅ Provisionada y configurada una instancia **OCI Compute** para el despliegue de la API REST.

- ✅ Configurada la infraestructura de red mediante **VCN, subnet pública y Security List**, habilitando el puerto necesario para el acceso a la API.

- ✅ Configurado el acceso seguro a la instancia Compute mediante autenticación por clave SSH.

- ✅ Desplegada la **API REST en OCI Compute**.

- ✅ Implementada y documentada la integración de OCI con **Backend y Ciencia de Datos**.

- ℹ️ **OCI Functions** no fue requerido para la implementación final del MVP.

- ℹ️ La base de datos **MySQL** del proyecto se encuentra alojada en **Railway** y no en OCI.

**Estado:** ✅ El componente de Oracle Cloud Infrastructure (OCI) se encuentra implementado para los servicios definidos en la arquitectura final del MVP.

### Cierre del MVP

Para completar formalmente el cierre técnico del MVP durante la jornada del **22/08/2026**, se realizarán las siguientes actividades finales:

- 🔄 Consolidación de las versiones definitivas de las áreas en `main`.

- ⏳ Verificación de la estructura final del repositorio.

- ⏳ Validación del funcionamiento integrado de la Aplicación Web con los servicios de Backend.

- ⏳ Verificación del enlace definitivo de acceso a la Aplicación Web desplegada.

- ⏳ Prueba del recorrido funcional que será utilizado para la grabación del Video Demo.

Una vez confirmadas estas actividades, el MVP quedará preparado para el cierre definitivo de la documentación, la grabación y publicación del Video Demo y la presentación de los entregables finales del Hackathon.

---
## Mejoras Futuras

Como evolución de Finance AI, se identificaron oportunidades para ampliar las funcionalidades del MVP y continuar fortaleciendo la experiencia del usuario.

Entre las principales mejoras futuras se contemplan:

- Completar la integración de **Metas** con Backend y su persistencia de datos.

- Completar la integración de **Notificaciones** con Backend y ampliar la gestión de alertas y preferencias del usuario.

- Incorporar una sección de **Configuración** para la gestión de preferencias y datos del usuario.

- Ampliar las funcionalidades de seguimiento y planificación financiera.

- Continuar evolucionando los modelos y mecanismos de generación de recomendaciones personalizadas.

- Ampliar las capacidades de visualización y análisis de la información financiera.

Estas mejoras permitirán evolucionar Finance AI a partir del MVP desarrollado durante el Hackathon, incorporando progresivamente nuevas capacidades y funcionalidades.
---

## Repositorio y Recursos del Proyecto

El código fuente, la documentación técnica y los recursos correspondientes a Finance AI se encuentran organizados en el repositorio principal del proyecto.

Los recursos complementarios utilizados durante el desarrollo incluyen el diseño de la aplicación en Figma, los tableros de gestión del proyecto y la Aplicación Web desplegada.

Los enlaces definitivos correspondientes a los entregables del Hackathon serán verificados y cargados directamente en los apartados correspondientes de la plataforma de No Country.

La URL de la API REST no será publicada como enlace independiente dentro de los entregables del proyecto.

---

## Observaciones

Este documento consolida la información general de **Finance AI – Asistente Inteligente de Salud Financiera**, incluyendo el objetivo, alcance, arquitectura, componentes, metodología de trabajo, organización del equipo, tecnologías utilizadas y estado final del MVP desarrollado durante el Hackathon.

La información técnica específica de cada componente se encuentra complementada mediante los README y documentos técnicos correspondientes disponibles en el repositorio del proyecto.

Las funcionalidades identificadas como mejoras futuras no forman parte del flujo funcional principal definido para la versión final del MVP y representan posibles líneas de evolución de Finance AI. 