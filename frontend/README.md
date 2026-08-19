# FinanceAI — Dashboard

Dashboard principal del frontend de FinanceAI, desarrollado con React, TypeScript y Vite.

Esta implementación presenta una interfaz de gestión financiera con resumen de indicadores, evolución de gastos, distribución por categorías, transacciones, alertas, recomendaciones y métricas de salud financiera.

El Dashboard está preparado para integrarse posteriormente con los datos reales provenientes del backend. Actualmente utiliza datos mock para representar la información de la interfaz.

## Stack tecnológico

- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7
- Lucide React
- CSS puro
- SVG para gráficos e indicadores visuales

## Requisitos

- Node.js instalado
- npm o pnpm instalado

## Instalación

Desde la carpeta `frontend`:

```bash
npm install
```

o, utilizando pnpm:

```bash
pnpm install
```

## Ejecución

Para iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

o:

```bash
pnpm dev
```

La aplicación se ejecuta por defecto en:

```text
http://localhost:5173
```

## Dashboard

El Dashboard está compuesto por diferentes componentes reutilizables que permiten organizar la información financiera del usuario.

### Principales secciones

- Resumen de salud financiera.
- Indicadores financieros principales.
- Gastos por categoría.
- Evolución mensual.
- Últimas transacciones.
- Factores clave.
- Recomendaciones.
- Alertas.
- Navegación lateral.
- Barra de navegación superior.
- Navegación móvil.

## Componentes principales

Los componentes específicos del Dashboard se encuentran en:

```text
src/features/dashboard/components/
```

Entre ellos:

```text
DashboardLayout
Sidebar
Topbar
MobileTabBar
ScoreCard
ScoreGauge
StatsGrid
StatCard
ExpensesByCategoryCard
DonutChart
MonthlyEvolutionCard
BarChart
TransactionsTable
CategoryBadge
ConfidenceBar
KeyFactorsCard
RecommendationsCard
AlertsCard
```

Cada componente cuenta con su propio archivo `.tsx` y `.css`, siguiendo la estructura utilizada en el proyecto.

## Estructura principal

```text
frontend/
├── src/
│   ├── api/
│   ├── app/
│   │   └── router/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   └── dashboard/
│   │       └── components/
│   ├── pages/
│   ├── styles/
│   └── types/
├── .env.example
├── index.html
├── package.json
└── README.md
```

## Navegación

El Dashboard se encuentra integrado al sistema de rutas del proyecto.

La página se encuentra disponible mediante:

```text
/dashboard
```

Además, el DashboardLayout reutiliza componentes de navegación compartidos, incluyendo:

- Sidebar.
- Topbar.
- MobileTabBar.

El Sidebar está preparado para la navegación entre las diferentes funcionalidades del sistema.

## Diseño responsive

El Dashboard fue desarrollado teniendo en cuenta diferentes tamaños de pantalla.

La distribución de los contenidos se adapta automáticamente según el ancho disponible, reorganizando las tarjetas y columnas para mantener una correcta experiencia de usuario en:

- Desktop.
- Tablet.
- Mobile.

## Light / Dark Mode

El Dashboard cuenta con soporte para:

- Light Mode.
- Dark Mode.

El cambio de tema se realiza mediante el sistema de tema implementado en el proyecto y los componentes utilizan los tokens de diseño definidos en:

```text
src/styles/tokens.css
```

Esto permite mantener colores, fondos, bordes y demás elementos visuales consistentes entre ambos modos.

## Datos

Actualmente, el Dashboard utiliza datos mock para representar la información financiera.

Los datos utilizados para la interfaz se encuentran principalmente en:

```text
src/features/dashboard/components/dashboardMocks.ts
```

Esto permite desarrollar y validar la interfaz antes de realizar la integración definitiva con los datos provenientes del backend.

## Gráficos

Los gráficos del Dashboard fueron desarrollados utilizando componentes propios y SVG, sin incorporar una librería externa de gráficos.

Se incluyen:

- Gráfico de distribución de gastos.
- Gráfico de evolución mensual.
- Indicador visual de salud financiera.
- Barras de progreso y confianza.

Esto permite mantener el diseño visual consistente con el resto del proyecto y evitar dependencias adicionales.

## Funcionalidades implementadas

### Dashboard

- Visualización del score financiero.
- Indicadores de ingresos, gastos y ahorro.
- Distribución de gastos por categoría.
- Evolución mensual.
- Tabla de transacciones.
- Alertas financieras.
- Recomendaciones.
- Factores clave.
- Diseño responsive.
- Light/Dark Mode.
- Navegación mediante Sidebar.
- Adaptación para dispositivos móviles.

### Componentización

La interfaz fue dividida en componentes independientes y reutilizables para facilitar:

- Mantenimiento.
- Escalabilidad.
- Reutilización.
- Futuras integraciones con datos reales.

## Estado actual

El Dashboard se encuentra implementado a nivel de frontend y preparado para continuar con la integración de datos reales del proyecto.

Los datos mostrados actualmente son de prueba/mock y permiten validar la interfaz, los componentes y la experiencia de usuario antes de conectar los endpoints correspondientes.

## Archivos principales

```text
src/pages/DashboardPage.tsx
src/pages/DashboardPage.css

src/features/dashboard/components/
├── DashboardLayout.tsx
├── Sidebar.tsx
├── Topbar.tsx
├── MobileTabBar.tsx
├── ScoreCard.tsx
├── ScoreGauge.tsx
├── StatsGrid.tsx
├── StatCard.tsx
├── ExpensesByCategoryCard.tsx
├── DonutChart.tsx
├── MonthlyEvolutionCard.tsx
├── BarChart.tsx
├── TransactionsTable.tsx
├── KeyFactorsCard.tsx
├── RecommendationsCard.tsx
└── AlertsCard.tsx
```

## Autor

Implementación del Dashboard — Frontend

**Thiago-BF**
