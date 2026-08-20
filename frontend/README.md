# FinanceAI Frontend

Aplicación frontend de FinanceAI construida con React, TypeScript y Vite. El frontend consolidado reúne la landing pública, autenticación, dashboard privado, historial financiero, el flujo de Nuevo Análisis, la gestión de Metas, el centro de Notificaciones y la pantalla de Soporte del equipo.

El objetivo del frontend es ayudar a que una persona pueda cargar información, revisar su situación financiera, explorar un dashboard visual, registrar movimientos, ejecutar un análisis guiado y acceder a features preservadas aunque no todas formen parte del MVP visible.

El estado actual del proyecto es mixto y debe interpretarse con precisión:

- varias vistas están completamente implementadas desde el lado frontend;
- no todas consumen backend real validado end-to-end;
- Dashboard usa `dashboardMock`;
- Nuevo Análisis sigue funcionando mediante `MockAnalysisGateway`;
- Metas y Notificaciones siguen en mocks o estado local;
- Historial sí tiene código cliente contra backend, pero requiere backend disponible para validación real.

## Stack tecnológico

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- React Hook Form
- Zod
- Radix UI Dialog
- Lucide React
- React Icons
- Google OAuth para login social
- jsPDF
- jsPDF AutoTable
- pnpm

Infraestructura cliente adicional presente:

- `@google/generative-ai`

Nota:

- La integración cliente con Gemini sigue existiendo en `src/api`, pero no participa del flujo principal consolidado actual.

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
│   │   ├── dashboard/                # Layout privado, navegación, widgets, charts y mocks
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

## Objetivo de la consolidación frontend

La rama `feature/frontend-consolidated` se construyó para reunir el trabajo frontend existente sin eliminar funcionalidades previas del equipo.

La consolidación tomó como base:

- `feature/notifications-frontend`

y recuperó selectivamente trabajo de:

- `origin/Juan`
- `origin/feature/dashboard`

Esto no debe documentarse como merge completo de ramas, sino como integración selectiva orientada a:

- preservar trabajo existente;
- no eliminar features fuera del MVP visible;
- unificar layout y navegación;
- conservar funcionalidades accesibles por URL aunque no todas aparezcan en la navegación principal;
- mejorar performance mediante code splitting real.

## Arquitectura de rutas y layout privado

La aplicación usa un router único en `src/app/router/index.tsx`.

La arquitectura privada vigente es:

`ProtectedRoute` -> `DashboardLayout` -> `Sidebar + Topbar + MobileTabBar` -> `Outlet` -> página privada

### Qué significa hoy esa arquitectura

- `ProtectedRoute` protege el acceso autenticado usando `localStorage` (`userId`).
- `DashboardLayout` es el layout privado común vigente.
- `Sidebar`, `Topbar` y `MobileTabBar` componen la navegación visual activa del área privada.
- `Outlet` renderiza la página privada correspondiente a cada ruta.

### Layout privado actual

Archivo principal:

- `src/features/dashboard/components/DashboardLayout.tsx`

Comportamiento:

- lee datos básicos del usuario desde `localStorage`;
- aplica `useTheme`;
- monta `Sidebar`, `Topbar`, `MobileTabBar`;
- usa `Suspense` con `RouteContentFallback` para cargar páginas privadas lazy.

### Estado de `Nav.tsx`

Archivo:

- `src/components/layout/Nav.tsx`

Situación actual:

- se preservó como implementación previa del equipo;
- ya no es el layout utilizado por el router principal;
- sigue siendo referencia histórica útil para entender el estado anterior de la navegación privada.

## Rutas implementadas

### Públicas

- `/`: landing pública con propuesta del producto, demo visual y CTA al análisis.
- `/demo`: reutiliza la landing y hace scroll al preview. Sigue registrada actualmente.
- `/login`: inicio de sesión con formulario y opción Google.
- `/register`: registro con formulario y opción Google.

### Privadas

- `/dashboard`: dashboard privado consolidado.
- `/analisis/nuevo`: flujo completo de Nuevo Análisis.
- `/historial`: historial financiero con filtros, resumen, tabla, edición, eliminación y exportación PDF.
- `/metas`: gestión de metas financieras.
- `/notificaciones`: centro de notificaciones con filtros, preferencias y resumen.
- `/soporte`: pantalla del equipo y contacto.

### Redirects de compatibilidad

- `/dashboard/historial` -> `/historial`
- `/dashboard/metas` -> `/metas`
- `/dashboard/notificaciones` -> `/notificaciones`
- `/dashboard/soporte` -> `/soporte`

### Rutas no documentadas como disponibles

- `/configuraciones` no debe considerarse ruta real disponible, porque no existe una página implementada y registrada en el router actual.

## Navegación visible del MVP

La navegación principal visible actual del MVP contiene:

- Dashboard
- Nuevo Análisis
- Historial
- Soporte

### Features preservadas fuera del MVP visible

Metas y Notificaciones:

- no fueron eliminadas;
- siguen implementadas;
- siguen registradas en el router;
- siguen accesibles directamente mediante URL;
- están ocultas de la navegación principal visible del MVP.

Rutas directas preservadas:

- `/metas`
- `/notificaciones`

Regla arquitectónica importante:

**Fuera del MVP visible no significa eliminado.**

## Code splitting y carga diferida

El frontend consolidado aplica route-level code splitting mediante:

- `React.lazy()`
- `dynamic import()`
- `Suspense`

### Páginas convertidas a lazy

- `LandingPage`
- `Login`
- `Register`
- `DashboardPage`
- `NewAnalysisPage`
- `Historial`
- `GoalsPage`
- `NotificationsPage`
- `Soporte`

### Fallback visual de rutas lazy

Archivos:

- `src/components/layout/RouteContentFallback.tsx`
- `src/components/layout/RouteContentFallback.css`

Uso:

- `App.tsx`
- `AuthLayout.tsx`
- `DashboardLayout.tsx`

Función:

- mostrar una transición visual simple mientras cada página lazy se descarga;
- evitar pantallas en blanco innecesarias;
- hacerlo sin introducir un segundo layout ni dependencias extras.

### Resultado de la optimización

Antes del code splitting:

- chunk JS principal: `~1046.69 kB`
- gzip: `~325.53 kB`

Después:

- chunk JS principal: `~305.46 kB`
- gzip: `~99.41 kB`

Reducción aproximada:

- `~70.8 %`

Resultado adicional:

- el warning de Vite `Some chunks are larger than 500 kB after minification` ya no aparece;
- la mejora vino de code splitting real;
- no se usó `manualChunks`;
- no se aumentó `chunkSizeWarningLimit`.

## Funcionalidades por feature

### Landing y navegación pública

`Implementado frontend`

- landing pública con hero, bloques de funcionalidades, pasos y CTA;
- demo visual basada en `DashboardPreviewSkeleton`;
- navegación pública mediante header y footer;
- CTA hacia login, registro y análisis.

`Notas técnicas`

- la landing sigue registrada en `/` y `/demo`;
- ahora también participa del esquema de páginas lazy del router.

### Dashboard

Ruta:

- `/dashboard`

`Implementado frontend`

- UI implementada;
- integrada al layout privado común;
- navegación consolidada con `Sidebar`, `Topbar` y `MobileTabBar`;
- cards, widgets, tabla y gráficos preservados.

`Componentes principales`

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

`Mock / estado actual`

- actualmente usa `dashboardMock`;
- no debe documentarse como dashboard conectado a API real;
- el frontend visual está implementado, pero la integración backend real sigue pendiente o no validada.

### Autenticación

`Implementado con integración backend en código`

- login por email/contraseña contra `POST /api/auth/login`;
- registro contra `POST /api/auth/register`;
- inicio de sesión con Google contra `POST /api/auth/google`;
- persistencia de sesión en `localStorage`:
  - `userId`
  - `jwt_token`
  - `userName`
  - `userEmail`
  - `userPhoto`

`Notas importantes`

- el frontend ya usa `VITE_GOOGLE_CLIENT_ID`;
- la disponibilidad real del login/register/google auth depende de backend y configuración vigentes en el entorno;
- debe evitarse afirmar validación end-to-end si el servicio no estuvo disponible durante la prueba.

### Historial financiero

Ruta:

- `/historial`

`Implementado frontend con integración backend parcial`

- listado inicial desde `GET /api/transactions`;
- autenticación JWT mediante `Authorization: Bearer <token>`;
- búsqueda;
- filtros por categoría, tipo y cuenta;
- resumen de ingresos y egresos;
- edición vía `PUT /api/transactions/:id`;
- eliminación vía `DELETE /api/transactions/:id`;
- exportación PDF.

`Fallback local / demostración`

- si el backend no responde, la pantalla muestra un mensaje visible y carga datos locales de demostración;
- ese fallback no debe interpretarse como respuesta real del backend.

`Estado de validación`

- el frontend sí ejecuta requests reales desde el código;
- durante smoke test local previo, el backend no estaba levantado en `http://localhost:8080`;
- el error observado fue `ERR_CONNECTION_REFUSED`;
- esto se clasifica como backend no disponible durante la prueba, no como error del router ni del code splitting.

`Limitaciones detectadas`

- el filtro de período sigue existiendo en la UI;
- `selectedPeriod` todavía no participa realmente del filtrado derivado.

### Exportación PDF

Archivo principal:

- `src/utils/exportUtils.ts`

Dependencias:

- `jspdf`
- `jspdf-autotable`

`Implementado frontend`

- la exportación PDF fue incorporada durante la consolidación;
- las dependencias de PDF se cargan mediante `dynamic import()` sólo cuando el usuario solicita exportar;
- Historial deja de cargar inicialmente todo jsPDF;
- eso reduce significativamente el peso del chunk de Historial.

`Métricas aproximadas útiles`

- Historial quedó en aproximadamente `9.83 kB` (`gzip ~3.71 kB`) en su chunk principal;
- jsPDF quedó separado en chunks on-demand:
  - `jspdf ~386 kB`
  - `jspdf-autotable ~31 kB`

### Nuevo Análisis

Ruta:

- `/analisis/nuevo`

`Implementado frontend`

- wizard de 3 pasos:
  1. datos financieros;
  2. transacciones;
  3. revisión / confirmación.
- validaciones con React Hook Form + Zod;
- edición antes de confirmar;
- pantalla de procesamiento;
- resultados con tabs;
- diseño responsive;
- borrador temporal persistido en `localStorage`.

`Arquitectura`

UI -> hooks / flujo -> `AnalysisGateway` -> implementación

`Estado actual`

- el flujo usa `AnalysisGateway`;
- la implementación concreta activa es `MockAnalysisGateway`;
- no existe todavía contrato backend/data science definitivo integrado en esta rama.

`Persistencia temporal del borrador`

- el draft se guarda en `localStorage` por usuario usando `financeai:new-analysis-draft:{userId}`;
- el autosave se realiza desde `useAnalysisDraftPersistence`.

`Conclusión`

- UI completa: implementada;
- contrato backend/data definitivo: pendiente externo;
- los resultados no deben describirse como respuesta real de backend o data science.

### Metas

Ruta:

- `/metas`

`Implementado frontend`

- listado;
- creación;
- edición;
- registro de aportes;
- completar meta;
- pausar y reactivar;
- eliminar;
- métricas de progreso;
- distribución de ahorro;
- sugerencias;
- dialogs;
- action menus;
- responsive desktop/mobile.

`Mock / estado local`

- el estado vive en `GoalsPage` usando `useState`;
- la data inicial proviene de `features/goals/mocks/goals.ts`;
- no hay persistencia backend ni sincronización remota.

`Estado dentro del MVP`

- preservada por completo;
- accesible por URL;
- actualmente oculta de la navegación principal visible del MVP.

`Nota de alcance`

- persistencia backend puede considerarse integración futura o externa;
- no debe documentarse como deuda obligatoria del frontend consolidado actual.

### Notificaciones

Ruta:

- `/notificaciones`

`Implementado frontend`

- filtros:
  - Todas
  - No leídas
  - Alertas
  - Recordatorios
  - Sugerencias
- contadores derivados;
- marcar leída/no leída;
- marcar todas;
- eliminar;
- preferencias;
- resumen;
- empty states;
- responsive.

`Mock / estado local`

- la página usa `useState` como fuente de verdad local;
- los datos provienen de `features/notifications/mocks/notifications.ts`;
- no existe evidencia de persistencia backend;
- no existe evidencia de WebSockets, polling o servicio real de notificaciones.

`Estado dentro del MVP`

- preservada por completo;
- accesible por URL;
- actualmente oculta de la navegación visible principal del MVP.

### Soporte

Ruta:

- `/soporte`

`Implementado frontend`

- presentación visual del equipo;
- perfiles;
- filtros;
- datos de contacto visibles;
- botones/links visuales;
- modal de contacto.

`Consolidación incorporada`

- `src/components/soporte/ModalContacto.tsx`
- `src/components/soporte/ModalContacto.css`

`Notas`

- la pantalla sigue siendo informativa;
- no existe ticketing backend real documentable en esta rama.

## Estado de integración

### Integrado / implementado frontend

- landing pública;
- layout privado consolidado;
- dashboard visual;
- login;
- register;
- Google Auth del lado cliente;
- historial;
- exportación PDF;
- Metas;
- Notificaciones;
- Soporte.

### Mock / local state

- Dashboard: `dashboardMock`
- Nuevo Análisis: `MockAnalysisGateway`
- Metas: local state / mocks
- Notificaciones: local state / mocks
- Soporte: modal local sin backend

### Integración backend presente en código, pendiente de validación end-to-end

- Login
- Register
- Google auth
- Historial

## Infraestructura API presente en el frontend

### Infraestructura disponible

- `src/api/env.ts`: centraliza variables de entorno.
- `src/api/index.ts`: helpers de acceso cliente.
- `src/api/indicators.ts`: cliente para `GET /api/indicadores/:userId` con fallback mock.
- `src/api/recommendations.ts`: cliente para Gemini usando `VITE_GEMINI_API_KEY`.
- `src/api/types.ts`: tipos compartidos para capa API.

### Nota de uso real

La infraestructura API está presente en el repositorio, pero no toda participa del flujo principal consolidado actual.

En particular:

- Dashboard no consume API real en esta rama;
- Nuevo Análisis no usa todavía contrato backend/data definitivo;
- Historial sí contiene integración cliente, pero requiere backend operativo para validación real.

## Variables de entorno

Documentadas actualmente en `frontend/.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

Notas:

- usar solamente valores de ejemplo;
- no agregar secretos reales;
- no copiar valores desde `.env` o `.env.local`.

## Estado funcional sugerido

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

## Build

Último build comprobado:

- comando: `pnpm build`
- resultado: success
- fecha: `20 de agosto de 2026`
- duración aproximada: `6.67 s`
- warning `>500 kB`: no presente

## Pendientes técnicos comprobables

### Pendientes frontend

- smoke test desktop/mobile completo;
- pruebas E2E;
- pruebas de integración frontend;
- validación PDF real en navegador;
- mejoras de accesibilidad;
- revisar el filtro de período de Historial si continúa sin funcionar;
- optimización adicional de logos y otros assets pesados.

### Pendientes de integración externa

- Dashboard:
  - endpoint real;
  - contrato;
  - validación end-to-end.
- Nuevo Análisis:
  - endpoint backend;
  - contrato request/response;
  - integración backend/data;
  - validación end-to-end.
- Historial:
  - backend activo;
  - URL definitiva según entorno;
  - JWT válido;
  - validación end-to-end real.
- Metas:
  - persistencia backend sólo si el alcance futuro la requiere.
- Notificaciones:
  - persistencia o servicio real sólo si el alcance futuro la requiere.

## Notas técnicas relevantes

- `Nav.tsx` se conserva, pero ya no es el layout activo del router.
- Metas y Notificaciones siguen implementadas aunque no aparezcan en la navegación visible principal.
- La mejora de performance del frontend vino de code splitting real, no de cambios cosméticos en la configuración de build.
- `logo-light.png` y `logo-dark.png` siguen siendo assets pesados y pueden tratarse como mejora futura del frontend, pero no fueron optimizados en esta etapa.
