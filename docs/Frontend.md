# Frontend Consolidado

## Ramas inspeccionadas

- `feature/notifications-frontend`
- `origin/Juan`
- `origin/feature/dashboard`

## Arquitectura final

- Base de trabajo: `feature/notifications-frontend`
- Layout privado común: `src/features/dashboard/components/DashboardLayout.tsx`
- Router privado unificado con `ProtectedRoute` + `Outlet`
- Sidebar visual tomado de `feature/dashboard`, adaptado a las rutas canónicas del proyecto
- `Nav.tsx` preservado como código previo del equipo, sin uso en el router actual

## Rutas finales

- `/`
- `/login`
- `/register`
- `/dashboard`
- `/analisis/nuevo`
- `/historial`
- `/metas`
- `/notificaciones`
- `/soporte`

## Redirects de compatibilidad

- `/dashboard/historial` -> `/historial`
- `/dashboard/metas` -> `/metas`
- `/dashboard/notificaciones` -> `/notificaciones`
- `/dashboard/soporte` -> `/soporte`

## Features visibles y preservadas

### Visibles en navegación principal

- Dashboard
- Nuevo Análisis
- Historial
- Metas
- Notificaciones
- Soporte

### Preservadas aunque no dependan de backend final

- Modal de contacto de Soporte
- Exportación PDF de Historial
- Wizard completo de Nuevo Análisis
- Metas
- Notificaciones

## Estado de integración

### Backend real

- Login
- Register
- Google auth
- Historial de transacciones: listado, edición y eliminación

### Mock o estado local

- Dashboard: `dashboardMock`
- Nuevo Análisis: `MockAnalysisGateway`
- Metas: estado local
- Notificaciones: estado local
- Soporte: modal local

## Variables de entorno

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

## Comandos

```bash
pnpm install
pnpm build
```

## Blockers externos

- No existe integración real publicada para Dashboard en este frontend.
- Nuevo Análisis sigue dependiendo de mock porque no hay contrato/backend definitivo integrado en esta rama.
- Metas y Notificaciones no tienen persistencia backend.

## Validación

- `pnpm build` ejecutado con éxito el 20 de agosto de 2026.
- Advertencia actual de build:
  - el bundle principal supera 500 kB minificado.
