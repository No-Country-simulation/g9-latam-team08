# FinanceAI Frontend

Frontend inicial del MVP de FinanceAI, construido con React, TypeScript y Vite.

## Cómo instalar

```bash
pnpm install
```

## Cómo correr

```bash
pnpm run dev
```

La app queda disponible por defecto en `http://localhost:5173`.

## Scripts

- `npm run dev`: inicia el entorno local con Vite.
- `npm run build`: ejecuta chequeo TypeScript y genera el build de producción.
- `npm run preview`: sirve el build generado localmente.

## Estructura

```text
frontend/
├── src/
│   ├── app/router/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   ├── analysis/
│   │   ├── dashboard/
│   │   ├── landing/
│   │   ├── recommendations/
│   │   └── transactions/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── .env.example
├── index.html
├── package.json
└── README.md
```

## Estado actual

- Landing pública implementada.
- Ruta placeholder para `/analisis/nuevo`.
- Ruta `/demo` reutilizando la landing con scroll al preview.
- Tokens visuales base y componentes reutilizables mínimos.
- Tipos preliminares creados para la futura integración con API.

## Decisiones pendientes

- Confirmar contrato JSON definitivo con Backend y Data Science.
- Definir librerías/formularios del flujo interno de análisis cuando se implemente carga de datos.
- Evaluar si el dashboard final usará gráficos o primeras tarjetas métricas sin charts.
- Alinear si habrá navegación mobile expandible o menú drawer en la siguiente iteración.
