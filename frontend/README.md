# FinanceAI Frontend

Aplicación frontend de FinanceAI construida con React, TypeScript y Vite. El frontend consolidado reúne la landing pública, autenticación, dashboard privado, historial financiero, el flujo de Nuevo Análisis, la gestión de Metas, el centro de Notificaciones y la pantalla de Soporte del equipo.

El estado actual del proyecto es mixto y debe leerse con cuidado: varias vistas están completamente implementadas desde el lado frontend, pero no todas consumen contratos backend reales verificados end-to-end. En particular, Dashboard usa `dashboardMock`, Nuevo Análisis sigue funcionando mediante `MockAnalysisGateway`, y Metas / Notificaciones continúan resolviéndose con mocks o estado local.

## Stack tecnológico

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- React Hook Form + Zod
- Radix UI Dialog
- Lucide React
- React Icons
- Google OAuth para login social
- jsPDF para exportación PDF
- jsPDF AutoTable para tablas en PDF
- Integración cliente para Gemini disponible en `src/api` (presente en el repositorio, no conectada al flujo principal actual)

## Requisitos

- Node.js instalado
- pnpm instalado

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
pnpm dev
```

La aplicación se levanta por defecto en `http://localhost:5173`.

## Scripts

- `pnpm dev`: inicia el entorno local con Vite.
- `pnpm build`: ejecuta el chequeo de TypeScript y genera el build de producción.
- `pnpm preview`: sirve localmente el build generado.

## Estructura principal

```text
frontend/
├── src/
│   ├── api/                          # Clientes e infraestructura para endpoints/IA
│   ├── app/router/                   # Router principal de la aplicación
│   ├── components/
│   │   ├── historial/                # Componentes del historial financiero
│   │   ├── layout/                   # AuthLayout, Nav legado, RouteContentFallback, header/footer
│   │   ├── soporte/                  # ModalContacto
│   │   └── ui/                       # Button, Card, Container, SectionHeader, etc.
│   ├── features/
│   │   ├── analysis/                 # Wizard, validaciones, draft, resultado, gateway
│   │   ├── dashboard/                # Layout privado, sidebar, topbar, widgets, charts y mocks
│   │   ├── goals/                    # Metas, dialogs, métricas, sugerencias
│   │   ├── landing/                  # Componentes de la landing pública
│   │   └── notifications/            # Notificaciones, preferencias, resumen
│   ├── hooks/                        # Hooks compartidos (ej. auth Google)
│   ├── pages/                        # Páginas/rutas
│   ├── styles/                       # Tokens y estilos globales
│   ├── types/                        # Tipos compartidos fuera de features
│   └── utils/                        # ProtectedRoute, exportUtils y utilidades compartidas
├── .env.example
├── package.json
└── README.md
```

## Arquitectura de rutas y layout privado

La aplicación utiliza un router único en `src/app/router/index.tsx` con separación entre rutas públicas, privadas y redirects de compatibilidad.

La jerarquía privada consolidada actual es:

`ProtectedRoute` -> `DashboardLayout` -> `Outlet` -> página privada

Eso implica:

- `ProtectedRoute` valida autenticación con `localStorage` (`userId`).
- `DashboardLayout` es el layout privado común vigente.
- `Sidebar`, `Topbar` y `MobileTabBar` del dashboard son ahora la navegación visual principal del área autenticada.
- `src/components/layout/Nav.tsx` se preservó como implementación previa del equipo, pero ya no es el layout utilizado por el router actual.

## Rutas implementadas

### Públicas

- `/`: landing pública con propuesta del producto, demo visual y CTA al análisis.
- `/demo`: reutiliza la landing y hace scroll al preview. Sigue registrada.
- `/login`: inicio de sesión con formulario y opción Google.
- `/register`: registro con formulario y opción Google.

### Privadas

- `/dashboard`: dashboard privado consolidado.
- `/analisis/nuevo`: flujo completo de Nuevo Análisis.
- `/historial`: historial financiero con filtros, resumen, tabla, edición, eliminación y exportación PDF.
- `/metas`: gestión de metas financieras.
- `/notificaciones`: centro de notificaciones con filtros, preferencias y resumen.
- `/soporte`: página informativa del equipo y canal de contacto.

### Redirects de compatibilidad

- `/dashboard/historial` -> `/historial`
- `/dashboard/metas` -> `/metas`
- `/dashboard/notificaciones` -> `/notificaciones`
- `/dashboard/soporte` -> `/soporte`

### Decisión de navegación MVP

La navegación visible actual del MVP prioriza:

- Dashboard
- Nuevo Análisis
- Historial
- Soporte

Metas y Notificaciones:

- siguen completamente implementadas;
- no fueron eliminadas;
- están ocultas de la navegación principal del MVP;
- siguen accesibles directamente por URL en `/metas` y `/notificaciones`.

Esta decisión busca simplificar el foco del MVP sin perder trabajo previo del equipo ni romper compatibilidad de rutas existentes.

## Code splitting y carga diferida

El frontend consolidado aplica route-level code splitting usando:

- `React.lazy()`
- `dynamic import()`
- `Suspense`

Las páginas principales se cargan de forma lazy desde el router y se muestran mediante `RouteContentFallback` mientras llega cada chunk.

Esto redujo aproximadamente el chunk JavaScript principal desde:

- `~1046.69 kB`

a:

- `~305.46 kB`

y eliminó el warning de Vite sobre chunks mayores a `500 kB`.

La mejora se obtuvo mediante separación real por ruta; no se aumentó artificialmente `chunkSizeWarningLimit`, ni se usó `manualChunks` como parche.

## Fallback visual de rutas lazy

`src/components/layout/RouteContentFallback.tsx` es el fallback visual usado mientras se cargan páginas lazy.

Se utiliza en tres niveles:

- `App.tsx` para la navegación general.
- `AuthLayout.tsx` para login y register.
- `DashboardLayout.tsx` para el área privada.

El fallback es deliberadamente simple para evitar layout shift severo y no agregar dependencias nuevas.

## Funcionalidades por feature

### Landing y navegación

`Implementado frontend`

- Landing pública con hero, bloques de funcionalidades, pasos y CTA.
- Demo visual basada en `DashboardPreviewSkeleton`.
- Navegación pública mediante header/footer.
- Accesos directos al flujo de análisis.

`Implementado en arquitectura consolidada`

- El área privada ahora usa `DashboardLayout` como layout común.
- El sidebar visual consolidado proviene del trabajo de `feature/dashboard`.
- El `MobileTabBar` acompaña la navegación autenticada en mobile.

### Dashboard

`Implementado frontend`

- Ruta privada `/dashboard` ya implementada.
- Vista visual consolidada desde `feature/dashboard`.
- Layout privado común con:
  - `DashboardLayout`
  - `Sidebar`
  - `Topbar`
  - `MobileTabBar`
- Componentes visuales principales:
  - cards de score y métricas
  - gráficos
  - tabla de transacciones
  - alertas
  - factores clave
  - recomendaciones

`Implementado con mock/estado local`

- La vista usa actualmente `dashboardMock`.
- Los datos del dashboard no deben interpretarse como provenientes de una API real validada.
- La navegación, estructura visual y composición de widgets sí están consolidadas y operativas desde el lado frontend.

`Componentes clave del dashboard`

- `src/features/dashboard/components/DashboardLayout.tsx`
- `src/features/dashboard/components/Sidebar.tsx`
- `src/features/dashboard/components/Topbar.tsx`
- `src/features/dashboard/components/MobileTabBar.tsx`
- `src/features/dashboard/components/dashboardMocks.ts`

### Autenticación

`Implementado con integración backend`

- Login por email/contraseña contra `POST /api/auth/login`.
- Registro contra `POST /api/auth/register`.
- Inicio de sesión con Google contra `POST /api/auth/google`.
- Persistencia de sesión en `localStorage`:
  - `userId`
  - `jwt_token`
  - `userName`
  - `userEmail`
  - `userPhoto`

Observaciones:

- El frontend ya usa `VITE_GOOGLE_CLIENT_ID` y ahora debe documentarse explícitamente en `.env.example`.
- La autenticación protege el acceso al área privada mediante `ProtectedRoute`.

### Historial financiero

`Implementado frontend con integración backend parcial`

- Listado inicial desde `GET /api/transactions`.
- Autenticación JWT mediante header `Authorization: Bearer <token>`.
- Filtros por búsqueda, categoría, tipo y cuenta.
- Resumen de ingresos/egresos filtrados.
- Edición vía `PUT /api/transactions/:id`.
- Eliminación vía `DELETE /api/transactions/:id`.
- Exportación PDF desde la propia vista.

`Fallback local/mock`

- Si el backend no responde, la pantalla muestra un mensaje visible de error y carga datos de prueba en memoria.
- Durante smoke test local del frontend consolidado, el backend en `http://localhost:8080` no estaba levantado y se obtuvo `ERR_CONNECTION_REFUSED`.
- Eso debe tratarse como pendiente de integración backend, no como un error del router o de la consolidación del frontend.

`Exportación PDF`

- La exportación vive en `src/utils/exportUtils.ts`.
- Utiliza `jspdf` y `jspdf-autotable`.
- Las dependencias de PDF se cargan mediante `dynamic import()` únicamente cuando el usuario solicita exportar, para no inflar la carga inicial del bundle.

Limitaciones detectadas:

- El filtro de período existe en UI, pero no impacta actualmente en el filtrado derivado.
- La integración backend de Historial existe a nivel de código, pero requiere backend disponible para validación end-to-end real.

### Nuevo Análisis

`Implementado frontend`

- Wizard de 3 pasos:
  - datos financieros,
  - transacciones,
  - revisión.
- Validaciones con React Hook Form + Zod.
- Edición desde revisión.
- Pantalla de procesamiento.
- Vista de resultados con tabs:
  - Resumen,
  - Gastos,
  - Recomendaciones.
- Diseño responsive y pulido visual del flujo/resultados.

`Implementado con mock/estado local`

- El análisis usa `AnalysisGateway` como abstracción.
- La implementación conectada hoy en el wizard es `MockAnalysisGateway`.
- El resultado final se construye desde `buildMockAnalysisResult(...)`.
- No existe todavía contrato backend/data science definitivo integrado en esta rama.

`Persistencia temporal del borrador`

- El draft del análisis se guarda en `localStorage` por usuario usando `financeai:new-analysis-draft:{userId}`.
- El autosave se hace desde `useAnalysisDraftPersistence`.

`Pendiente de integración`

- Endpoint real de análisis backend/data science.
- Contrato definitivo del payload/respuesta del análisis.

### Metas

`Implementado frontend`

- Listado de metas.
- Creación y edición.
- Registro de aportes.
- Completar meta.
- Pausar y reactivar.
- Eliminar.
- Métricas de progreso.
- Distribución de ahorro.
- Sugerencias y estados vacíos.
- Dialogs y action menu completos.
- Responsive desktop/mobile.

`Implementado con mock/estado local`

- El estado vive en `GoalsPage` con `useState`.
- La data inicial proviene de `features/goals/mocks/goals.ts`.
- No hay persistencia backend ni sincronización remota.

`Estado dentro del MVP`

- La feature se preserva por completo.
- Sigue accesible directamente en `/metas`.
- Actualmente está oculta de la navegación visible principal del MVP.

### Notificaciones

`Implementado frontend`

- Filtros por:
  - Todas,
  - No leídas,
  - Alertas,
  - Recordatorios,
  - Sugerencias.
- Contadores derivados dinámicamente.
- Marcar como leída/no leída.
- Marcar todas como leídas.
- Eliminar notificación.
- Preferencias locales con toggles.
- Resumen mensual visual.
- Empty states.
- Responsive y menú de acciones accesible.

`Implementado con mock/estado local`

- La página usa `useState` como única fuente de verdad.
- Las notificaciones salen de `features/notifications/mocks/notifications.ts`.
- Las preferencias no tienen persistencia backend.
- No existe generación real de notificaciones desde backend, websockets o polling.

`Estado dentro del MVP`

- La feature se preserva por completo.
- Sigue accesible directamente en `/notificaciones`.
- Actualmente está oculta de la navegación visible principal del MVP.

### Soporte

`Implementado frontend`

- Página visual del equipo del proyecto.
- Filtro por perfil (`Todos`, `Backend`, `Frontend`, `Data`).
- Tarjetas del equipo.
- CTA visual de contacto.
- `ModalContacto` disponible desde la pantalla.

Observación:

- Hoy es una pantalla informativa con modal local.
- No existe ticketing, backend real de soporte ni integración operativa confirmada.

## Estado de integración

### Integrado / implementado frontend

- Landing pública.
- Layout privado consolidado.
- Dashboard visual en `/dashboard`.
- Login por email/contraseña.
- Registro.
- Login con Google validado por backend.
- Historial:
  - listado,
  - edición,
  - eliminación,
  - exportación PDF.
- Wizard visual completo de Nuevo Análisis.
- Metas.
- Notificaciones.
- Soporte con modal de contacto.

### Mock / local state

- Dashboard: `dashboardMock`.
- Nuevo Análisis: `MockAnalysisGateway`.
- Metas: estado local + mocks.
- Notificaciones: estado local + mocks.
- Soporte: modal local sin backend.

### Pendiente de otros equipos / integración externa

- Backend real para Dashboard.
- Contrato backend/data science definitivo para Nuevo Análisis.
- Validación end-to-end real de Historial con backend disponible.
- Cualquier contrato adicional que dependa de Backend o Data Science.

## Infraestructura API presente en el frontend

### Infraestructura ya presente

- `src/api/env.ts`: centraliza variables de entorno del frontend.
- `src/api/index.ts`: helpers de acceso a servicios cliente.
- `src/api/indicators.ts`: cliente para `GET /api/indicadores/:userId` con fallback mock.
- `src/api/recommendations.ts`: cliente para Gemini usando `VITE_GEMINI_API_KEY`.
- `src/api/types.ts`: tipos compartidos para capa API.

### Nota importante

La infraestructura API existe en el repositorio, pero no toda está conectada al flujo principal actual.

En particular:

- Dashboard no está consumiendo API real.
- Nuevo Análisis no usa contrato backend/data definitivo en esta rama.
- Historial sí contiene código de integración backend, pero requiere backend disponible para validación real.

## Variables de entorno

Documentadas actualmente en `frontend/.env.example`:

- `VITE_API_BASE_URL=http://localhost:8080`
- `VITE_GEMINI_API_KEY=tu_api_key_de_gemini`
- `VITE_GOOGLE_CLIENT_ID=tu_google_client_id`

Notas:

- Usar sólo valores de ejemplo.
- No hardcodear secretos reales en el repositorio.

## Pendientes técnicos comprobables

### Pendientes frontend

- Completar smoke test manual del frontend consolidado con entorno local estable.
- Agregar pruebas E2E o de integración frontend cuando el alcance del proyecto lo justifique.
- Evaluar mejoras futuras de performance sobre assets pesados como `logo-light.png` y `logo-dark.png`.

### Pendientes de integración externa

- Integrar Dashboard con backend real cuando exista contrato publicado.
- Integrar Nuevo Análisis con backend/data science reemplazando `MockAnalysisGateway`.
- Definir y aplicar el contrato definitivo del endpoint de análisis.
- Validar Historial end-to-end con backend operativo en `localhost:8080` o el entorno que corresponda.

## Notas técnicas relevantes

- El dashboard consolidado usa el layout privado común y reemplaza al `Nav.tsx` como layout efectivo del router.
- Las rutas legacy bajo `/dashboard/...` se preservan mediante redirects para evitar regresiones.
- Metas y Notificaciones están fuera del foco visible del MVP, pero no se eliminaron.
- La carga diferida de páginas y la carga bajo demanda de librerías PDF forman parte de la arquitectura actual de performance del frontend.
