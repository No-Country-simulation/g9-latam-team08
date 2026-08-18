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
- **Oracle Cloud Infrastructure (OCI):** proporciona la infraestructura cloud utilizada para el almacenamiento de los modelos de Machine Learning mediante Object Storage y la infraestructura destinada al despliegue de la API mediante Compute y servicios de red.

### Flujo general

**Usuario → Frontend → Backend → Ciencia de Datos → Backend → Frontend → Usuario**

Los modelos de Machine Learning y archivos asociados son almacenados en **Oracle Cloud Infrastructure (OCI)** y utilizados por los servicios de la solución para procesar la información financiera y presentar los resultados al usuario.

---

## 🛠️ Herramientas y Tecnologías

**Finance AI** integra diferentes tecnologías de acuerdo con los componentes de la solución:

- **Ciencia de Datos:** Python, pandas, NumPy, scikit-learn, TensorFlow/Keras y MySQL.
- **Backend:** Java, Spring Boot, Python, Flask, Spring Data JPA/Hibernate, Spring Security, JWT, H2, MySQL, Maven y Swagger/OpenAPI.
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

El componente de **Backend** se encarga de proporcionar los servicios necesarios para la comunicación entre la Aplicación Web para escritorio (PC), los servicios de Ciencia de Datos y la infraestructura utilizada por la solución.

La implementación incluye servicios desarrollados en **Java/Spring Boot** y **Python/Flask**, responsables de gestionar la información financiera, exponer los endpoints de la solución e integrar los modelos desarrollados por Ciencia de Datos.

Para consultar la documentación técnica del área:

- [`Documentación técnica – Backend`](docs/Backend.md)

> 🔄 Pendiente incorporar el enlace al README principal de Backend una vez definida su ubicación definitiva.

---

### 🖥️ Frontend

El componente de **Frontend** proporciona la **Aplicación Web para escritorio (PC)** mediante la cual el usuario interactúa con Finance AI y visualiza su información y los resultados del análisis financiero.

Para consultar la documentación técnica del área:

- [`Documentación técnica – Frontend`](docs/Frontend.md)

> 🔄 Documentación de Frontend pendiente de completar y validar de acuerdo con la implementación definitiva.

---

### ☁️ Oracle Cloud Infrastructure (OCI)

**Oracle Cloud Infrastructure (OCI)** proporciona los servicios cloud utilizados por Finance AI para el almacenamiento de los modelos de Machine Learning y la infraestructura necesaria para el despliegue de componentes de la solución.

Para consultar la documentación técnica:

- [`Documentación técnica – OCI`](docs/OCI.md)

> 🔄 Documentación pendiente de actualización y validación final.

---

## 📚 Documentación del Proyecto

La documentación del proyecto se encuentra organizada en la carpeta `docs/`.

- [`Documentación general del proyecto`](docs/Documentacion_Proyecto_Hackathon.md)
- [`Herramientas y Tecnologías`](docs/Herramientas_y_Tecnologias.md)
- [`Manual de Usuario`](docs/Manual_Usuario.md)
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

🔄 **Finance AI se encuentra en etapa de integración, pruebas y cierre documental del MVP.**

Las áreas de Ciencia de Datos y Backend cuentan con avances de desarrollo y documentación validados. Actualmente continúan el desarrollo e integración de Frontend, las pruebas finales del flujo integrado y la consolidación de la documentación y estructura definitiva del repositorio.

---

## 🎥 Demo

El Video Demo del MVP será incorporado una vez finalizadas las pruebas y validado el funcionamiento definitivo de Finance AI.

> 🔄 Enlace pendiente de incorporar.

