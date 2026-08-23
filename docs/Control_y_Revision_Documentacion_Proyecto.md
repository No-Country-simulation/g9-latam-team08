# Control y Revisión de la Documentación del Proyecto

**Proyecto:** G9 LATAM Team 08 – Hackathon No Country  
**Responsable:** Yanucelly Moreira  
**Rol:** Project Manager

---

## Objetivo

Registrar las revisiones realizadas a la documentación técnica del proyecto, consolidando las observaciones y sugerencias de mejora identificadas durante el proceso de revisión, con el propósito de mantener un estándar uniforme de calidad, organización y presentación en todos los componentes del proyecto.

---

## Alcance

Este documento contempla la revisión de la documentación técnica y de los README elaborados durante el desarrollo del proyecto, así como de otros documentos técnicos que formen parte de la entrega final.

---

## Estado del proceso de revisión documental

| Fecha | Documento | Estado |
|---|---|---|
| Semana del 27/07 al 31/07 | README – Ciencia de Datos | ✅ Revisado |
| Semana del 27/07 al 31/07 | Ciencia_Datos.md | ✅ Revisado |
| 04/08/2026 | README – API REST | ✅ Revisado |
| 04/08/2026 | README – API Python | ✅ Revisado |
| 05/08/2026 | Backend.md | ✅ Revisado |
| 05/08/2026 | Frontend.md | 🟡 Estructura preparada |
| 05/08/2026 | OCI.md | 🟡 Estructura preparada |

---

# 1. README – Ciencia de Datos

## Revisión de la Documentación

**Documento revisado:** README – Área de Ciencia de Datos  
**Responsable del documento:** Lucía Jantus  
**Fecha de revisión:** 28 de julio de 2026  
**Fecha de elaboración del informe:** 31 de julio de 2026

### Objetivo de la revisión

Revisar la estructura y el contenido del README del área de Ciencia de Datos, por ser el primer documento de este tipo elaborado en el proyecto, con el objetivo de verificar que la documentación contenga la información necesaria y establecer una base para la estandarización de los README de las demás áreas.

### Resultado de la revisión

| Sección | Estado | Observación |
|---|---|---|
| Descripción del módulo | ✅ | Completa. |
| Objetivo | ✅ | Completo. |
| Desarrollo / Implementación | ✅ | Completo. |
| Resultados | ✅ | Completo. |
| Integración con otras áreas | ✅ | Completa. |
| Estructura de archivos | ⚠️ | Se recomienda incorporarla al final del README. |
| Responsables | ⚠️ | Se recomienda incorporarlos al final del README. |

### Observaciones

El README presenta una documentación técnica clara, organizada y suficiente para comprender el desarrollo realizado por el área de Ciencia de Datos.

Como parte del proceso de estandarización de la documentación del proyecto, se recomienda incorporar al final del README las siguientes secciones:

- Estructura de archivos.
- Responsables.

Los README de las demás áreas (Backend, Frontend y OCI) seguirán este mismo estándar, adaptando el contenido a las características y responsabilidades de cada módulo.

Los lineamientos para la elaboración de los README se encuentran definidos en el documento `README.md` de la carpeta `docs`, en la sección:

- Estructura Estándar de los README.

### Conclusión

El README del área de Ciencia de Datos se considera aprobado como base para la documentación del proyecto.

Se recomienda incorporar las secciones **"Estructura de archivos"** y **"Responsables"** al final del README, para alinearlo con el estándar de documentación definido para todas las áreas.

---

# 2. Ciencia_Datos.md

## Revisión de la Documentación

**Documento revisado:** `Ciencia_Datos.md`  
**Responsable del documento:** Matías Bueno  
**Fecha de revisión:** 29 de julio de 2026  
**Fecha de elaboración del informe:** 31 de julio de 2026

### Objetivo de la revisión

Revisar la información proporcionada por Matías para el área de Ciencia de Datos e incorporarla al documento `docs/documentacion/Ciencia_Datos.md`, verificando que dicha información se encuentre organizada de acuerdo con el estándar de documentación definido para el proyecto.

### Resultado de la revisión

| Sección | Estado | Observación |
|---|---|---|
| Objetivo | ✅ | Completo. |
| Alcance | ✅ | Completo. |
| Dataset | ✅ | Completo. |
| Base de Datos | ✅ | Completo. |
| Análisis Exploratorio de Datos (EDA) | ✅ | Completo. |
| Preprocesamiento de Datos | ✅ | Completo. |
| Ingeniería de Características | ✅ | Completo. |
| Clasificación de Gastos | ✅ | Completo. |
| Modelos de Machine Learning | ✅ | Completo. |
| Entrenamiento del Modelo | ✅ | Completo. |
| Evaluación del Modelo | ✅ | Completo. |
| Serialización del Modelo | ✅ | Completo. |
| Dashboard | ✅ | Completo. |
| Integración con Backend | ⚠️ | Se recomienda ampliar el flujo de integración y el intercambio de información con Backend. |
| Infraestructura | ⚠️ | Se recomienda ampliar la documentación sobre Oracle Cloud Infrastructure (OCI) cuando la implementación se encuentre finalizada. |
| Herramientas y Tecnologías Utilizadas | ✅ | Completo. |
| Equipo Responsable | ✅ | Completo. |

### Matriz de Integración de la Información Proporcionada por Matías

| Información proporcionada por Matías | Sección de Ciencia_Datos.md | Estado |
|---|---|---|
| Descripción del dataset sintético | Dataset → Descripción | ✅ Incorporado |
| Proceso de generación del dataset | Dataset → Generación del Dataset | ✅ Incorporado |
| Variables base utilizadas | Dataset → Generación del Dataset | ✅ Incorporado |
| Variables calculadas | Dataset → Variables Calculadas | ✅ Incorporado |
| Reglas para la clasificación del perfil financiero | Dataset → Clasificación del Perfil Financiero | ✅ Incorporado |
| Cantidad de registros (500 clientes) | Dataset → Generación del Dataset | ✅ Incorporado |
| Descripción de la base de datos MySQL | Base de Datos → Modelo de Datos | ✅ Incorporado |
| Restricciones y validaciones (CHECK) | Base de Datos → Validaciones | ✅ Incorporado |
| Evolución del modelo de datos (nuevas columnas) | Base de Datos → Evolución del Modelo de Datos | ✅ Incorporado |
| Implementación de MySQL en Railway | Infraestructura → Railway | ✅ Incorporado |
| Configuración de la conexión mediante DBeaver | Infraestructura → Railway | ✅ Incorporado |
| Importación del dataset | Infraestructura → Railway | ✅ Incorporado |
| Uso previsto de Oracle Object Storage | OCI.md | 🔄 Corresponde al documento OCI.md |

### Observaciones

La información proporcionada por Matías fue organizada e incorporada en las secciones correspondientes del documento `Ciencia_Datos.md`, respetando la estructura estándar definida para la documentación del proyecto.

Posteriormente, el documento fue ampliado por el equipo de Ciencia de Datos, incorporando la documentación del análisis exploratorio de datos (EDA), preprocesamiento, ingeniería de características, modelos de Machine Learning, entrenamiento, evaluación, serialización e infraestructura.

Las recomendaciones pendientes corresponden únicamente a la ampliación de la documentación de la integración con Backend y de la infraestructura en Oracle Cloud Infrastructure (OCI), una vez finalizada su implementación.

### Conclusión

La información proporcionada inicialmente por Matías constituyó la base para la documentación técnica del área de Ciencia de Datos. Posteriormente, el documento fue ampliado por el equipo, incorporando la documentación de los principales procesos, modelos, infraestructura e integración desarrollados durante el proyecto.

Actualmente, `Ciencia_Datos.md` presenta una estructura organizada y homogénea con el resto de la documentación técnica del proyecto, constituyendo una referencia técnica completa del componente y alineada con el estándar de documentación definido para el proyecto.

# 3. README – API REST

## Revisión de la Documentación

**Documento revisado:** `apirest/README.md`  
**Responsable del documento:** Alan Romero  
**Fecha de revisión:** 04 de agosto de 2026  
**Fecha de elaboración del informe:** 05 de agosto de 2026

### Objetivo de la revisión

Revisar la estructura y el contenido del README correspondiente a la API REST, verificando que la documentación describa adecuadamente el componente y se encuentre alineada con el estándar de documentación definido para el proyecto.

### Resultado de la revisión

El README presenta una estructura clara y organizada, describiendo el objetivo de la API REST, sus funcionalidades, las tecnologías utilizadas y los principales endpoints implementados. En términos generales, constituye una base sólida para la documentación del componente.

Con el fin de mantener un estándar uniforme de documentación en todo el proyecto, se sugieren las siguientes mejoras.

### Observaciones y sugerencias

#### 1. Título del documento

**Observación**

El título actual corresponde al nombre del repositorio.

```md
# g9-latam-team08
```

**Sugerencia**

Utilizar un título que identifique claramente el componente documentado.

Por ejemplo:

```md
# API REST Backend – G9 LATAM Team 08
```

---

#### 2. Referencias de citas

**Observación**

Se identificaron referencias del tipo:

```text
[cite: 2]
[cite: 3,4]
```

Estas referencias no corresponden al formato utilizado por GitHub y no aportan información al documento.

**Sugerencia**

Eliminar todas las referencias `[cite: ...]` del README.

---

#### 3. Estructura del repositorio

**Observación**

La estructura del repositorio incluye componentes que pertenecen a otros módulos del proyecto y no exclusivamente a la API REST.

**Sugerencia**

Mostrar únicamente la estructura correspondiente al componente API REST, ya que este README documenta exclusivamente ese módulo.

---

#### 4. Formato de la documentación de endpoints

**Observación**

En algunos apartados no se mantiene un formato uniforme para documentar los endpoints. Por ejemplo, el endpoint **Registrar un usuario** presenta el nombre y la URL en la misma línea:

```text
Registrar un usuarioURL: /api/usuarios
```

**Sugerencia**

Mantener un formato uniforme para todos los endpoints, separando claramente el nombre del servicio, la URL, el método HTTP y la descripción.

**Ejemplo de formato recomendado**

**Registrar un usuario**

```text
URL: /api/usuarios
Método: POST
```

**Descripción:** Envía los datos financieros del usuario al microservicio de Python (`/calcular-finanzas`) para procesar los indicadores financieros y el perfil de riesgo antes de almacenarlos en la base de datos MySQL.

**Obtener todos los usuarios**

```text
URL: /api/usuarios
Método: GET
```

**Descripción:** Retorna la lista de todos los usuarios registrados.

---

#### 5. Instalación y ejecución

**Observación**

El documento no incluye instrucciones para ejecutar la API REST de forma local.

**Sugerencia**

Agregar una sección con:

- Requisitos previos.
- Configuración inicial.
- Dependencias.
- Ejecución del proyecto.
- Puerto utilizado.

---

#### 6. Integración con otros componentes

**Observación**

Se menciona la integración con la API desarrollada en Python, pero no existe una sección específica que explique esta interacción.

**Sugerencia**

Agregar una breve sección describiendo:

- Comunicación con la API Python.
- Consumo de servicios.
- Flujo general de integración.

---

#### 7. Validación de rutas

**Observación**

Se recomienda validar la definición de las rutas del módulo de usuarios para confirmar que la parametrización de los endpoints no genere ambigüedades durante su utilización.

**Sugerencia**

Confirmar que la definición de las rutas sea consistente y permita identificar correctamente cada endpoint.

### Conclusión

El README presenta una estructura clara, organizada y un contenido técnico adecuado para el componente API REST. Las observaciones realizadas corresponden principalmente a aspectos de formato, estandarización y organización de la documentación, con el objetivo de mantener un criterio homogéneo en todos los componentes del proyecto. Una vez incorporados estos ajustes, el documento quedará alineado con el estándar de documentación definido para el proyecto.

---

# 4. README – API Python

## Revisión de la Documentación

**Documento revisado:** `pythonApi/README.md`  
**Responsable del documento:** Alan Romero  
**Fecha de revisión:** 04 de agosto de 2026  
**Fecha de elaboración del informe:** 05 de agosto de 2026

### Objetivo de la revisión

Revisar la estructura y el contenido del README correspondiente a la API Python, verificando que la documentación describa adecuadamente el componente y se encuentre alineada con el estándar de documentación definido para el proyecto.

### Resultado de la revisión

El README presenta una estructura clara y organizada, describiendo el objetivo de la API Python, las tecnologías utilizadas, los endpoints implementados y el procedimiento básico para su instalación y ejecución. En términos generales, constituye una base sólida para la documentación del componente.

Con el fin de mantener un estándar uniforme de documentación en todo el proyecto, se sugieren las siguientes mejoras.

### Observaciones y sugerencias

#### 1. Título del documento

**Observación**

El título actual corresponde al nombre del repositorio.

```md
# g9-latam-team08
```

**Sugerencia**

Utilizar un título que identifique claramente el componente documentado.

Por ejemplo:

```md
# API Python – G9 LATAM Team 08
```

---

#### 2. Referencias de citas

**Observación**

Se identificaron referencias del tipo:

```text
[cite: 2]
```

Estas referencias no corresponden al formato utilizado por GitHub y no aportan información al documento.

**Sugerencia**

Eliminar todas las referencias `[cite: ...]` del README.

---

#### 3. Instalación y dependencias

**Observación**

Actualmente la instalación se realiza indicando directamente todas las dependencias:

```bash
pip install flask pandas requests joblib scikit-learn
```

**Sugerencia**

En caso de contar con un archivo `requirements.txt`, se recomienda utilizarlo para facilitar la instalación.

Por ejemplo:

```bash
pip install -r requirements.txt
```

---

#### 4. Variables de entorno

**Observación**

El documento no indica la configuración requerida para acceder a Oracle Cloud Infrastructure (OCI) Object Storage.

**Sugerencia**

Agregar una sección indicando las variables de entorno o la configuración necesaria para acceder a Oracle Cloud Infrastructure (OCI) Object Storage, en caso de que la aplicación las requiera.

---

#### 5. Integración con otros componentes

**Observación**

Se describe el funcionamiento de la API, pero no existe una sección específica que explique cómo interactúa con el Backend y Oracle Cloud Infrastructure.

**Sugerencia**

Agregar una breve sección describiendo:

- Comunicación con la API REST.
- Descarga de modelos desde Oracle Cloud Infrastructure.
- Flujo general de integración.

---

#### 6. Funcionalidades principales

**Observación**

Las funcionalidades de la API se encuentran distribuidas entre la descripción y los endpoints.

**Sugerencia**

Agregar una sección denominada **Funcionalidades principales**, donde se describan brevemente las capacidades de la API, por ejemplo:

- Clasificación automática de gastos.
- Cálculo de indicadores financieros.
- Evaluación del perfil financiero.
- Integración con modelos de Machine Learning.

### Conclusión

El README presenta una estructura clara, organizada y un contenido técnico adecuado para el componente API Python. Las observaciones realizadas corresponden principalmente a aspectos de formato, estandarización y organización de la documentación, con el objetivo de mantener un criterio homogéneo en todos los componentes del proyecto. Una vez incorporados estos ajustes, el documento quedará alineado con el estándar de documentación definido para el proyecto.

# 5. Backend.md

## Revisión de la Documentación

**Documento revisado:** `Backend.md`  
**Responsable del documento:** Equipo Backend  
**Fecha de revisión:** 05 de agosto de 2026

### Objetivo de la revisión

Verificar que la documentación del componente Backend se encuentre organizada conforme al estándar definido para la documentación técnica del proyecto.

### Resultado de la revisión

| Sección | Estado | Observación |
|---|---|---|
| Objetivo | ✅ | Completo. |
| Alcance | ✅ | Completo. |
| Desarrollo del Componente | ✅ | Organizado conforme al estándar. |
| Arquitectura | ⚠️ | Pendiente de completar por el equipo Backend. |
| API REST | ⚠️ | Pendiente de ampliar con la implementación definitiva. |
| Integración con Base de Datos | ✅ | Documentada. |
| Seguridad | ✅ | Documentada. |
| Pruebas | ✅ | Documentadas. |
| Integración con otras áreas | ⚠️ | Se recomienda ampliar el flujo de integración con Ciencia de Datos. |
| Infraestructura | ⚠️ | Pendiente de completar cuando finalice la implementación en Oracle Cloud Infrastructure (OCI). |
| Herramientas y Tecnologías Utilizadas | ✅ | Completo. |
| Equipo Responsable | ✅ | Completo. |

### Observaciones

La estructura del documento fue organizada y estandarizada conforme a la plantilla definida para la documentación técnica del proyecto. Se incorporaron las secciones de Objetivo y Alcance y se reorganizó el contenido existente sin modificar la información técnica proporcionada por el equipo.

Las recomendaciones pendientes corresponden a la ampliación de la arquitectura, la documentación de la API REST, la integración con Ciencia de Datos y la infraestructura en Oracle Cloud Infrastructure (OCI), una vez finalizada su implementación.

### Conclusión

El documento `Backend.md` presenta una estructura organizada y homogénea con el resto de la documentación técnica del proyecto. La documentación deberá continuar completándose y actualizándose conforme avance el desarrollo del componente.

---

# 6. Frontend.md

## Revisión de la Documentación

**Documento revisado:** `Frontend.md`  
**Responsable del documento:** Equipo Frontend  
**Fecha de revisión:** 05 de agosto de 2026

### Objetivo de la revisión

Verificar que la estructura inicial del documento correspondiente al componente Frontend se encuentre alineada con el estándar de documentación definido para el proyecto.

### Resultado de la revisión

| Sección | Estado | Observación |
|---|---|---|
| Objetivo | ✅ | Incorporado. |
| Alcance | ✅ | Incorporado. |
| Desarrollo del Componente | 🟡 | Estructura preparada. |
| Integración con otras áreas | 🟡 | Pendiente de completar por el equipo Frontend. |
| Infraestructura | 🟡 | Pendiente de completar. |
| Herramientas y Tecnologías Utilizadas | 🟡 | Pendiente de completar. |
| Equipo Responsable | 🟡 | Pendiente de completar. |

### Observaciones

La estructura inicial del documento `Frontend.md` fue elaborada durante el proceso de estandarización de la documentación del proyecto, incorporando las secciones de Objetivo, Alcance y la organización general definida para los documentos técnicos.

El contenido técnico del componente deberá ser incorporado posteriormente por el equipo Frontend conforme avance el desarrollo del proyecto.

### Conclusión

La estructura inicial del documento `Frontend.md` quedó alineada con el estándar de documentación definido para el proyecto. Corresponde al equipo Frontend completar la documentación técnica del componente.

---

# 7. OCI.md

## Revisión de la Documentación

**Documento revisado:** `OCI.md`  
**Responsable del documento:** Equipo Oracle Cloud Infrastructure (OCI)  
**Fecha de revisión:** 05 de agosto de 2026

### Objetivo de la revisión

Verificar que la estructura inicial del documento correspondiente a Oracle Cloud Infrastructure (OCI) se encuentre alineada con el estándar de documentación definido para el proyecto.

### Resultado de la revisión

| Sección | Estado | Observación |
|---|---|---|
| Objetivo | ✅ | Incorporado. |
| Alcance | ✅ | Incorporado. |
| Desarrollo del Componente | 🟡 | Estructura preparada. |
| Servicios Utilizados | 🟡 | Pendiente de completar. |
| Integración con otras áreas | 🟡 | Pendiente de completar. |
| Infraestructura | 🟡 | Pendiente de completar. |
| Herramientas y Tecnologías Utilizadas | 🟡 | Pendiente de completar. |
| Equipo Responsable | 🟡 | Pendiente de completar. |

### Observaciones

La estructura inicial del documento `OCI.md` fue elaborada durante el proceso de estandarización de la documentación del proyecto, incorporando las secciones definidas en el estándar documental.

El contenido técnico deberá ser incorporado posteriormente por el equipo responsable de Oracle Cloud Infrastructure (OCI), conforme avance la implementación de la infraestructura.


### Conclusión

La estructura inicial del documento `OCI.md` quedó alineada con el estándar de documentación definido para el proyecto. Corresponde al equipo responsable completar la documentación técnica del componente.

---

# Conclusiones Generales

El presente documento constituye un registro del proceso de revisión y estandarización de la documentación del proyecto. Su finalidad es facilitar el seguimiento de las mejoras propuestas, promover una documentación consistente entre los diferentes componentes y apoyar la preparación de la entrega final del hackathon.

Las observaciones y recomendaciones aquí registradas deberán ser evaluadas e incorporadas por los responsables de cada componente, según corresponda.

Este documento podrá actualizarse durante el desarrollo del proyecto para reflejar el avance de la documentación y las mejoras incorporadas por cada equipo.