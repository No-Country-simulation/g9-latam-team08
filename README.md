# 🌐 API HUB
Este espacio agrupa las diferentes APIs que componen el sistema. A continuación encontrarás una descripción general de cada componente y los accesos directos a sus respectivas documentaciones.
# 🏗️ Componentes del Sistema
## 🚀 API REST
**Descripción:** Aplicación integral desarrollada para gestionar las finanzas de los usuarios, integrando un backend robusto en Spring Boot con servicios de Machine Learning basados en Python para la categorización automática de gastos y el análisis de perfiles de riesgo financiero.

**Tecnologías principales:**
* **Java / Spring Boot:** Framework para el desarrollo de la API REST del backend.
* **Spring Data JPA / Hibernate:** Mapeo objeto-relacional para la persistencia de datos.
* **Python / Flask:** Microservicio encargado de la ejecución de lógica financiera y modelos de Machine Learning.
* **Pandas / Scikit-learn / Joblib:** Procesamiento de datos y ejecución de modelos predictivos.
* **MySQL:** Sistema de gestión de base de datos relacional.
* **Oracle Cloud Infrastructure (OCI) Object Storage:** Almacenamiento en la nube para los artefactos de modelos de Machine Learning.
* **Requests:** Cliente HTTP para la comunicación entre servicios.

**Documentación:** [Documentacion](https://github.com/No-Country-simulation/g9-latam-team08/blob/APIS/APIREST/apirest/readme.md)
## 🐍 API Python
**Descripción:**Esta API en Python se encarga de procesar cálculos financieros, evaluar ratios de salud económica y realizar inferencias utilizando modelos de Machine Learning (descargados dinámicamente desde Oracle Cloud Infrastructure Object Storage).

**Tecnologías principales:**
* **Python** - Lenguaje principal de programación.
* **Flask** - Microframework para la creación de la API REST.
* **Pandas** - Manipulación y análisis de estructuras de datos.
* **Scikit-learn / Joblib** - Carga y ejecución de modelos predictivos de Machine Learning.
* **Requests** - Gestión de peticiones HTTP para descarga dinámica de artefactos.
* **OCI Object Storage** - Almacenamiento en la nube para los modelos `.pkl`.

**Documentación:** [Documentacion](https://github.com/No-Country-simulation/g9-latam-team08/blob/APIS/APIPYTHON/README.md)
# 📁 Estructura del Proyecto
```
.
├── api-rest/          # Código fuente y docs de la API REST
├── api-python/        # Código fuente y docs de la API Python
└── README.md          # Este archivo (Hub central)
```


> [!NOTE]
> Si deseas levantar todo el entorno localmente o tienes dudas sobre los flujos de autenticación compartidos, por favor consulta la documentación específica dentro de la carpeta de cada servicio.
