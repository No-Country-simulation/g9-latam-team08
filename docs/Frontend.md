# Frontend Consolidado

## Ramas inspeccionadas

- `feature/notifications-frontend`
- `origin/Juan`
- `origin/feature/dashboard`

## Rama consolidada

- Rama de trabajo final: `feature/frontend-consolidated`
- Base de creación: `feature/notifications-frontend`
- Recuperación selectiva de trabajo adicional desde `origin/Juan` y `origin/feature/dashboard`

No se documenta esta consolidación como merge completo de ramas, porque la integración fue selectiva y orientada a preservar frontend funcional sin alterar backend ni data science.

## Criterio utilizado durante la consolidación

- preservar trabajo existente antes que simplificar arquitectura;
- no eliminar features fuera del MVP visible;
- unificar layout y navegación privada;
- mantener rutas ocultas funcionando por compatibilidad;
- separar claramente frontend implementado, mocks y dependencias externas;
- mejorar performance del frontend mediante code splitting real;
- no inventar contratos backend ni data science.

## Arquitectura final

La arquitectura privada vigente del frontend consolidado es:

`ProtectedRoute` -> `DashboardLayout` -> `Sidebar + Topbar + MobileTabBar` -> `Outlet` -> página privada

Puntos clave:

- `ProtectedRoute` sigue siendo la barrera de acceso a rutas autenticadas.
- `src/features/dashboard/components/DashboardLayout.tsx` es el layout privado común activo.
- `Sidebar`, `Topbar` y `MobileTabBar` son la navegación visual privada vigente.
- `src/components/layout/Nav.tsx` se preserva como implementación previa del equipo, pero ya no es el layout usado por el router principal.

## Rutas finales

### Públicas

- `/`
- `/demo`
- `/login`
- `/register`

### Privadas

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

### Visibles en navegación principal del MVP

- Dashboard
- Nuevo Análisis
- Historial
- Soporte

### Preservadas fuera del MVP visible

- Metas
- Notificaciones

Estas features:

- no fueron eliminadas;
- siguen registradas en el router;
- permanecen disponibles por URL directa;
- quedaron ocultas de la navegación principal visible del MVP.

## Estado de integración

### Integrado / implementado frontend

- Landing pública
- Layout privado consolidado
- Dashboard visual
- Login
- Register
- Google Auth del lado cliente
- Historial
- Exportación PDF
- Metas
- Notificaciones
- Soporte

### Mock / local state

- Dashboard: `dashboardMock`
- Nuevo Análisis: `MockAnalysisGateway`
- Metas: estado local y mocks
- Notificaciones: estado local y mocks
- Soporte: modal local sin ticketing backend

### Integración backend presente en código, pendiente de validación end-to-end

- Login
- Register
- Google auth
- Historial:
  - `GET /api/transactions`
  - `PUT /api/transactions/:id`
  - `DELETE /api/transactions/:id`

## Dashboard

Ruta:

- `/dashboard`

Estado actual:

- UI implementada
- Integrada al layout privado común
- Sidebar, Topbar y MobileTabBar consolidados
- Cards y gráficos preservados
- Usa actualmente `dashboardMock`

Componentes principales:

- `DashboardLayout`
- `Sidebar`
- `Topbar`
- `MobileTabBar`
- `AlertsCard`
- `BarChart`
- `BrandMark`
- `CategoryBadge`
- `ConfidenceBar`
- `DonutChart`
- `ExpensesByCategoryCard`
- `KeyFactorsCard`
- `MonthlyEvolutionCard`
- `RecommendationsCard`
- `ScoreCard`
- `ScoreGauge`
- `StatCard`
- `StatsGrid`
- `TransactionsTable`
- `categoryColors`
- `dashboardMocks`
- `useTheme`

Conclusión:

- frontend visual: implementado;
- backend real: pendiente o no validado en esta rama.

## Nuevo Análisis

Ruta:

- `/analisis/nuevo`

Arquitectura conceptual:

UI -> hooks / flujo -> `AnalysisGateway` -> implementación concreta

Estado actual:

- wizard completo implementado;
- 3 pasos: datos financieros, transacciones, revisión;
- validaciones con React Hook Form + Zod;
- edición antes de confirmar;
- pantalla de procesamiento;
- resultados con tabs;
- persistencia temporal del draft en `localStorage`;
- implementación actual del gateway: `MockAnalysisGateway`.

Conclusión:

- UI completa: implementada;
- contrato backend/data definitivo: pendiente externo;
- no debe documentarse como análisis proveniente de backend real.

## Historial

Ruta:

- `/historial`

Funcionalidades actuales:

- listado de transacciones;
- búsqueda;
- filtros;
- resumen de ingresos y egresos;
- edición;
- eliminación;
- exportación PDF.

Requests presentes en el código:

- `GET /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

Detalles técnicos:

- usa JWT vía `Authorization: Bearer ...`;
- cuando backend no responde, muestra mensaje visible y usa fallback local;
- durante smoke test local previo, `http://localhost:8080` no estaba levantado y ocurrió `ERR_CONNECTION_REFUSED`;
- eso se clasifica como ausencia de backend disponible durante la prueba, no como error del router ni del code splitting.

Limitación vigente:

- `selectedPeriod` sigue existiendo, pero no participa realmente en el filtrado derivado.

## Exportación PDF

Archivo principal:

- `src/utils/exportUtils.ts`

Dependencias:

- `jspdf`
- `jspdf-autotable`

Estado actual:

- implementada;
- integrada en Historial;
- usa `dynamic import()` bajo demanda;
- evita cargar todo jsPDF en el bundle inicial de Historial.

## Metas

Ruta:

- `/metas`

Estado:

- frontend implementado;
- local state / mocks;
- fuera de la navegación visible principal del MVP;
- preservado y accesible por URL.

Funcionalidades preservadas:

- listado;
- crear;
- editar;
- aportes;
- completar;
- pausar;
- reactivar;
- eliminar;
- métricas;
- progreso;
- sugerencias;
- dialogs;
- action menus;
- responsive.

## Notificaciones

Ruta:

- `/notificaciones`

Estado:

- frontend implementado;
- local state / mocks;
- fuera de la navegación visible principal del MVP;
- preservado y accesible por URL.

Funcionalidades preservadas:

- Todas;
- No leídas;
- Alertas;
- Recordatorios;
- Sugerencias;
- marcar leída/no leída;
- marcar todas;
- eliminar;
- preferencias;
- resumen;
- empty states;
- responsive.

No existe evidencia en el código actual de:

- persistencia backend;
- WebSockets;
- polling;
- servicio real de notificaciones.

## Soporte

Ruta:

- `/soporte`

Estado actual:

- presentación del equipo;
- perfiles;
- filtros;
- datos de contacto visuales;
- links visuales;
- modal de contacto.

Archivos incorporados durante la consolidación:

- `src/components/soporte/ModalContacto.tsx`
- `src/components/soporte/ModalContacto.css`

No existe ticketing backend documentable como implementación real.

## Code splitting

Actualmente se implementó route-level code splitting mediante:

- `React.lazy()`
- `dynamic import()`
- `Suspense`

Páginas convertidas a lazy:

- `LandingPage`
- `Login`
- `Register`
- `DashboardPage`
- `NewAnalysisPage`
- `Historial`
- `GoalsPage`
- `NotificationsPage`
- `Soporte`

Fallback visual de carga:

- `src/components/layout/RouteContentFallback.tsx`
- `src/components/layout/RouteContentFallback.css`

## Resultado de optimización

Antes de la optimización:

- chunk JS principal: `~1046.69 kB`
- gzip: `~325.53 kB`

Después del code splitting:

- chunk JS principal: `~305.46 kB`
- gzip: `~99.41 kB`

Reducción aproximada:

- `~70.8 %`

Resultado adicional:

- el warning `Some chunks are larger than 500 kB after minification` desapareció;
- no se usó `manualChunks`;
- no se aumentó `chunkSizeWarningLimit`.

## Variables de entorno

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

## Stack

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- React Hook Form
- Zod
- Radix UI Dialog
- Lucide React
- React Icons
- Google OAuth
- jsPDF
- jsPDF AutoTable
- pnpm

Infraestructura cliente adicional presente:

- Gemini (`@google/generative-ai`), hoy no conectada al flujo principal consolidado.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Estado funcional resumido

| Feature | Frontend | Backend/API | Estado |
| --- | --- | --- | --- |
| Landing | Implementado | No requerido | Disponible |
| Login | Implementado | Integración presente | Requiere backend disponible |
| Registro | Implementado | Integración presente | Requiere backend disponible |
| Google Auth | Implementado | Integración presente | Requiere configuración |
| Dashboard | Implementado | Mock | Disponible con datos simulados |
| Nuevo Análisis | Implementado | `MockAnalysisGateway` | Disponible con datos simulados |
| Historial | Implementado | Requests reales | Requiere backend disponible |
| PDF | Implementado | No requerido | Disponible |
| Metas | Implementado | Local/mock | Preservado por URL |
| Notificaciones | Implementado | Local/mock | Preservado por URL |
| Soporte | Implementado | Local | Disponible |

## Blockers externos

Dashboard:

- endpoint real;
- contrato;
- validación end-to-end.

Nuevo Análisis:

- endpoint backend;
- contrato request/response;
- integración backend/data;
- validación end-to-end.

Historial:

- backend activo;
- URL definitiva según entorno;
- JWT válido en entorno real;
- validación end-to-end.

## Pendientes Frontend

- smoke test desktop/mobile completo;
- pruebas E2E;
- pruebas de integración frontend;
- validación PDF real en navegador;
- mejoras de accesibilidad;
- revisar el filtro de período del Historial;
- optimización futura de logos y assets pesados.

## Build

Último build comprobado:

- `pnpm build`
- resultado: success
- fecha: `20 de agosto de 2026`
- duración aproximada: `6.67 s`
- warning `>500 kB`: no presente
