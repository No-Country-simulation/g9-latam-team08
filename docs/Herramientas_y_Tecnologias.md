# 📊 Finance AI – Asistente Inteligente de Salud Financiera

## Herramientas y Tecnologías

---

## Objetivo

Documentar las herramientas, tecnologías, lenguajes, plataformas y servicios utilizados durante el desarrollo del proyecto, facilitando la comprensión de los recursos tecnológicos empleados por cada área y de la solución implementada.

---

## Alcance

Este documento reúne las herramientas y tecnologías utilizadas por los equipos de Ciencia de Datos, Backend, Frontend y Oracle Cloud Infrastructure (OCI), así como las herramientas empleadas para la gestión y colaboración durante el desarrollo del proyecto.

---

## Ciencia de Datos

Las siguientes herramientas y tecnologías son utilizadas para la generación y preparación de los datos, análisis exploratorio, desarrollo y evaluación de los modelos de Machine Learning e integración del componente de Ciencia de Datos.

### Lenguaje de programación

#### Python

Lenguaje utilizado para la generación y procesamiento de los datasets, análisis de datos, ingeniería de características, entrenamiento y evaluación de los modelos de Machine Learning.

### Librerías y frameworks

- **pandas:** manipulación y procesamiento de datos.
- **NumPy:** operaciones numéricas y procesamiento de datos.
- **scikit-learn:** desarrollo y evaluación del modelo de clasificación del perfil financiero.
- **imbalanced-learn (SMOTE):** balanceo de clases durante la preparación de los datos.
- **TensorFlow / Keras:** desarrollo del modelo de clasificación de transacciones.
- **joblib:** serialización del modelo de perfil financiero.
- **ydata-profiling:** generación de reportes para el análisis exploratorio de datos.
- **Plotly:** visualización interactiva de datos.

### Machine Learning

- **Random Forest:** algoritmo utilizado para la clasificación del perfil financiero.
- **SMOTE:** técnica utilizada para el balanceo de clases.

### Base de datos

#### MySQL

Sistema de gestión de base de datos utilizado para almacenar y gestionar la información financiera procesada durante el desarrollo.

### Infraestructura y servicios

#### Railway

Plataforma utilizada para alojar la base de datos MySQL utilizada por la solución.

#### Oracle Cloud Infrastructure (OCI)

Plataforma cloud utilizada para el almacenamiento de los modelos entrenados y sus artefactos mediante Object Storage, facilitando su disponibilidad para la integración con Backend.

### Herramientas

- **Google Colab:** entorno utilizado para el desarrollo y entrenamiento de los modelos de Machine Learning.
- **DBeaver:** herramienta utilizada para la gestión y consulta de la base de datos.
- **GitHub:** plataforma utilizada para el control de versiones y almacenamiento de los recursos desarrollados por el área.

---

## Backend

Las siguientes herramientas y tecnologías son utilizadas para el desarrollo de los servicios Backend de Finance AI, la implementación de la API REST y la integración con los modelos de Machine Learning.

### Lenguajes de programación

- **Java:** lenguaje utilizado para el desarrollo de la API REST principal.

- **Python:** lenguaje utilizado para el servicio encargado de los cálculos financieros y la ejecución de los modelos de Machine Learning.

### Frameworks

- **Spring Boot:** framework utilizado para el desarrollo de la API REST en Java.

- **Spring Data JPA / Hibernate:** utilizados para el mapeo objeto-relacional y la persistencia de datos.

- **Flask:** microframework utilizado para implementar la API en Python encargada de los cálculos financieros y la ejecución de los modelos de Machine Learning.

### Procesamiento e integración con Machine Learning

- **Pandas:** utilizado para la manipulación y procesamiento de datos dentro del servicio Python.

- **scikit-learn:** utilizado para la ejecución de los modelos predictivos.

- **joblib:** utilizado para la carga y ejecución de los modelos serializados.

- **Requests:** utilizado para realizar peticiones HTTP y acceder a los artefactos requeridos por el servicio.

### Orquestación y recomendaciones con Inteligencia Artificial

- **LangChain4j:** framework utilizado en el servicio de Nuevo Análisis para integrar el Backend con el modelo de Inteligencia Artificial Generativa.

- **Google Gemini AI:** utilizado para generar recomendaciones financieras personalizadas a partir de los resultados obtenidos durante el análisis financiero.

- **Spring RestClient:** utilizado para la comunicación entre el servicio orquestador y los servicios Backend involucrados en el procesamiento del análisis.

### Base de datos

- **MySQL:** sistema de gestión de base de datos relacional utilizado para la persistencia de la información.

### Integración con OCI

- **Oracle Cloud Infrastructure (OCI) Object Storage:** utilizado para almacenar los artefactos de los modelos de Machine Learning que son utilizados por los servicios de Backend.

- **Oracle Cloud Infrastructure (OCI) Compute:** infraestructura utilizada para el despliegue y ejecución de la API REST del proyecto.

### Gestión de dependencias y construcción

- **Maven:** utilizado para la gestión de dependencias y construcción de la aplicación desarrollada con Spring Boot.

### Control de versiones

- **Git:** sistema utilizado para el control de versiones.

- **GitHub:** plataforma utilizada para alojar y gestionar colaborativamente el código fuente.

---

## Frontend

Las siguientes herramientas y tecnologías son utilizadas para el desarrollo de la interfaz web de Finance AI, la construcción de componentes reutilizables, la navegación entre las distintas páginas y la interacción con los servicios de la aplicación.

### Framework y lenguaje

- **React 19:** utilizado para el desarrollo de la interfaz de usuario y la construcción de componentes reutilizables.

- **TypeScript 5:** lenguaje utilizado para el desarrollo del Frontend, proporcionando tipado estático y facilitando la organización y mantenimiento del código.

### Navegación

- **React Router DOM 7:** utilizado para gestionar las rutas públicas y privadas y la navegación entre las distintas páginas de la aplicación.

### Formularios y validación

- **React Hook Form:** utilizado para la gestión de formularios, incluyendo el flujo de Nuevo Análisis.

- **Zod:** utilizado para la validación de los datos ingresados por el usuario.

### Componentes e interfaz

- **Radix UI Dialog:** utilizado para la implementación de componentes de diálogo en la interfaz.

- **Lucide React:** librería de iconos utilizada en los componentes de la aplicación.

- **React Icons:** librería utilizada para incorporar iconos en la interfaz.

### Autenticación

- **Google OAuth:** utilizado para implementar la opción de inicio de sesión mediante cuenta de Google.

### Exportación de información

- **jsPDF:** utilizado para generar documentos PDF desde el Frontend.

- **jsPDF AutoTable:** utilizado junto con jsPDF para generar tablas dentro de los documentos PDF exportados.

### Herramientas de desarrollo

- **Vite 7:** herramienta utilizada para el desarrollo, ejecución local y construcción del Frontend.

- **pnpm:** gestor de paquetes utilizado para la instalación y administración de las dependencias del proyecto.

### Estilos y diseño de interfaz

- **CSS:** utilizado para la definición de estilos de las páginas y componentes de la aplicación.

- **Design Tokens:** utilizados para centralizar y mantener consistentes los estilos visuales de la aplicación mediante `tokens.css` y `globals.css`.

---

## Oracle Cloud Infrastructure (OCI)

Las siguientes herramientas, servicios y tecnologías son utilizados para el almacenamiento de los modelos de Machine Learning, la infraestructura de despliegue de la API y la configuración de red de la solución.

### Plataforma Cloud

#### Oracle Cloud Infrastructure (OCI)

Plataforma de infraestructura cloud utilizada para almacenar los modelos entrenados y sus artefactos mediante Object Storage, proporcionar la infraestructura necesaria para el despliegue de la API REST mediante Compute y configurar la conectividad de la solución mediante servicios de Networking.


### Servicios de OCI

#### Object Storage

Servicio utilizado para almacenar los modelos entrenados y los artefactos generados por Ciencia de Datos, organizados en las carpetas `clasificacion-gastos/` y `clasificacion-perfil/`.

#### Compute

Servicio utilizado para provisionar la instancia destinada al alojamiento de la API REST del proyecto.

#### Networking

Servicios de red utilizados para configurar la conectividad de la infraestructura mediante:

- **VCN (Virtual Cloud Network):** red virtual creada para la infraestructura del proyecto.
- **Subnet pública:** utilizada para proporcionar conectividad a la instancia Compute.
- **Security Lists:** utilizadas para definir las reglas de tráfico de red, incluyendo la habilitación del puerto 8080 para la API.

### Servicios no implementados en OCI

- **Functions:** no fue utilizado en la implementación final del MVP.
- **Base de datos:** no fue implementada en OCI; la persistencia utiliza MySQL alojado en Railway.

### Acceso a recursos

#### Pre-Authenticated Request (PAR)

Mecanismo utilizado para proporcionar a Backend acceso de lectura y listado a los modelos almacenados en Object Storage sin exponer credenciales permanentes de la cuenta OCI.

#### SSH

Protocolo utilizado para el acceso seguro a la instancia Compute mediante autenticación por clave.

### Sistema operativo

#### Ubuntu 20.04

Sistema operativo utilizado en la instancia Compute provisionada para el proyecto.

---

## Herramientas de Gestión y Colaboración

Las siguientes herramientas fueron utilizadas para la planificación, coordinación, comunicación, control de versiones y documentación del proyecto durante el Hackathon.

### Planificación y seguimiento

#### Trello

Herramienta utilizada para la planificación, organización y seguimiento de las actividades del proyecto mediante tableros Kanban. Permitió gestionar el backlog, organizar las tareas por áreas y realizar el seguimiento de los avances del equipo.

### Control de versiones y colaboración

#### Git

Sistema de control de versiones utilizado para gestionar los cambios realizados en el código fuente y la documentación del proyecto.

#### GitHub

Plataforma utilizada para alojar el repositorio del proyecto, gestionar las distintas ramas de trabajo, facilitar la colaboración entre los integrantes y centralizar el código y la documentación.

#### GitHub Desktop

Aplicación de escritorio utilizada para facilitar la gestión de commits, ramas y sincronización del repositorio con GitHub.

### Comunicación

#### Discord

Plataforma utilizada como canal principal de comunicación del equipo para coordinar reuniones, compartir avances, resolver consultas y realizar el seguimiento del proyecto.

### Diseño y prototipado

#### Figma

Herramienta utilizada para el diseño y prototipado de las interfaces de usuario del proyecto, facilitando la definición visual de las pantallas y la colaboración durante el desarrollo del Frontend.

### Documentación

#### Markdown (.md)

Lenguaje de marcado utilizado para elaborar y mantener la documentación técnica, funcional y de gestión del proyecto.

#### Visual Studio Code

Editor utilizado para trabajar con el código fuente y la documentación del proyecto.

---

## Equipo del Proyecto

El proyecto es desarrollado por un equipo multidisciplinario integrado por profesionales de distintas áreas, que participan de forma colaborativa en el desarrollo del MVP.

| Integrante | Rol en el Proyecto |
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

## Observaciones

Este documento consolida las principales herramientas, tecnologías, lenguajes, frameworks, plataformas y servicios utilizados por las diferentes áreas durante el desarrollo de **Finance AI – Asistente Inteligente de Salud Financiera**.

La selección tecnológica responde a las necesidades de los componentes de Ciencia de Datos, Backend, Frontend e infraestructura cloud, así como a los requerimientos de gestión, colaboración, documentación y control de versiones del proyecto.

La información técnica específica sobre la implementación de cada componente se encuentra disponible en los README y documentos técnicos correspondientes del repositorio.

---