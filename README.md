# g9-latam-team08

Proyecto de No Country enfocado en desarrollar una herramienta de gestión de finanzas para usuarios.

## Frontend

El frontend consolidado vive en [frontend](./frontend) y reúne, en su estado actual:

- landing pública;
- autenticación;
- dashboard privado;
- nuevo análisis;
- historial;
- soporte;
- Metas y Notificaciones preservadas aunque fuera de la navegación visible principal del MVP.

La documentación recomendada para entender el estado actual del frontend es:

- [frontend/README.md](./frontend/README.md): documento principal y detallado de implementación frontend.
- [docs/Frontend.md](./docs/Frontend.md): documento de consolidación, arquitectura final y estado técnico resumido.

## Nota de alcance

La consolidación frontend se hizo preservando funcionalidades existentes y evitando eliminar features fuera del MVP visible. Por eso:

- el MVP visible prioriza Dashboard, Nuevo Análisis, Historial y Soporte;
- Metas y Notificaciones siguen implementadas y accesibles por URL;
- la documentación específica del frontend distingue explícitamente qué usa mocks, qué tiene integración cliente en código y qué requiere validación end-to-end con otros equipos.
