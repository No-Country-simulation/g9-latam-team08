# Resumen de la Reunión – Semana 5

**Fecha:** Lunes, 17 de agosto de 2026

---

# Objetivo de la reunión

Realizar el seguimiento del estado actual del MVP, revisar especialmente el avance de Frontend y los pendientes necesarios para comenzar las pruebas finales, dar seguimiento a la documentación y los entregables correspondientes a la Semana 5, revisar la organización final del repositorio y continuar la preparación del Demo Day.

---

# Seguimiento de acuerdos de la reunión anterior

| Acuerdo | Estado |
| --- | :---: |
| Continuar priorizando la implementación y finalización funcional de Frontend. | 🟡 En progreso |
| Evaluar el inicio de las pruebas integrales a partir del 17/08. | 🟡 Pendiente |
| Continuar consolidando la documentación técnica de las áreas. | 🟡 En progreso |
| Completar la documentación de Ciencia de Datos. | ✅ Cumplido |
| Continuar completando la documentación de Backend. | 🟡 En progreso |
| Completar la documentación de Frontend. | 🟡 En progreso |
| Completar la documentación de OCI de acuerdo con el despliegue definitivo. | 🟡 En progreso |
| Continuar preparando los entregables de No Country. | 🟡 En progreso |
| Continuar la preparación del Pitch y Demo Day. | 🟡 En progreso |
| Mantener actualizado el Trello General y el repositorio. | 🟡 En seguimiento |

---

## Participantes

### Presentes

- Fernando Thiele – Data Scientist.
- Juan Manuel Roldán – Backend Developer.
- Leandro Baque – Backend Developer.
- Thiago Beber Feil – Full Stack Developer.
- Magalí Aldana Suarez – Frontend Developer.
- Yanucelly Moreira – Project Manager.

### Participación parcial

- Matías Bueno – Data Engineer. Participó brevemente y debió desconectarse debido a problemas de conexión.

### Ausentes

- Lucía Evelyn Jantus – Data Scientist.
- Alan Joel Romero – Software Engineer.

---

# Temas tratados

## 1. Estado de Frontend

Se realizó el seguimiento del estado actual de Frontend con el objetivo de conocer los avances alcanzados y los pendientes necesarios para completar la aplicación.

Thiago informó que continúa trabajando en las actualizaciones del **sidebar del Dashboard** y que estima finalizar esta actividad durante el día.

Magalí informó que se encuentra trabajando en la implementación de **Nuevo Análisis**, reutilizando componentes existentes para avanzar con esta funcionalidad.

De acuerdo con lo informado durante la reunión, entre las funcionalidades que todavía se encuentran pendientes se mencionaron:

- Recomendaciones.
- Configuración.
- Notificaciones.

También se mencionó la funcionalidad de **metas**. Se recordó que las **recomendaciones** forman parte de los requerimientos del MVP y deben mantenerse como prioridad para la versión final.

El equipo estima continuar avanzando durante el día con el objetivo de completar los pendientes actuales y poder avanzar posteriormente con las pruebas del MVP.

---

## 2. Integración y comienzo de las pruebas finales

Se revisó la necesidad de comenzar las pruebas funcionales y de integración del MVP una vez que se encuentren disponibles las funcionalidades necesarias de Frontend.

El equipo manifestó la expectativa de completar durante el día los trabajos actualmente pendientes para poder avanzar posteriormente con las pruebas.

Durante esta reunión **no se confirmó el estado definitivo de las integraciones entre Frontend, Backend y Ciencia de Datos**, por lo que este punto queda pendiente de seguimiento.

La revisión del estado de integración queda como uno de los puntos prioritarios para la reunión del miércoles 19/08.

La revisión del estado de integración queda como uno de los puntos prioritarios de seguimiento para la reunión del miércoles 19/08.

---

## 3. Funcionalidades finales del MVP

Se conversó sobre las funcionalidades que deben quedar disponibles en la versión final del MVP.

Durante el seguimiento de Frontend se mencionaron como pendientes recomendaciones, configuración y notificaciones.

Se recordó que las **recomendaciones financieras forman parte de los requerimientos del MVP**, por lo que su implementación deberá considerarse dentro de las funcionalidades prioritarias para el cierre.

Las demás funcionalidades deberán mantenerse alineadas con lo que efectivamente quede implementado y operativo en la versión final de FinanceAI.

---

## 4. Documentación

Se informó al equipo sobre el estado actual de la documentación del proyecto.

### Ciencia de Datos

La documentación correspondiente a Ciencia de Datos se encuentra **completada y revisada**, incluyendo el README principal del área, los README técnicos de los modelos y `docs/Ciencia_Datos.md`.

### Backend

La documentación de Backend se encuentra avanzada y con algunos puntos pendientes registrados en la tarjeta correspondiente del Trello General.

También se conversó sobre los distintos README existentes dentro de los componentes de Backend y la necesidad de mantenerlos organizados de acuerdo con la estructura final del área.

### Frontend

La documentación de Frontend todavía requiere mayor avance y deberá actualizarse de acuerdo con la versión final implementada.

Se recordó también la necesidad de elaborar el **Manual de Usuario**. Como orientación para su preparación, se planteó la posibilidad de utilizar capturas de las pantallas definitivas de la aplicación acompañadas por explicaciones del flujo y funcionalidades correspondientes.

Juan y Thiago informaron que van a ir documentando los desarrollos realizados por ellos dentro de Frontend.

### OCI

La documentación de OCI presenta avances, quedando pendiente completar la información correspondiente al **despliegue definitivo** y actualizarla de acuerdo con el resultado final.

---

## 5. Organización final del repositorio y la rama `main`

Se planteó la necesidad de definir una estructura organizada para la versión final que será integrada en `main`.

Actualmente, `main` contiene en la raíz archivos correspondientes a Ciencia de Datos y una estructura que no representa todavía la organización final prevista para el proyecto.

Se explicó la propuesta de organizar la versión final por áreas, diferenciando claramente:

- `backend/`
- `frontend/`
- `ciencia_datos/`
- `docs/`
- `README.md` principal del proyecto.

Dentro de cada área deberán quedar organizados sus componentes y README correspondientes.

Se indicó además que se está trabajando por separado en la elaboración del **README principal del proyecto**, que posteriormente deberá incorporarse a la estructura final.

La estructura propuesta deberá revisarse y confirmarse antes de realizar las integraciones finales a `main`.

### Estructura propuesta del repositorio

```text
g9-latam-team08/
│
├── backend/
│   ├── archivos y componentes de Backend
│   ├── README.md
│   │
│   ├── apirest/
│   │   ├── archivos API REST Spring Boot
│   │   └── README.md
│   │
│   └── [servicio Python-Flask]/
│       ├── archivos API Python/Flask
│       └── README.md
│
├── frontend/
│   ├── archivos y componentes de Frontend
│   └── README.md
│
├── ciencia_datos/
│   ├── Dataset/
│   │
│   ├── models/
│   │   ├── ClasificacionGastos/
│   │   │   ├── archivos del modelo
│   │   │   └── README.md
│   │   │
│   │   └── ClasificacionPerfil/
│   │       ├── archivos del modelo
│   │       └── README_Salud_financiera.md
│   │
│   ├── Notebook_Principal.ipynb
│   └── README.md
│
├── docs/
│   ├── minutas/
│   │   ├── README.md
│   │   └── minutas
│   │
│   ├── Backend.md
│   ├── Ciencia_Datos.md
│   ├── Control_y_Revision_Documentacion_Proyecto.md
│   ├── Documentacion_Proyecto_Hackathon.md
│   ├── Enlaces_Proyecto.md
│   ├── Frontend.md
│   ├── Herramientas_y_Tecnologias.md
│   ├── Manual_Usuario.md
│   ├── OCI.md
│   ├── Pruebas_y_validacion_MVP.md
│   └── README.md
│
└── README.md
```

La estructura se presenta como **propuesta de organización para la versión final del repositorio**. Cada área deberá confirmar la ubicación definitiva de sus componentes y README antes de realizar las integraciones finales a `main`.

En particular, queda pendiente confirmar:

- La denominación y ubicación definitiva del componente **Python/Flask** dentro de Backend.
- La organización definitiva de los **README de Frontend**.
- Cualquier ajuste que las áreas consideren necesario de acuerdo con la estructura final de sus desarrollos.

---

## 6. Semana 5 y entregables

Se repasaron las principales fechas y actividades correspondientes a la Semana 5:

- **17/08:** Sprint Planning Meet. (Obligatorio).
- **17/08 al 23/08:** Feedback a compañeros.
- **19/08:** Llevar propuestas escritas para el Pitch, tomando como punto de partida el storytelling elaborado por Lucía sobre Mateo.
- **20/08:** Pre Demo Meet de No Country. (Obligatorio).
- **21/08:** objetivo interno para finalizar y publicar el Video Demo.
- **22/08:** revisión interna de entregables y Pitch preparado.
- **23/08 – 23:59 h:** cierre oficial de entregables y Video Demo en No Country.
- **25/08 y 27/08:** Demo Day LATAM.

Se recordó la importancia de priorizar durante los próximos días la finalización del MVP, las pruebas, la documentación y la preparación de los entregables.

---

## 7. Preparación del Pitch y Demo Day

Se acordó realizar una nueva reunión el **miércoles 19/08 a las 12:30 h (Argentina)**, destinada principalmente a avanzar de manera conjunta en la **elaboración del Pitch para el Demo Day**.

La preparación deberá continuar alineándose con las funcionalidades que finalmente se encuentren implementadas y operativas en el MVP.

---

# Riesgos y puntos de seguimiento

El principal punto de seguimiento continúa siendo la **finalización funcional de Frontend**, junto con la disponibilidad del flujo integrado necesario para avanzar con las pruebas finales.

También queda pendiente confirmar el estado definitivo de las integraciones entre los distintos componentes del MVP.

La cercanía de las fechas de entrega de la Semana 5 requiere priorizar:

- Finalización del MVP.
- Inicio de pruebas.
- Corrección de incidencias.
- Cierre documental.
- Video Demo.
- Preparación del Pitch y Demo Day.

---

# Acuerdos alcanzados

- Actualizar en el Trello de Desarrollo las tareas de Frontend que ya hayan sido culminadas, reflejando su estado actual.
- Informar por Discord los últimos avances de Frontend para mantener al equipo actualizado sobre las funcionalidades completadas y los pendientes.
- Continuar priorizando durante el día la finalización de las funcionalidades pendientes de Frontend.
- Mantener las **recomendaciones** como una de las funcionalidades necesarias para completar el MVP.
- Iniciar las pruebas funcionales y de integración una vez que se encuentre disponible el flujo integrado del MVP.
- Continuar completando la documentación de Backend con los desarrollos realizados.
- Continuar avanzando con la documentación de Frontend.
- Elaborar el Manual de Usuario sobre la versión final de la aplicación.
- Completar la documentación de OCI con la información correspondiente al despliegue definitivo.
- Organizar la estructura final del repositorio antes de realizar las integraciones definitivas a `main`.
- Mantener un README principal del proyecto en la raíz de la estructura final.
- Realizar la próxima reunión el **miércoles 19/08 a las 12:30 h**, con foco en la preparación del Pitch del Demo Day.

---

# Pendientes

- Frontend: actualizar en el Trello de Desarrollo las tareas culminadas y mantener actualizado el estado de las que continúan en desarrollo.
- Frontend: comunicar por Discord los últimos avances realizados y los pendientes actuales.
- Finalizar las funcionalidades pendientes de Frontend.
- Confirmar el estado final de la integración **Frontend ↔ Backend**.
- Confirmar el estado final de la integración **Backend ↔ Ciencia de Datos**.
- Iniciar las pruebas funcionales y de integración del MVP.
- Registrar y corregir las incidencias detectadas durante las pruebas.
- Completar los pendientes documentales de Backend.
- Completar la documentación de Frontend.
- Elaborar el Manual de Usuario.
- Completar la documentación de OCI correspondiente al despliegue.
- Confirmar la estructura definitiva que será integrada a `main`.
- Completar el README principal del proyecto.
- Continuar preparando los entregables de No Country.
- Elaborar conjuntamente el Pitch del Demo Day.
- Definir el Happy Path definitivo una vez finalizadas las pruebas.

---

# Próxima reunión

**Fecha:** Miércoles, 19 de agosto de 2026  
**Hora:** 12:30 h (Argentina)

**Objetivo principal:** trabajar conjuntamente en la elaboración y organización del **Pitch para el Demo Day**, además de verificar el estado alcanzado del MVP y de las pruebas finales.

---

# Cierre

La reunión permitió actualizar el estado de Frontend y confirmar que todavía se encuentran en desarrollo algunas funcionalidades necesarias para completar la versión final del MVP.

El equipo continuará trabajando durante el día con el objetivo de disponer del flujo integrado necesario para iniciar las pruebas funcionales y de integración del MVP.

Paralelamente, se continuará avanzando con la documentación de Backend, Frontend y OCI, la organización final del repositorio y la preparación de los entregables de No Country.

La próxima reunión se realizará el **miércoles 19/08 a las 12:30 h**, con foco principal en la elaboración conjunta del Pitch para el Demo Day y el seguimiento del estado final del MVP.