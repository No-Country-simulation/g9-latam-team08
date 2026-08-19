# FinanceAI Frontend

Aplicación frontend de FinanceAI construida con React, TypeScript y Vite. Reúne la landing pública, autenticación, historial financiero, el flujo de Nuevo Análisis, la gestión de Metas y el centro de Notificaciones.

El estado del proyecto es mixto: algunas vistas ya consumen endpoints reales del backend, mientras que otras siguen implementadas con mocks o estado local para avanzar en UX y validaciones antes de cerrar contratos definitivos.

## Stack tecnológico

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- React Hook Form + Zod
- Radix UI Dialog
- Lucide React / React Icons
- Google OAuth para login social
- Integración cliente para Gemini disponible en `src/api` (no conectada al flujo principal actual)

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
│   ├── api/                  # Clientes e infraestructura para endpoints/IA
│   ├── app/router/           # Router principal de la aplicación
│   ├── components/
│   │   ├── layout/           # Header, footer, auth layout, sidebar
│   │   ├── historial/        # Componentes del historial financiero
│   │   └── ui/               # Button, Card, Container, SectionHeader, etc.
│   ├── features/
│   │   ├── analysis/         # Wizard, validaciones, draft, resultado, gateway
│   │   ├── goals/            # Metas, dialogs, métricas, sugerencias
│   │   ├── landing/          # Componentes de la landing pública
│   │   └── notifications/    # Notificaciones, preferencias, resumen
│   ├── hooks/                # Hooks compartidos (ej. auth Google)
│   ├── pages/                # Páginas/rutas
│   ├── styles/               # Tokens y estilos globales
│   ├── types/                # Tipos compartidos fuera de features
│   └── utils/                # ProtectedRoute y utilidades compartidas
├── .env.example
├── package.json
└── README.md
```

## Rutas implementadas

### Públicas

- `/`: landing pública con propuesta del producto, demo visual y CTA al análisis.
- `/demo`: reutiliza la landing y hace scroll al preview.
- `/login`: inicio de sesión con formulario y opción Google.
- `/register`: registro con formulario y opción Google.

### Privadas

- `/historial`: historial financiero con filtros, resumen, tabla, edición y eliminación.
- `/analisis/nuevo`: flujo completo de Nuevo Análisis.
- `/metas`: gestión de metas financieras.
- `/notificaciones`: centro de notificaciones con filtros, preferencias y resumen.
- `/soporte`: página informativa del equipo y canal de contacto.

### Observaciones del router actual

- `ProtectedRoute` protege las rutas privadas usando `localStorage` (`userId`).
- El menú lateral contiene links a `/dashboard` y `/configuraciones`, pero esas rutas no están implementadas en el router actual.

## Funcionalidades por feature

### Landing y navegación

`Implementado frontend`

- Landing pública con hero, bloques de funcionalidades, pasos y CTA.
- Demo visual basada en `DashboardPreviewSkeleton`.
- Layout privado con sidebar responsive, perfil de usuario y toggle visual de tema.

### Autenticación

`Implementado con integración backend`

- Login por email/contraseña contra `POST /api/auth/login`.
- Registro contra `POST /api/auth/register`.
- Inicio de sesión con Google contra `POST /api/auth/google`.
- Persistencia de sesión en `localStorage` (`userId`, `jwt_token`, `userName`, `userEmail`, `userPhoto`).

Observación:

- El frontend usa `VITE_GOOGLE_CLIENT_ID` en código, pero esa variable no está documentada hoy en `.env.example`.

### Historial financiero

`Implementado frontend con integración backend parcial`

- Carga inicial desde `GET /api/transactions`.
- Filtros por búsqueda, categoría, tipo y cuenta.
- Resumen de ingresos/egresos filtrados.
- Edición vía `PUT /api/transactions/:id`.
- Eliminación vía `DELETE /api/transactions/:id`.

`Fallback local/mock`

- Si el backend no responde, la pantalla muestra un mensaje de error y carga datos de prueba en memoria.

Limitaciones detectadas:

- El filtro de período existe en UI, pero no impacta actualmente en el filtrado derivado.

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

### Soporte

`Implementado frontend`

- Página visual del equipo del proyecto.
- Filtro por perfil (`Todos`, `Backend`, `Frontend`, `Data`).
- Tarjetas del equipo y CTA visual de contacto.

Observación:

- Hoy es una pantalla informativa; no hay integración real de contacto o ticketing.

## Estado de integración

### Integrado con backend real hoy

- Login por email/contraseña.
- Registro.
- Login con Google validado por backend.
- Historial financiero:
  - listado,
  - edición,
  - eliminación.

### Implementado en frontend pero no integrado end-to-end

- Nuevo Análisis:
  - el flujo UI está completo,
  - el resultado actual usa un gateway mock.
- Metas:
  - CRUD y métricas resueltos en estado local.
- Notificaciones:
  - feed, filtros y preferencias resueltos en estado local.

### Infraestructura presente pero no conectada al flujo principal actual

- `src/api/indicators.ts`: cliente para `GET /api/indicadores/:userId` con fallback mock.
- `src/api/recommendations.ts`: cliente para Gemini usando `VITE_GEMINI_API_KEY`.
- `src/api/index.ts`: helper `getAiRecommendations(...)`.

Esa capa existe en el repositorio, pero no está enchufada al wizard actual de Nuevo Análisis, que hoy sigue usando `MockAnalysisGateway`.

## Variables de entorno

Documentadas actualmente en `.env.example`:

- `VITE_API_BASE_URL`: base URL del backend HTTP.
- `VITE_GEMINI_API_KEY`: API key para la integración cliente con Gemini.

## Pendientes técnicos comprobables

- Integrar el flujo de Nuevo Análisis con el backend/data science reemplazando `MockAnalysisGateway`.
- Definir y aplicar el contrato definitivo del endpoint de análisis.
- Persistir Metas en backend.
- Persistir Notificaciones y preferencias en backend.
- Generar notificaciones reales desde backend en lugar de mocks locales.
- Alinear `.env.example` con la variable `VITE_GOOGLE_CLIENT_ID` usada por el login social.
- Implementar o remover del menú las rutas `/dashboard` y `/configuraciones`.
- Agregar pruebas de integración/end-to-end.
