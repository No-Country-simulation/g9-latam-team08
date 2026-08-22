# 📊 Finance AI – Asistente Inteligente de Salud Financiera

## Manual de Usuario

---
## Introducción

Este manual tiene como objetivo servir como guía práctica y de referencia para los usuarios de Finance AI, una aplicación diseñada para facilitar la comprensión y gestión de las finanzas personales mediante el análisis de información financiera y el uso de inteligencia artificial.

A través de este documento, el usuario podrá conocer las principales funcionalidades de la aplicación, ingresar la información necesaria para realizar un nuevo análisis, interpretar los resultados obtenidos y consultar las recomendaciones personalizadas generadas para apoyar la toma de decisiones financieras.

---

## Objetivo de la Aplicación

Finance AI tiene como objetivo ayudar al usuario a comprender mejor su situación financiera mediante el análisis de su información financiera y transaccional, facilitando la identificación de hábitos de consumo y apoyando la toma de decisiones sobre sus finanzas personales.

La solución se apoya en tres pilares fundamentales:

- **Control y Organización:** Facilitar el registro y la organización de la información financiera y transaccional del usuario para favorecer una visión más clara de sus ingresos y gastos.

- **Análisis Financiero:** Procesar la información ingresada para identificar patrones de consumo, clasificar los gastos y generar indicadores que permitan comprender mejor la situación financiera del usuario.

- **Perfilamiento y Salud Financiera:** Determinar un perfil financiero a partir de los indicadores analizados y generar recomendaciones personalizadas que ayuden al usuario a identificar oportunidades de mejora en la gestión de sus finanzas.

---

## Requisitos

### Requisitos del Sistema

FinanceAI es una aplicación web (WebApp) diseñada para ejecutarse en navegadores modernos. Para una experiencia óptima, recomendamos:

* **Navegador:** Versiones actualizadas de Google Chrome, Mozilla Firefox, Microsoft Edge o Safari.

* **Conexión a Internet:** Conexión estable para la comunicación con nuestros servidores de procesamiento.

* **Dispositivos:** Actualmente optimizada para equipos de escritorio (PC/Laptop).

### Acceso a la Aplicación

El acceso a Finance AI se realiza desde la Aplicación Web desplegada.

Una vez disponible la versión definitiva del MVP, el usuario podrá acceder mediante las opciones de autenticación habilitadas en la aplicación.

---

## Inicio de la Aplicación

Tras iniciar sesión, accederás al **Dashboard Principal**. Aquí visualizarás un resumen de tu salud financiera actual.

---

## Funcionalidades

### Nuevo Análisis

Desde la opción **Nuevo Análisis**, puedes ingresar la información necesaria para realizar tu análisis financiero mediante un proceso guiado de tres pasos:

- Datos financieros.
- Transacciones.
- Revisión de la información.

Antes de confirmar, puedes revisar y editar los datos ingresados.

### Visualización del Análisis Financiero

Una vez ingresada y procesada la información financiera, Finance AI presenta los resultados del análisis para facilitar la comprensión de la situación financiera del usuario.

Los resultados incluyen indicadores y datos relacionados con el comportamiento financiero, que permiten al usuario conocer su perfil financiero y comprender mejor la distribución de sus gastos.

voy a dejar paar verificar

El sistema analiza tus movimientos mensuales mediante nuestra API de Python. Los resultados se reflejan en gráficos interactivos que muestran la evolución de tus gastos y tu capacidad de ahorro a lo largo del tiempo.

### Consulta de Indicadores

Podrás consultar métricas clave como tu ratio de endeudamiento, gastos esenciales vs. no esenciales y tu nivel de ahorro neto.

### Recomendaciones Financieras

Basándose en tu comportamiento de gasto, FinanceAI te proporcionará recomendaciones personalizadas para optimizar tu presupuesto y alcanzar una mayor estabilidad económica.

### Historial de Transacciones

Desde la sección **Historial** puedes consultar y gestionar las transacciones registradas.

La sección permite:

- Visualizar el listado de transacciones.
- Buscar y filtrar registros.
- Consultar el resumen de ingresos y egresos.
- Editar transacciones.
- Eliminar transacciones.
- Exportar los registros en formato PDF.

---

## Interpretación de Resultados

La aplicación clasifica tu situación financiera en uno de los siguientes tres perfiles:

* **Saludable:** Tus finanzas están equilibradas, con un buen margen de ahorro y bajo nivel de deuda.

* En **Observación:** Existen áreas de oportunidad; tus gastos están cerca de tus ingresos, lo que requiere un ajuste en el control de presupuestos.

* En **Riesgo:** Tus indicadores muestran un endeudamiento elevado o gastos que superan tus ingresos recurrentes. Se requieren acciones correctivas inmediatas sugeridas por la app.

---

## Preguntas Frecuentes (FAQ)

**¿Mis datos bancarios están seguros?**

FinanceAI no utiliza APIs bancarias externas. Toda la información es gestionada a través de tus registros manuales, garantizando que no accedemos a tus cuentas bancarias directamente.

**¿Puedo usar la app desde mi celular?**

Actualmente, la versión del MVP está orientada principalmente a equipos de escritorio (PC/Laptop).

---

## Solución de Problemas

* **El análisis no carga:** Refresca la página. Si el problema persiste, verifica tu conexión a internet o intenta cerrar y volver a abrir sesión.

- **Problemas de acceso:** Verifica tu conexión a Internet y vuelve a intentar el acceso mediante las opciones de autenticación disponibles en la aplicación.

---

## Limitaciones

* **Acceso:** No es una aplicación nativa, por lo que su rendimiento depende del navegador web utilizado.

---

## Versiones

**Versión 1.0.0 (Lanzamiento inicial):** Incluye exportación del registro de transacciones mediante PDF, categorización automática mediante API Python, generación de perfiles de riesgo y panel de visualización en WebApp.