# 📊 Finance AI – Asistente Inteligente de Salud Financiera

**Finance AI – Asistente Inteligente de Salud Financiera** es una solución desarrollada en el marco del **Hackathon ONE | Alura Latam | No Country**, orientada a ayudar a las personas a comprender mejor su situación financiera mediante el análisis inteligente de su información financiera y transaccional.

La solución permite transformar datos financieros y transaccionales en información útil para apoyar la toma de decisiones, mediante la clasificación automática de gastos, el análisis del perfil financiero del usuario y la generación de recomendaciones personalizadas para mejorar su salud financiera.

El MVP integra **Ciencia de Datos**, una **API REST**, una **Aplicación Web para escritorio (PC)** y servicios de **Oracle Cloud Infrastructure (OCI)**.

---

## 🎯 Problema

Muchas personas tienen acceso a la información de sus transacciones financieras, pero encuentran dificultades para transformar esos datos en información útil que les permita comprender sus hábitos de consumo y tomar mejores decisiones sobre sus finanzas personales.

**Finance AI** busca facilitar este proceso mediante el análisis automatizado de la información financiera, permitiendo identificar patrones de consumo, evaluar el perfil financiero del usuario y generar recomendaciones personalizadas.

---

## 🎯 Objetivo

Desarrollar un **MVP (Producto Mínimo Viable)** que permita analizar la información financiera y transaccional de un usuario, clasificar automáticamente sus gastos, identificar su perfil financiero y generar recomendaciones personalizadas que contribuyan a mejorar la toma de decisiones sobre sus finanzas personales.

---

## 👤 Usuario Objetivo

**Finance AI** está dirigido a personas que desean comprender mejor su situación financiera, organizar sus gastos, identificar sus hábitos de consumo y recibir recomendaciones personalizadas que les ayuden a mejorar la gestión de sus finanzas personales.

La solución busca ofrecer una experiencia sencilla e intuitiva que facilite la comprensión de la información financiera y promueva una administración más consciente y organizada de las finanzas personales.

---

## 🚀 Funcionalidades del MVP

El MVP de **Finance AI** contempla las principales funcionalidades necesarias para analizar la información financiera y transaccional del usuario y presentar los resultados obtenidos:

- Clasificación automática de transacciones en categorías financieras.
- Análisis del comportamiento financiero del usuario.
- Evaluación y clasificación del perfil financiero.
- Generación de indicadores financieros.
- Generación de recomendaciones personalizadas.
- Exposición de los resultados mediante una API REST.
- Integración con Oracle Cloud Infrastructure (OCI).
- Aplicación Web para escritorio (PC) para la interacción con el usuario y visualización de los resultados.

### Categorías de gastos

Las transacciones son clasificadas en seis categorías financieras principales:

- Alimentación.
- Entretenimiento.
- Finanzas.
- Hogar.
- Salud.
- Transporte.

---

## 🏗️ Arquitectura de la Solución

**Finance AI** integra cuatro componentes principales que trabajan de forma coordinada:

- **Ciencia de Datos:** procesa y analiza la información financiera, clasifica las transacciones y evalúa el perfil financiero del usuario.
- **Backend:** proporciona la API REST y gestiona la comunicación entre los componentes de la solución.
- **Frontend:** proporciona la Aplicación Web para escritorio (PC) mediante la cual el usuario interactúa con Finance AI y visualiza los resultados.
- **Oracle Cloud Infrastructure (OCI):** proporciona la infraestructura cloud utilizada para almacenar los modelos de Machine Learning mediante Object Storage y alojar la API REST mediante Compute, utilizando servicios de Networking para la configuración de red.

### Flujo general

**Usuario → Frontend → Backend → Servicios de análisis y modelos de Machine Learning → Backend → Frontend → Usuario**

Los modelos de Machine Learning desarrollados por Ciencia de Datos se encuentran almacenados en **OCI Object Storage** y son utilizados por los servicios de Backend para realizar la clasificación de gastos y la evaluación del perfil financiero.

La **API REST** se encuentra desplegada sobre una instancia de **OCI Compute**. Backend integra los servicios necesarios para procesar la información financiera y proporcionar al Frontend los resultados utilizados en la visualización del análisis.

---

## 🛠️ Herramientas y Tecnologías

**Finance AI** integra diferentes tecnologías de acuerdo con los componentes de la solución:

- **Ciencia de Datos:** Python, pandas, NumPy, scikit-learn, TensorFlow/Keras y MySQL.
- **Backend:** Java, Spring Boot, Python, Flask, Spring Data JPA/Hibernate, Spring Security, JWT, H2, MySQL, Maven, Swagger/OpenAPI y LangChain4j.
- **Inteligencia Artificial Generativa:** Google Gemini, utilizado para la generación de recomendaciones financieras personalizadas.
- **Frontend:** React, TypeScript, Vite, pnpm y CSS.
- **Cloud:** Oracle Cloud Infrastructure (OCI), Object Storage, Compute y Networking.
- **Gestión y colaboración:** Trello, GitHub, GitHub Desktop, Discord y Figma.

El detalle completo de las herramientas, tecnologías, librerías y servicios utilizados se encuentra disponible en [`docs/Herramientas_y_Tecnologias.md`](docs/Herramientas_y_Tecnologias.md).

---

## 🧩 Componentes de la Solución

### 📊 Ciencia de Datos

El componente de **Ciencia de Datos** se encarga del procesamiento y análisis de la información financiera y transaccional, incluyendo la preparación de los datos, el análisis exploratorio, la ingeniería de características, la clasificación automática de transacciones y la evaluación del perfil financiero del usuario.

Los modelos desarrollados permiten generar los resultados utilizados por los demás componentes de **Finance AI** para proporcionar indicadores y recomendaciones financieras al usuario.

Para consultar el detalle del desarrollo, modelos, evaluación e integración del área:

- [`README – Ciencia de Datos`](Ciencia%20de%20Datos/README.md)
- [`Documentación técnica – Ciencia de Datos`](docs/Ciencia_Datos.md)

### ⚙️ Backend

El componente de **Backend** proporciona los servicios necesarios para la comunicación entre la Aplicación Web para escritorio (PC), los servicios de análisis financiero, los modelos de Machine Learning y la infraestructura utilizada por la solución.

La implementación integra servicios desarrollados en **Java/Spring Boot** y **Python/Flask**, responsables de gestionar la información financiera, exponer los endpoints de la solución, ejecutar los cálculos financieros e integrar los modelos desarrollados por Ciencia de Datos.

Asimismo, Finance AI incorpora un servicio de **Nuevo Análisis** que actúa como orquestador del procesamiento financiero y permite enriquecer los resultados mediante la generación de recomendaciones financieras personalizadas utilizando Inteligencia Artificial Generativa.

Para consultar el detalle de la implementación y documentación técnica del área:

- [`README – Backend`](backend/Readme.md)
- [`Documentación técnica – Backend`](docs/Backend.md)

---

### 🖥️ Frontend

El componente de **Frontend** proporciona la **Aplicación Web para escritorio (PC)** mediante la cual el usuario interactúa con Finance AI y visualiza su información y los resultados del análisis financiero.

En la versión final del MVP, el flujo principal de la aplicación prioriza las funcionalidades de **Dashboard, Nuevo Análisis, Historial y Soporte**.

Las funcionalidades de **Metas** y **Notificaciones** se encuentran desarrolladas a nivel de Frontend y preservadas dentro de la aplicación, aunque fuera de la navegación principal del MVP. Su integración completa con Backend se contempla como una mejora futura.

**Configuración** no forma parte de las funcionalidades implementadas para la versión final del MVP y se contempla como una posible evolución futura de Finance AI.

Para consultar el detalle de la implementación, arquitectura y estado técnico del área:

- [`README – Frontend`](frontend/README.md)
- [`Documentación técnica – Frontend`](docs/Frontend.md)

---

### ☁️ Oracle Cloud Infrastructure (OCI)

**Oracle Cloud Infrastructure (OCI)** proporciona la infraestructura cloud utilizada por Finance AI mediante **Object Storage** para el almacenamiento de los modelos de Machine Learning, **Compute** para el despliegue de la API REST y **Networking** para la configuración de red.

Los modelos desarrollados por Ciencia de Datos se encuentran almacenados en Object Storage y disponibles para su utilización por Backend. La API REST se encuentra desplegada sobre una instancia de OCI Compute.

Para consultar la documentación técnica:

- [`Documentación técnica – OCI`](docs/OCI.md)

---

## 📚 Documentación del Proyecto

La documentación del proyecto se encuentra organizada en la carpeta `docs/`.

- [`Documentación general del proyecto`](docs/Documentacion_Proyecto_Hackathon.md)
- [`Herramientas y Tecnologías`](docs/Herramientas_y_Tecnologias.md)
- [`Manual de Usuario`](docs/Manual_Usuario.md)
- [`Pruebas y Validación del MVP`](docs/Pruebas_y_Validacion.md)
- [`Documentación técnica – Ciencia de Datos`](docs/Ciencia_Datos.md)
- [`Documentación técnica – Backend`](docs/Backend.md)
- [`Documentación técnica – Frontend`](docs/Frontend.md)
- [`Documentación técnica – OCI`](docs/OCI.md)
- [`Minutas de reuniones`](docs/minutas/)

---

## 🔗 Enlaces del Proyecto

Los enlaces oficiales del proyecto, herramientas utilizadas, aplicación, diseño y entregables se encuentran centralizados en:

- [`Enlaces del Proyecto`](docs/Enlaces_Proyecto.md)

---

## 👥 Equipo

Finance AI fue desarrollado por un equipo multidisciplinario integrado por perfiles de **Project Management, Ciencia de Datos, Data Engineering, Backend, Frontend, Full Stack y Software Engineering**.

---

## 📌 Estado del Proyecto

✅ **Finance AI cuenta con una versión funcional del MVP desarrollada, integrada y validada para su demostración.**

Los componentes de **Ciencia de Datos, Backend, Frontend y Oracle Cloud Infrastructure (OCI)** se encuentran desarrollados y cuentan con su documentación correspondiente.

Las versiones definitivas de Backend y Frontend se encuentran consolidadas en `main`.

El flujo funcional del MVP fue validado en entorno local, confirmando la integración de los principales componentes de la solución y el funcionamiento de los casos de uso definidos para la demostración.

La **API REST** se encuentra desplegada en **OCI Compute** y los modelos de Machine Learning utilizados por la solución se encuentran almacenados en **OCI Object Storage**.

Adicionalmente, se dispone de una versión pública de la WebApp cuya comunicación con las APIs continúa en revisión, sin afectar el funcionamiento del MVP validado en entorno local.