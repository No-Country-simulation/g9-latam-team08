# Resumen de la Reunión – Semana 5

**Fecha:** Miércoles, 19 de agosto de 2026

---

# Objetivo de la reunión

Realizar el seguimiento del estado actual del MVP, definir las prioridades para el cierre del proyecto, revisar el avance de las integraciones y la continuidad de las pruebas funcionales y de integración, dar seguimiento a la documentación pendiente de Backend y Frontend, y coordinar las próximas actividades relacionadas con la preparación del Pitch y los entregables finales.
---

# Seguimiento de acuerdos de la reunión anterior

| Acuerdo | Estado |
| --- | :---: |
| Continuar priorizando la finalización funcional de Frontend. | 🟢 Avanzado |
| Mantener las recomendaciones como funcionalidad necesaria del MVP. | ✅ Cumplido |
| Confirmar el estado de las integraciones del MVP. | 🟢 Avanzado |
| Continuar con las pruebas funcionales y de integración del MVP. | 🔄 En progreso |
| Continuar completando la documentación de Backend. | 🔄 En progreso |
| Continuar avanzando con la documentación de Frontend. | 🔄 En progreso |
| Organizar la estructura final del repositorio antes de los merges definitivos a `main`. | 🔄 En progreso |
| Continuar preparando los entregables de No Country. | 🔄 En progreso |
| Avanzar en la preparación del Pitch para el Demo Day. | 🔄 En progreso |

---

# Temas tratados

## 1. Definición del alcance final del MVP

Se acordó **no continuar incorporando nuevas funcionalidades o mejoras** durante esta etapa del proyecto.

El equipo considera que las funcionalidades necesarias para cubrir el alcance del **MVP se encuentran implementadas o suficientemente avanzadas**, por lo que **entre hoy y mañana se priorizará**:

- Completar las integraciones pendientes.
- Realizar ajustes sobre las funcionalidades existentes.
- Continuar con las pruebas funcionales y de integración.
- Detectar y corregir incidencias.
- Completar los pendientes necesarios para cerrar el MVP.

Las nuevas funcionalidades o mejoras que no sean necesarias para el funcionamiento de la versión actual serán registradas como **Mejoras Futuras**, evitando ampliar el alcance durante la etapa de cierre.
---

## 2. Estado de Frontend

Se revisó el avance alcanzado por Frontend respecto de las funcionalidades que se encontraban pendientes.

Magalí informó que:

- **Recomendaciones se encuentra implementada.**
- **Notificaciones se encuentra implementada**, aunque se considera una funcionalidad adicional al alcance mínimo requerido para el MVP.

Se acordó que el foco ya no estará en continuar agregando nuevas funcionalidades, sino en completar las **integraciones, ajustes y pruebas necesarias sobre la versión que formará parte del MVP final**.

---

## 3. Integración y pruebas del MVP

Con el alcance funcional definido, el equipo concentrará el trabajo inmediato en las **pruebas de integración y ajustes finales**.

Se continuará trabajando entre hoy y mañana en las pruebas necesarias para validar el funcionamiento del MVP.

La prioridad será completar y probar las integraciones pendientes, especialmente aquellas correspondientes al flujo **Frontend ↔ Backend**, y posteriormente validar el comportamiento integral de la solución.

Las incidencias o bugs que aparezcan durante estas pruebas deberán ser corregidos antes de la validación final del MVP.

Se mantiene como prueba final la validación end-to-end del flujo:

**Frontend ↔ Backend ↔ Ciencia de Datos ↔ OCI**.

---
## 4. Documentación de Backend y Frontend

### Backend

Durante la reunión se conversó sobre la organización de los README correspondientes al área Backend.

La consulta se centró en identificar correctamente la función de los distintos README existentes y organizar la documentación de acuerdo con los componentes desarrollados.

Durante la reunión, Alan quedó encargado de crear un **README general para las APIs**, con el objetivo de centralizar el acceso a la documentación correspondiente a:

- API REST Spring Boot.
- API Python/Flask.

Posteriormente, Alan informó que el **README general de las APIs fue creado y añadido al repositorio**.

Posteriormente, Leandro aclaró la función del README existente en `feature/finance-ai-backend-dashboard`, confirmando que corresponde específicamente al **Backend Dashboard** y documenta su funcionamiento, configuración, endpoints e integración con Frontend y con el modelo entrenado.

La organización definitiva de estos README deberá quedar alineada con la estructura final de Backend antes de su integración definitiva a `main`.

---

### Frontend

Se revisaron los pendientes correspondientes a la documentación de Frontend.

Queda pendiente completar y validar `docs/Frontend.md` de acuerdo con la versión definitiva de la aplicación.

También se recordó la elaboración del `Manual_Usuario.md`, actividad que estará a cargo de **Alan Romero** y que deberá realizarse tomando como referencia las funcionalidades que formen parte de la versión final del MVP.

Respecto de los README de Frontend, queda pendiente definir su organización definitiva. En particular, deberá revisarse el README iniciado por Juan en la rama `juan`, que actualmente documenta funcionalidades relacionadas con autenticación e historial de transacciones, para determinar qué función cumplirá dentro de la documentación final del área.

Asimismo, deberá definirse cuál será el README principal de Frontend y consolidar la documentación necesaria antes de la integración definitiva a `main`.

---
## 5. Preparación del Pitch

Se conversó sobre la necesidad de comenzar a trabajar de manera concreta en la elaboración del **Pitch para el Demo Day**.

Como punto de partida se utilizará el **storytelling de Mateo elaborado por Lucía**.

**Lucía y Yanucelly** quedaron en preparar para mañana una **propuesta inicial del Pitch** basada en dicho storytelling.

La propuesta servirá como base para trabajar conjuntamente con el equipo y definir:

- Hook inicial.
- Problema.
- Propuesta de valor.
- Presentación de la solución.
- Demo / Happy Path.
- Arquitectura y elementos diferenciadores.
- Cierre.

La preparación del Pitch deberá mantenerse alineada con las funcionalidades que efectivamente formen parte de la versión final del MVP.

---

## 6. Próxima reunión de trabajo

Se acordó realizar una nueva reunión **mañana a las 11:00 h (Argentina)**.

El objetivo principal será **trabajar conjuntamente sobre la propuesta del Pitch**, revisar el material preparado y definir la estructura que utilizará el equipo para la presentación.

También se realizará seguimiento del avance de las pruebas e integraciones del MVP.

---

## 7. Consolidación de pendientes para finalizar el proyecto

Yanucelly quedó encargada de elaborar un **listado consolidado de todos los pendientes necesarios para finalizar el Proyecto del Hackathon**, con el objetivo de facilitar el seguimiento durante los últimos días del proyecto.

El listado contemplará principalmente:

- Backend.
- Frontend.
- Integración y pruebas de validación.
- Preparación de la Presentación Final / Pitch.
- Repositorio y consolidación a `main`.
- Documentación de Gestión del Proyecto.

### Entregables finales de No Country

1. 📄 **Documentación del proyecto** — `README.md`, `Documentacion_Proyecto_Hackathon.md` y documentación del directorio `docs/`.
2. 🎥 **Video Demo** — preparación, grabación, revisión, publicación e incorporación del enlace definitivo.
3. 🛠️ **Herramientas y tecnologías utilizadas** — `Herramientas_y_Tecnologias.md`.
4. 🔗 **Enlaces del proyecto** — `Enlaces_Proyecto.md`.

Este listado permitirá diferenciar claramente lo que puede resolverse inmediatamente de aquello que depende de finalizar las integraciones y pruebas.

---

# Acuerdos alcanzados

- No incorporar **nuevas funcionalidades o mejoras** durante la etapa de cierre.
- Concentrar el trabajo en el **MVP ya definido**, sus integraciones, ajustes y pruebas.
- Registrar como **Mejoras Futuras** las nuevas funcionalidades o ampliaciones que no formen parte del cierre actual.
- Considerar **Recomendaciones** como implementada dentro de las funcionalidades necesarias del MVP.
- Considerar **Notificaciones** como funcionalidad adicional ya implementada.
- Continuar entre hoy y mañana con las **pruebas e integraciones**.
- Corregir los bugs o incidencias que aparezcan durante las pruebas.
- Organizar la documentación de Backend y sus README de acuerdo con la estructura definitiva.
- Alan creó el **README general de las APIs**, según lo acordado durante la reunión.
- Lucía y Yanucelly prepararán una **propuesta de Pitch basada en el storytelling de Mateo**.
- Trabajar conjuntamente sobre el Pitch en la reunión de mañana.
- Yanucelly elaborará el **listado consolidado de pendientes para finalizar el proyecto**.
- Completar y validar `docs/Frontend.md` de acuerdo con la versión final de la aplicación.
- Alan elaborará el `Manual_Usuario.md`.
- Revisar el README iniciado por Juan en la rama `juan` y definir la organización definitiva de los README de Frontend.

---

# Pendientes

- Completar las integraciones necesarias **Frontend ↔ Backend**.
- Continuar con las pruebas funcionales y de integración.
- Realizar posteriormente las pruebas end-to-end del flujo completo.
- Registrar y corregir las incidencias detectadas.
- Completar los ajustes necesarios para cerrar el MVP.
- Organizar la estructura documental definitiva de Backend.
- Completar los documentos y entregables finales pendientes.
- Completar y revisar los enlaces definitivos del proyecto.
- Preparar el Video Demo.
- Preparar la propuesta inicial del Pitch.
- Definir conjuntamente el Pitch y el Happy Path.
- Continuar con la organización final del repositorio y los merges definitivos a `main`.
- Mantener actualizado el listado consolidado de pendientes hasta el cierre del proyecto.
- Completar y validar `docs/Frontend.md`.
- Elaborar el `Manual_Usuario.md`.
- Definir el README principal de Frontend y revisar la función del README iniciado por Juan en la rama `juan`.

---

# Próxima reunión

**Fecha:** Jueves, 20 de agosto de 2026  
**Hora:** 11:00 h (Argentina)

**Objetivo principal:** trabajar conjuntamente en la **definición del Pitch para el Demo Day**, tomando como base la propuesta preparada por Lucía y Yanucelly; **revisar y validar con el equipo el listado consolidado de pendientes para finalizar el proyecto**; y realizar seguimiento del avance de las pruebas e integraciones pendientes del MVP.

---

# Cierre

La reunión permitió definir un cambio claro de foco para la etapa final del proyecto: **no continuar ampliando funcionalidades y concentrar los esfuerzos en estabilizar, integrar, probar y cerrar el MVP existente**.

Durante los próximos días se priorizarán las integraciones y pruebas, la corrección de incidencias, el cierre documental, los entregables finales y la preparación del Pitch y Video Demo.