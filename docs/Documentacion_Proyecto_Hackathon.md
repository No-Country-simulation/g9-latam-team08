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
7. El usuario puede visualizar sus indicadores, distribución de gastos, perfil financiero, alertas y recomendaciones.

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

## Estado Actual del Proyecto

Finance AI se encuentra en la etapa final de desarrollo del MVP.

Los principales componentes de la solución se encuentran desarrollados o en proceso de integración, mientras el equipo avanza en las pruebas del flujo integrado del MVP, la consolidación de la documentación y la preparación de los entregables finales.

### Oracle Cloud Infrastructure (OCI)

- ✅ Implementado Object Storage para el almacenamiento de los modelos de Machine Learning.
- ✅ Configurado el acceso de Backend a los modelos almacenados mediante Pre-Authenticated Request (PAR).
- ✅ Provisionada y configurada la instancia OCI Compute.
- ✅ API REST desplegada en OCI Compute.
- ✅ Configurada la infraestructura de red mediante VCN, subnet pública y Security List.
- ✅ Documentada la integración de OCI con Backend y Ciencia de Datos.
- ℹ️ OCI Functions no fue requerido para la implementación final.
- ℹ️ La base de datos MySQL se encuentra alojada en Railway y no en OCI.

---

## Mejoras Futuras

Como evolución del MVP, Finance AI podrá incorporar nuevas funcionalidades y mejoras orientadas a ampliar las capacidades de análisis financiero y la experiencia del usuario.

Las mejoras futuras serán definidas a partir de los resultados obtenidos durante las pruebas del MVP y de las oportunidades de evolución identificadas por el equipo.

---

## Repositorio y Enlaces del Proyecto

Los enlaces oficiales del proyecto serán incorporados y verificados antes de la entrega final:

- **Repositorio GitHub:** pendiente de incorporar.
- **Aplicación Web:** pendiente de incorporar.
- **API REST:** pendiente de incorporar, si se publica.
- **Figma:** pendiente de incorporar.
- **Video Demo:** pendiente de incorporar.
- **Documentación:** pendiente de consolidación y revisión final.

---

## Observaciones

Este documento consolida la información general de **Finance AI – Asistente Inteligente de Salud Financiera** y será actualizado conforme finalicen la integración, las pruebas y la preparación de los entregables del Hackathon.