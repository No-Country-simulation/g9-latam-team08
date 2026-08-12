# Sistema de Alerta Financiera Temprana

## Frontend

---

## Objetivo

Documentar la arquitectura, diseño, implementación e integración del componente Frontend desarrollado para el Sistema de Alerta Financiera Temprana, describiendo las interfaces de usuario, los componentes implementados y la comunicación con los servicios del Backend.

---
## Alcance

Este documento describe los componentes, procesos y funcionalidades implementados por el área de Frontend, incluyendo el diseño de las interfaces de usuario, la navegación entre pantallas, los componentes desarrollados, la integración con la API Backend, la experiencia de usuario, la infraestructura utilizada y las tecnologías empleadas durante el desarrollo del proyecto.

---

## Desarrollo del Componente

### Arquitectura

```
frontend/
├── .env.example
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.app.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── vite-env.d.ts
    ├── api/
    │   ├── env.ts
    │   ├── index.ts
    │   ├── indicators.ts
    │   ├── recommendations.ts
    │   └── types.ts
    ├── app/
    │   └── router/
    │       └── index.tsx
    ├── assets/
    ├── components/
    │   ├── layout/
    │   │   ├── Footer.css
    │   │   ├── Footer.tsx
    │   │   ├── Header.css
    │   │   └── Header.tsx
    │   └── ui/
    │       ├── Button.css
    │       ├── Button.tsx
    │       ├── Card.css
    │       ├── Card.tsx
    │       ├── Container.css
    │       ├── Container.tsx
    │       ├── SectionHeader.css
    │       └── SectionHeader.tsx
    ├── features/
    │   ├── analysis/
    │   ├── dashboard/
    │   │   └── components/
    │   │       ├── AlertsCard.css
    │   │       ├── AlertsCard.tsx
    │   │       ├── BarChart.css
    │   │       ├── BarChart.tsx
    │   │       ├── CategoryBadge.css
    │   │       ├── CategoryBadge.tsx
    │   │       ├── ConfidenceBar.css
    │   │       ├── ConfidenceBar.tsx
    │   │       ├── DashboardLayout.css
    │   │       ├── DashboardLayout.tsx
    │   │       ├── DonutChart.css
    │   │       ├── DonutChart.tsx
    │   │       ├── ExpensesByCategoryCard.css
    │   │       ├── ExpensesByCategoryCard.tsx
    │   │       ├── KeyFactorsCard.css
    │   │       ├── KeyFactorsCard.tsx
    │   │       ├── MobileTabBar.css
    │   │       ├── MobileTabBar.tsx
    │   │       ├── MonthlyEvolutionCard.css
    │   │       ├── MonthlyEvolutionCard.tsx
    │   │       ├── RecommendationsCard.css
    │   │       ├── RecommendationsCard.tsx
    │   │       ├── ScoreCard.css
    │   │       ├── ScoreCard.tsx
    │   │       ├── ScoreGauge.css
    │   │       ├── ScoreGauge.tsx
    │   │       ├── Sidebar.css
    │   │       ├── Sidebar.tsx
    │   │       ├── StatCard.css
    │   │       ├── StatCard.tsx
    │   │       ├── StatsGrid.css
    │   │       ├── StatsGrid.tsx
    │   │       ├── Topbar.css
    │   │       ├── Topbar.tsx
    │   │       ├── TransactionsTable.css
    │   │       ├── TransactionsTable.tsx
    │   │       ├── categoryColors.ts
    │   │       └── dashboardMocks.ts
    │   ├── landing/
    │   │   └── components/
    │   │       ├── DashboardPreviewSkeleton.css
    │   │       ├── DashboardPreviewSkeleton.tsx
    │   │       ├── FeatureCard.css
    │   │       ├── FeatureCard.tsx
    │   │       ├── StepCard.css
    │   │       └── StepCard.tsx
    │   ├── recommendations/
    │   └── transactions/
    ├── pages/
    │   ├── DashboardPage.css
    │   ├── DashboardPage.tsx
    │   ├── LandingPage.css
    │   ├── LandingPage.tsx
    │   ├── Login.css
    │   ├── Login.jsx
    │   ├── NewAnalysisPage.css
    │   ├── NewAnalysisPage.tsx
    │   ├── NotFoundPage.css
    │   ├── NotFoundPage.tsx
    │   └── Register.jsx
    ├── styles/
    │   ├── globals.css
    │   └── tokens.css
    ├── types/
    │   └── financial-analysis.ts
    └── utils/
        └── formatters.ts

```    

---

### Diseño de Interfaces

El frontend cuenta con un sistema de páginas y vistas bien definidas ubicadas en src/pages/, incluyendo DashboardPage.tsx, LandingPage.tsx, NewAnalysisPage.tsx, NotFoundPage.tsx, además de vistas de autenticación (Login.jsx, Register.jsx).

Utiliza una capa de componentes visuales reutilizables bajo src/components/ui/ (botones, tarjetas, contenedores, cabeceras de sección) y componentes estructurales de diseño en src/components/layout/ (Header y Footer).

Implementa una interfaz de usuario orientada a paneles de control financieros avanzados dentro de src/features/dashboard/components/, que incluye gráficos de barras, gráficos de dona, medidores de puntaje, tarjetas de alertas, tablas de transacciones y barras de navegación adaptadas.

---

### Componentes

Estructurales y de Layout: Header.tsx, Footer.tsx, Sidebar.tsx, Topbar.tsx, MobileTabBar.tsx, DashboardLayout.tsx.

UI Atómicos: Button.tsx, Card.tsx, Container.tsx, SectionHeader.tsx, CategoryBadge.tsx, ConfidenceBar.tsx.

Componentes de Visualización y Analítica: BarChart.tsx, DonutChart.tsx, ScoreGauge.tsx, ScoreCard.tsx, StatCard.tsx, StatsGrid.tsx, AlertsCard.tsx, ExpensesByCategoryCard.tsx, KeyFactorsCard.tsx, MonthlyEvolutionCard.tsx, RecommendationsCard.tsx, TransactionsTable.tsx.

Landing Page: DashboardPreviewSkeleton.tsx, FeatureCard.tsx, StepCard.tsx.

---

### Navegación

La navegación y el enrutamiento se lo gestionan de forma centralizada mediante un enrutador ubicado en src/app/router/index.tsx.

---

### Integración con Backend

La comunicación con la API se encuentra organizada en el directorio src/api/, el cual contiene módulos especializados como dashboard.ts, indicators.ts, recommendations.ts, configuración de entorno (env.ts) y definiciones de tipos centralizadas (types.ts).

---

## Integración con otras áreas

### Backend

El frontend consume estos servicios a través del directorio src/api/, el cual incluye módulos especializados como dashboard.ts, indicators.ts y recommendations.ts para gestionar las peticiones hacia el servidor.

Para los tipos y los datos se utilizan interfaces y tipos centralizados en types.ts dentro del frontend para asegurar que la estructura de los datos recibidos desde el backend coincida con la requerida por los componentes visuales como TransactionsTable.tsx o StatsGrid.tsx.

El entorno está configurado y se emplea con archivos como env.ts en el frontend para definir la URL base de conexión hacia el servidor de Spring Boot.

---

## Infraestructura

Se incluye configuración de contenedores y flujos de trabajo orientados a microservicios o despliegues modernos, junto con herramientas de gestión de dependencias como Maven en pnpm pnpm-workspace.yaml y pnpm-lock.yaml.

---

## Mejoras Futuras


---

## Herramientas y Tecnologías Utilizadas

React, TypeScript, Vite, pnpm, CSS modular por componente, diseño basado en tokens dentro de src/styles/tokens.css, src/styles/globals.css.

---

## Equipo Responsable

Equipo: Grupo de Desarrollo del equipo 8.