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

### Consolidación del Frontend

Para la consolidación final del Frontend se inspeccionaron las siguientes ramas:

- `feature/notifications-frontend`
- `origin/Juan`
- `origin/feature/dashboard`

La rama de trabajo consolidada es:

- `feature/frontend-consolidated`

La consolidación se realizó tomando como base `feature/notifications-frontend` y recuperando de forma selectiva trabajo adicional desde `origin/Juan` y `origin/feature/dashboard`.

La integración fue realizada de manera selectiva con el objetivo de preservar el Frontend funcional sin alterar los componentes correspondientes a Backend ni Ciencia de Datos.

Durante la consolidación se aplicaron los siguientes criterios:

- Preservar el trabajo existente.
- Unificar el layout y la navegación privada.
- Mantener las funcionalidades desarrolladas, incluso aquellas que quedaron fuera de la navegación principal del MVP.
- Mantener rutas de compatibilidad.
- Diferenciar las funcionalidades implementadas en Frontend de aquellas que utilizan mocks o estado local.
- No asumir contratos de Backend o Ciencia de Datos que no estuvieran definidos.
- Optimizar el rendimiento del Frontend mediante code splitting.

### Arquitectura

La arquitectura privada vigente del Frontend consolidado es:

`ProtectedRoute` → `DashboardLayout` → `Sidebar + Topbar + MobileTabBar` → `Outlet` → Página privada

Puntos clave:

- `ProtectedRoute` funciona como barrera de acceso a las rutas autenticadas.
- `src/features/dashboard/components/DashboardLayout.tsx` es el layout privado común activo.
- `Sidebar`, `Topbar` y `MobileTabBar` conforman la navegación visual privada vigente.
- `src/components/layout/Nav.tsx` se preserva como una implementación previa del equipo, pero ya no es el layout utilizado por el router principal.

---

### Diseño de Interfaces

El Frontend cuenta con un conjunto de páginas y vistas orientadas a proporcionar una experiencia clara para la gestión y análisis de la información financiera del usuario.

Las principales interfaces disponibles son:

- **Landing:** página pública de presentación de FinanceAI.
- **Login:** acceso de usuarios a la aplicación.
- **Registro:** creación de una cuenta de usuario.
- **Dashboard:** panel principal para la visualización de indicadores, gráficos, transacciones y recomendaciones financieras.
- **Nuevo Análisis:** interfaz para el ingreso y revisión de información financiera mediante un flujo guiado de tres pasos.
- **Historial:** consulta y gestión de las transacciones registradas, incluyendo búsqueda, filtros, edición, eliminación y exportación en formato PDF.
- **Soporte:** sección destinada a presentar información del equipo y opciones de contacto.

Para la versión visible del MVP, la navegación principal incluye:

- Dashboard.
- Nuevo Análisis.
- Historial.
- Soporte.

Las funcionalidades **Metas** y **Notificaciones** también fueron desarrolladas y preservadas en el Frontend consolidado. Sin embargo, quedaron fuera de la navegación principal visible del MVP y permanecen accesibles mediante sus respectivas rutas.

La interfaz privada utiliza un layout común compuesto por `Sidebar`, `Topbar` y `MobileTabBar`, permitiendo mantener una navegación uniforme entre las diferentes páginas de la aplicación.

---

### Componentes

El Frontend consolidado utiliza componentes reutilizables para estructurar la navegación, representar la información financiera y mantener una experiencia uniforme entre las diferentes páginas de la aplicación.

Entre los principales componentes se encuentran:

**Componentes de estructura y navegación:**

- `DashboardLayout`
- `Sidebar`
- `Topbar`
- `MobileTabBar`
- `ProtectedRoute`
- `RouteContentFallback`

**Componentes de visualización financiera:**

- `AlertsCard`
- `BarChart`
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

**Componentes y elementos asociados a otras funcionalidades:**

- Componentes correspondientes al flujo de **Nuevo Análisis**.
- Componentes para la gestión y visualización del **Historial de transacciones**.
- Componentes correspondientes a **Metas** y **Notificaciones**, preservados fuera de la navegación principal del MVP.
- Componentes correspondientes a **Soporte**, incluyendo el modal de contacto.

La organización mediante componentes reutilizables permite mantener separadas las responsabilidades de presentación, navegación y visualización de información dentro de la aplicación.

---

### Navegación

La navegación y el enrutamiento se gestionan de forma centralizada mediante el router de la aplicación.

La aplicación cuenta con rutas públicas y privadas. Las rutas privadas se encuentran protegidas mediante `ProtectedRoute` y utilizan el layout común del Dashboard.

#### Rutas públicas

- `/`
- `/demo`
- `/login`
- `/register`

#### Rutas privadas

- `/dashboard`
- `/analisis/nuevo`
- `/historial`
- `/metas`
- `/notificaciones`
- `/soporte`

#### Navegación principal del MVP

Las funcionalidades visibles en la navegación principal del MVP son:

- Dashboard
- Nuevo Análisis
- Historial
- Soporte

Las funcionalidades **Metas** y **Notificaciones** fueron preservadas en el Frontend consolidado, pero se encuentran ocultas de la navegación principal del MVP y continúan accesibles mediante sus respectivas URL.

#### Redirects de compatibilidad

Para mantener compatibilidad con rutas utilizadas previamente se conservaron los siguientes redirects:

- `/dashboard/historial` → `/historial`
- `/dashboard/metas` → `/metas`
- `/dashboard/notificaciones` → `/notificaciones`
- `/dashboard/soporte` → `/soporte`

---

### Estado de las Funcionalidades

#### Dashboard

**Ruta:** `/dashboard`

El Dashboard se encuentra implementado e integrado al layout privado común de la aplicación.

Estado actual:

- Interfaz de usuario implementada.
- `Sidebar`, `Topbar` y `MobileTabBar` consolidados.
- Cards y gráficos implementados.
- Actualmente utiliza `dashboardMock` para representar la información financiera.

Por lo tanto, el Frontend visual del Dashboard se encuentra implementado, mientras que la integración con datos reales de Backend permanece pendiente de validación.

#### Nuevo Análisis

**Ruta:** `/analisis/nuevo`

La funcionalidad de Nuevo Análisis cuenta con un flujo guiado para el ingreso y revisión de la información financiera del usuario.

Estado actual:

- Wizard completo implementado.
- Flujo compuesto por tres pasos: datos financieros, transacciones y revisión.
- Validaciones mediante React Hook Form y Zod.
- Posibilidad de editar la información antes de confirmar.
- Pantalla de procesamiento.
- Presentación de resultados mediante tabs.
- Persistencia temporal del borrador mediante `localStorage`.
- Implementación actual mediante `MockAnalysisGateway`.

La interfaz se encuentra implementada. La integración definitiva con Backend y Ciencia de Datos permanece pendiente.

#### Historial

**Ruta:** `/historial`

La sección Historial permite consultar y gestionar las transacciones registradas.

Funcionalidades implementadas:

- Listado de transacciones.
- Búsqueda.
- Filtros.
- Resumen de ingresos y egresos.
- Edición de transacciones.
- Eliminación de transacciones.
- Exportación en formato PDF.

La funcionalidad contiene requests reales hacia Backend para consultar, modificar y eliminar transacciones. Su funcionamiento con el Backend disponible en el entorno definitivo requiere validación end-to-end.

Actualmente, el filtro `selectedPeriod` se encuentra presente, pero no participa completamente en el filtrado derivado.

#### Exportación PDF

La exportación de los registros de transacciones en formato PDF se encuentra implementada dentro de Historial.

Se utilizan las dependencias:

- `jsPDF`
- `jsPDF AutoTable`

La funcionalidad utiliza `dynamic import()` para cargar las dependencias de generación del PDF bajo demanda, evitando incorporarlas al bundle inicial de Historial.

#### Metas

**Ruta:** `/metas`

La funcionalidad se encuentra implementada a nivel Frontend utilizando estado local y mocks.

Incluye:

- Listado de metas.
- Creación y edición.
- Registro de aportes.
- Completar, pausar y reactivar metas.
- Eliminación.
- Métricas y progreso.
- Sugerencias.
- Diálogos y menús de acciones.
- Adaptación responsive.

Para el MVP, **Metas se encuentra fuera de la navegación principal**, aunque permanece preservada y accesible mediante URL directa.

#### Notificaciones

**Ruta:** `/notificaciones`

La funcionalidad se encuentra implementada a nivel Frontend utilizando estado local y mocks.

Incluye:

- Visualización de todas las notificaciones.
- No leídas.
- Alertas.
- Recordatorios.
- Sugerencias.
- Marcar como leída o no leída.
- Marcar todas.
- Eliminar.
- Preferencias.
- Resumen.
- Estados vacíos.
- Adaptación responsive.

Para el MVP, **Notificaciones se encuentra fuera de la navegación principal**, aunque permanece preservada y accesible mediante URL directa.

Actualmente no existe una integración documentada con persistencia Backend, WebSockets, polling o un servicio real de notificaciones.

#### Soporte

**Ruta:** `/soporte`

La sección de Soporte se encuentra implementada en Frontend e incluye:

- Presentación del equipo.
- Perfiles.
- Filtros.
- Datos de contacto visuales.
- Enlaces.
- Modal de contacto.

Actualmente funciona a nivel Frontend y no cuenta con un sistema de ticketing integrado con Backend.

---

### Integración con Backend

El Frontend consolidado contempla la comunicación con los servicios de Backend. Sin embargo, el estado de integración varía según la funcionalidad y algunas secciones continúan utilizando datos simulados o estado local.

#### Integración presente en código, pendiente de validación end-to-end

Las siguientes funcionalidades cuentan con integración con Backend presente en el código y requieren validación con el Backend disponible en el entorno definitivo:

- **Login**
- **Registro**
- **Google Auth**
- **Historial**

En el caso de **Historial**, se encuentran implementadas las siguientes solicitudes:

- `GET /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

La comunicación utiliza autenticación mediante JWT a través de:

`Authorization: Bearer ...`

#### Funcionalidades con datos simulados o estado local

Actualmente se encuentran implementadas en Frontend, pero todavía no utilizan una integración definitiva con Backend:

- **Dashboard:** utiliza `dashboardMock`.
- **Nuevo Análisis:** utiliza `MockAnalysisGateway`.
- **Metas:** utiliza estado local y mocks.
- **Notificaciones:** utiliza estado local y mocks.
- **Soporte:** utiliza un modal local y no cuenta actualmente con un sistema de tickets en Backend.

En **Nuevo Análisis**, la interfaz y el flujo se encuentran implementados, pero permanecen pendientes el endpoint de Backend, el contrato definitivo de request/response, la integración Backend/Ciencia de Datos y la validación end-to-end.

Por lo tanto, la existencia de una funcionalidad implementada visualmente en Frontend no implica necesariamente que su integración con Backend se encuentre finalizada.

---

## Integración con otras áreas

### Backend

El Frontend se integra con Backend para gestionar la autenticación, las transacciones y el procesamiento de la información necesaria para las funcionalidades de la aplicación.

En la versión consolidada del Frontend existen funcionalidades con integración Backend presente en el código, como **Login, Registro, Google Auth e Historial**, cuya validación end-to-end depende de contar con el Backend disponible y correctamente configurado en el entorno definitivo.

Para **Nuevo Análisis**, la interfaz y el flujo del usuario se encuentran implementados en Frontend mediante `MockAnalysisGateway`. La integración definitiva requiere completar y validar la comunicación con Backend y Ciencia de Datos utilizando los contratos de request/response correspondientes.

El **Dashboard** se encuentra implementado visualmente y actualmente utiliza `dashboardMock`, por lo que su conexión con datos reales deberá validarse como parte de la integración final.

La integración **Frontend ↔ Backend** y las pruebas correspondientes forman parte de las actividades pendientes para validar el flujo definitivo del MVP.

---

### Ciencia de Datos

La interacción del Frontend con los resultados generados por Ciencia de Datos se realiza a través de Backend, que actúa como intermediario entre la aplicación web y los servicios de procesamiento y análisis financiero.

En el flujo de **Nuevo Análisis**, el Frontend dispone de la interfaz necesaria para recopilar y enviar la información financiera del usuario. La integración definitiva con los resultados procesados por Backend y Ciencia de Datos se encuentra pendiente de validación end-to-end.

---

## Infraestructura

El Frontend utiliza **Vite** como herramienta de desarrollo y construcción de la aplicación, y **pnpm** para la gestión de dependencias.

### Variables de entorno

La configuración del Frontend contempla las siguientes variables de entorno:

```text
VITE_API_BASE_URL=http://localhost:8080
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_GOOGLE_CLIENT_ID=tu_google_client_id

```

`VITE_API_BASE_URL` permite configurar la URL base utilizada para la comunicación con Backend según el entorno de ejecución.

### Optimización y Code Splitting

Como parte de la consolidación del Frontend se implementó **code splitting a nivel de rutas** mediante:

- `React.lazy()`
- `dynamic import()`
- `Suspense`

Las principales páginas de la aplicación fueron configuradas para carga diferida, reduciendo el tamaño del bundle inicial.

La exportación PDF también utiliza `dynamic import()` para cargar `jsPDF` bajo demanda, evitando incorporar esta dependencia al bundle inicial de Historial.

### Resultado de la optimización

Antes de la optimización:

- Chunk JS principal: `~1046.69 kB`
- Gzip: `~325.53 kB`

Después del code splitting:

- Chunk JS principal: `~305.46 kB`
- Gzip: `~99.41 kB`

La reducción aproximada del chunk JS principal fue de **70,8 %**.

Luego de la optimización dejó de presentarse el warning relacionado con chunks superiores a 500 kB después de la minificación.

### Build

El último build documentado fue ejecutado el **20 de agosto de 2026** mediante:

```bash
pnpm build
```

Resultado:

- Estado: **Success**
- Duración aproximada: `6.67 s`
- Warning `>500 kB`: no presente

---
### Comandos de Ejecución

Los principales comandos utilizados para instalar dependencias, ejecutar y construir el Frontend son:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

---

## Estado Actual del Frontend

El Frontend se encuentra consolidado en la rama `feature/frontend-consolidated`. Las funcionalidades presentan diferentes niveles de integración con Backend, por lo que se distingue entre aquellas completamente disponibles en Frontend, las que utilizan datos simulados o estado local y las que requieren validación con Backend.

### Estado Funcional Resumido

| Feature | Frontend | Backend/API | Estado |
| --- | --- | --- | --- |
| Landing | Implementado | No requerido | Disponible |
| Login | Implementado | Integración presente | Requiere Backend disponible |
| Registro | Implementado | Integración presente | Requiere Backend disponible |
| Google Auth | Implementado | Integración presente | Requiere configuración |
| Dashboard | Implementado | Mock | Disponible con datos simulados |
| Nuevo Análisis | Implementado | `MockAnalysisGateway` | Disponible con datos simulados |
| Historial | Implementado | Requests reales | Requiere Backend disponible |
| PDF | Implementado | No requerido | Disponible |
| Metas | Implementado | Local/mock | Preservado por URL |
| Notificaciones | Implementado | Local/mock | Preservado por URL |
| Soporte | Implementado | Local | Disponible |

### Pendientes de Integración y Validación

**Dashboard**

- Endpoint real.
- Contrato.
- Validación end-to-end.

**Nuevo Análisis**

- Endpoint Backend.
- Contrato request/response.
- Integración Backend/Ciencia de Datos.
- Validación end-to-end.

**Historial**

- Backend activo.
- URL definitiva según entorno.
- JWT válido en entorno real.
- Validación end-to-end.

### Pendientes Frontend

- Realizar smoke test completo en escritorio y dispositivos móviles.
- Realizar pruebas end-to-end.
- Completar las pruebas de integración Frontend ↔ Backend.
- Validar la exportación PDF en navegador.
- Revisar el funcionamiento del filtro de período del Historial.
- Continuar las mejoras de accesibilidad.
- Optimizar en futuras iteraciones logos y assets pesados.

---

## Mejoras Futuras

A partir del desarrollo realizado y de las funcionalidades preservadas en el Frontend consolidado, se identifican las siguientes oportunidades de evolución para versiones posteriores:

- Integrar **Metas** con servicios Backend para permitir la persistencia y gestión de objetivos financieros con datos reales.
- Integrar **Notificaciones** con servicios Backend y mecanismos de actualización que permitan gestionar notificaciones reales para el usuario.
- Implementar un servicio Backend para la funcionalidad de **Soporte**, permitiendo gestionar solicitudes o tickets de los usuarios.
- Continuar mejorando la accesibilidad de las diferentes interfaces de la aplicación.
- Optimizar logos, imágenes y otros assets para continuar mejorando el rendimiento del Frontend.
- Revisar y ampliar las funcionalidades de filtrado por período disponibles en el **Historial**.
- Continuar optimizando la experiencia responsive para distintos dispositivos.

---

## Herramientas y Tecnologías Utilizadas

Para el desarrollo y consolidación del Frontend se utilizaron las siguientes tecnologías y herramientas:

- **React 19:** desarrollo de la interfaz de usuario basada en componentes.
- **TypeScript 5:** tipado y desarrollo de componentes y funcionalidades.
- **Vite 7:** entorno de desarrollo y construcción de la aplicación.
- **React Router DOM 7:** gestión de rutas públicas y privadas.
- **React Hook Form:** gestión de formularios.
- **Zod:** validación de datos ingresados en formularios.
- **Radix UI Dialog:** implementación de componentes de diálogo.
- **Lucide React:** iconografía utilizada en la interfaz.
- **React Icons:** componentes de iconos adicionales.
- **Google OAuth:** autenticación mediante cuenta de Google.
- **jsPDF:** generación de documentos PDF.
- **jsPDF AutoTable:** generación de tablas dentro de los documentos PDF.
- **pnpm:** gestión de dependencias del proyecto.

Adicionalmente, se encuentra incluida la librería `@google/generative-ai` para Gemini; actualmente no está conectada al flujo principal del Frontend consolidado.

---

## Equipo Responsable

Equipo de Desarrollo – Equipo 8.