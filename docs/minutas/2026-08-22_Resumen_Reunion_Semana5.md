# Resumen de la Reunión – Semana 5

**Fecha:** Sábado, 22 de agosto de 2026  
**Hora:** 13:00 h (Argentina)

---

# Objetivo de la reunión

Realizar el seguimiento final del estado del MVP, verificar la integración y funcionamiento de los componentes de la solución, revisar la consolidación del repositorio en `main`, dar seguimiento al cierre de la documentación y los entregables de No Country, y coordinar las actividades necesarias para la preparación del Video Demo.

---

# Seguimiento de acuerdos de la reunión anterior

| Acuerdo | Estado |
| --- | :---: |
| Completar los merges definitivos de Backend y Frontend a `main`. | ✅ Cumplido |
| Verificar la integración Backend ↔ Ciencia de Datos. | ✅ Cumplido |
| Verificar la integración Frontend ↔ Backend. | ✅ Cumplido |
| Consolidar la estructura definitiva del proyecto en `main`. | ✅ Cumplido |
| Continuar con las pruebas funcionales y de integración del MVP. | ✅ Cumplido |
| Continuar con el cierre de la documentación del proyecto. | 🟡 En cierre |
| Completar y revisar Herramientas_y_Tecnologias.md. | ✅ Cumplido |
| Revisar los enlaces públicos disponibles para los entregables. | 🟡 En seguimiento |
| Preparar el Video Demo de No Country. | 🟡 En preparación |
| Continuar la preparación para Demo Day. | 🟡 En seguimiento |

---

# Participantes

## Presentes

- Yanucelly Moreira – Project Manager.
- Lucía Evelyn Jantus – Data Scientist.
- Fernando Thiele – Data Scientist.
- Matías Bueno – Data Engineer.
- Juan Manuel Roldán – Backend Developer.
- Leandro Baque – Backend Developer.
- Magalí Aldana Suarez – Frontend Developer.
- Thiago Beber Feil – Full Stack Developer.
- Alan Joel Romero – Software Engineer.

---

# Temas tratados

## 1. Estado general y cierre técnico del MVP

Se realizó la revisión del estado general del MVP y de los componentes necesarios para completar el cierre técnico del proyecto.

El equipo confirmó el funcionamiento de las integraciones principales de la solución y se revisó el estado alcanzado por Frontend, Backend, Ciencia de Datos y OCI.

Se confirmó que las funcionalidades principales que forman parte del flujo final del MVP utilizan datos provenientes de la integración real de los componentes de la solución.

---

## 2. Integración final del MVP

Se revisó el funcionamiento del flujo integrado de la solución.

Se confirmó:

- La integración Backend ↔ Ciencia de Datos.
- La integración Frontend ↔ Backend.
- El funcionamiento de los servicios de análisis/modelos de Ciencia de Datos dentro del flujo principal.
- La integración de los componentes necesarios para el funcionamiento del MVP.
- El funcionamiento de la clasificación automática de gastos.
- La generación del perfil financiero.
- La generación de recomendaciones financieras.

La validación técnica principal del flujo integrado se encuentra completada.

Queda pendiente realizar los tres ejemplos de uso que serán utilizados para la demostración final del MVP.

---

## 3. Consolidación del repositorio

Se realizó el seguimiento de la consolidación definitiva del repositorio del proyecto.

Backend y Frontend realizaron los merges correspondientes hacia `main`, permitiendo avanzar con la consolidación de la versión final del proyecto.

Se revisó la necesidad de verificar que la estructura definitiva del repositorio conserve correctamente:

- Código de las distintas áreas.
- README correspondientes.
- Documentación técnica.
- Documentación general del proyecto.
- Archivos necesarios para la ejecución de la solución.

La documentación general continuará siendo incorporada y revisada en `main` como parte del cierre documental.

---

## 4. Pruebas y validación del MVP

Se revisó el estado de las pruebas funcionales y de integración realizadas sobre el flujo principal del MVP.

Se confirmó el funcionamiento de las integraciones necesarias para el flujo principal y se revisó la existencia de posibles incidencias críticas o bloqueantes.

No se informaron incidencias críticas o bloqueantes en el funcionamiento del MVP ejecutado en entorno local que impidan continuar con la preparación de la demostración final.

Queda pendiente ejecutar y validar un mínimo de tres ejemplos reales de uso del MVP utilizando diferentes datos para el usuario de demostración **Mateo**.

Estos ejemplos serán utilizados también para la preparación y grabación del Video Demo.

---

## 5. Oracle Cloud Infrastructure (OCI)

Se revisó el estado de la infraestructura utilizada por el proyecto.

El Backend se encuentra desplegado y operativo mediante **OCI Compute**, formando parte de la arquitectura implementada para la versión final del MVP.

También se mantiene el uso de los servicios de OCI definidos para la solución y documentados por el equipo.

---

## 6. Despliegue de la aplicación Web

Durante la jornada se realizaron ajustes y pruebas orientadas al despliegue público del Frontend de FinanceAI.

Se obtuvo una versión desplegada de la WebApp; sin embargo, durante las pruebas se detectó que las llamadas hacia las APIs no se encuentran funcionando correctamente desde el entorno desplegado.

El equipo confirmó que la aplicación funciona correctamente cuando se ejecuta en entorno local, permitiendo utilizar las funcionalidades necesarias para la demostración del MVP.

Debido al tiempo disponible para el cierre del Hackathon, se acordó avanzar con la preparación y grabación del Video Demo utilizando la WebApp ejecutada en entorno local.

La URL pública de la aplicación se mantiene disponible mientras se continúa revisando la configuración necesaria para la comunicación con las APIs desde el entorno desplegado.

**Estado al cierre de la jornada:**

- ✅ WebApp funcional en entorno local.
- ✅ Versión pública de la WebApp disponible.
- 🔄 Comunicación de la WebApp desplegada con las APIs pendiente de resolución/validación.
- ✅ Entorno local definido para las grabaciones del Video Demo.


---

## 7. Documentación del proyecto

Se revisó el estado del cierre documental.

El documento `Herramientas_y_Tecnologias.md` se encuentra finalizado, revisado y actualizado de acuerdo con las tecnologías utilizadas en la versión final del proyecto.

Continúa el cierre y revisión de:

- `README.md` principal.
- `Documentacion_Proyecto_Hackathon.md`.
- `Enlaces_Proyecto.md`.
- `Manual_Usuario.md`.
- Documentación técnica de las áreas.

Una vez finalizada la revisión, se realizará la consolidación definitiva de la documentación en `main` y se verificarán los enlaces directos a los archivos `.md`.

---

## 8. Enlaces del proyecto

Se revisó el estado del entregable **Enlaces del Proyecto** de No Country.

Actualmente se encuentran registrados en la plataforma:

- ✅ Repositorio GitHub.
- ✅ Figma.
- ✅ Notebook General de Ciencia de Datos.

El **Trello General** se encuentra en revisión final antes de dejarlo disponible públicamente e incorporarlo al entregable.

La API REST no será incorporada, ya que no cuenta con acceso público.
- ✅ URL pública de FinanceAI – Aplicación Web para escritorio (PC).

La URL pública de la aplicación Web fue incorporada al entregable de Enlaces del Proyecto. Al cierre de la jornada continúa en revisión la comunicación de la versión desplegada con las APIs.


Antes del cierre oficial se realizará la revisión final de accesibilidad de todos los enlaces registrados en No Country.

---

## 9. Actividad obligatoria – Feedback a compañeros

Se realizó el seguimiento de la actividad obligatoria de **Feedback a compañeros**, correspondiente a la Semana 5 en la plataforma de No Country.

Los integrantes del equipo confirmaron haber completado la actividad dentro del período establecido del **17/08 al 23/08/2026**.

**Estado:** ✅ Completado por el equipo.


## 10. Preparación del Video Demo

El guion general del Video Demo se encuentra preparado.

La demostración utilizará a **Mateo** como usuario representativo del MVP y mostrará el funcionamiento de FinanceAI mediante tres ejemplos con diferentes datos financieros.

Queda pendiente:

- Definir los datos definitivos de los tres ejemplos.
- Ejecutar y validar los tres casos.
- Preparar los recorridos de la aplicación.
- Realizar la grabación.
- Incorporar la narración correspondiente.
- Editar el material.
- Publicar el Video Demo en YouTube.
- Verificar el enlace.
- Registrar el enlace definitivo en No Country.

La grabación se realizará utilizando la WebApp ejecutada en entorno local, una vez completadas las verificaciones necesarias para los casos de demostración.

---

## 11. Preparación para Demo Day

La preparación específica del Pitch continuará una vez asegurados los entregables obligatorios y el Video Demo.

Se continuará trabajando posteriormente en:

- Hook de apertura.
- Organización definitiva del Pitch.
- Happy Path de la demostración.
- Material de apoyo.
- Participación del equipo.
- Ajuste de la presentación a aproximadamente 4:40 minutos.
- Ensayo general.
- Ajustes finales.

---

# Riesgos y puntos de seguimiento

Los principales puntos que requieren seguimiento para completar el cierre son:

- Resolución y validación de la comunicación de la WebApp desplegada con las APIs.
- Ejecución y validación de los tres ejemplos de uso del MVP.
- Cierre y consolidación definitiva de la documentación en `main`.
- Verificación de los enlaces públicos del proyecto.
- Preparación, grabación y publicación del Video Demo.
- Validación final de los entregables en No Country.

---

# Acuerdos alcanzados

- Mantener como versión de referencia del proyecto la versión consolidada en `main`.
- Completar la revisión final de la documentación antes de realizar su cierre definitivo.
- Verificar los archivos `.md` directamente desde `main` después de completar la consolidación documental.
- Obtener las URL públicas definitivas de los documentos requeridos para los entregables.
- Completar la revisión del Trello General antes de dejarlo disponible públicamente.
- Mantener registrada la URL pública de la WebApp en el entregable de Enlaces del Proyecto.
- Utilizar la WebApp ejecutada en entorno local para realizar las grabaciones necesarias del Video Demo.
- Continuar la revisión de la comunicación entre la WebApp desplegada y las APIs sin bloquear la preparación del Video Demo.
- Realizar los tres ejemplos de uso del MVP antes de completar su validación definitiva para presentación.
- Priorizar el cierre de los entregables obligatorios y posteriormente continuar con la preparación del Video Demo y Demo Day.

---

# Pendientes

- Continuar la revisión de la comunicación de la WebApp desplegada con las APIs.
- Realizar las grabaciones del flujo funcional del MVP utilizando la WebApp en entorno local.
- Ejecutar y validar los tres ejemplos de uso con Mateo.
- Completar la revisión final de la documentación general.
- Consolidar la documentación definitiva en `main`.
- Verificar las URL públicas de los archivos `.md`.
- Completar y verificar los enlaces del proyecto.
- Finalizar la revisión del Trello General para acceso público.
- Publicar el Video Demo en YouTube.
- Registrar y verificar los entregables definitivos en No Country.
- Continuar posteriormente con la preparación final del Pitch y Demo Day.

---

# Próxima reunión

**Fecha:** Lunes, 24 de agosto de 2026  
**Hora:** Pendiente de confirmación según encuesta del equipo.

**Objetivo principal:** realizar la preparación final para el **Demo Day del martes 25/08**, revisar el Pitch, organizar la demostración del MVP, definir la participación del equipo y realizar los ajustes necesarios antes de la presentación.

---

# Cierre

La reunión permitió avanzar en la validación del estado técnico del MVP, confirmar las integraciones principales de la solución y revisar la consolidación de Backend y Frontend en `main`.

El proyecto entra en su etapa final de cierre, concentrando las actividades restantes en la validación de los casos de demostración, la consolidación documental, la verificación de los enlaces públicos, la preparación del Video Demo y la carga definitiva de los entregables en No Country.

Al cierre de la jornada, la WebApp se encuentra funcional en entorno local y se dispone de una versión pública desplegada cuya comunicación con las APIs continúa en revisión. Para asegurar la preparación del Video Demo dentro de los tiempos del Hackathon, se acordó utilizar el entorno local para las grabaciones del flujo funcional del MVP.