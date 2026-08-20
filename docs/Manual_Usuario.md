# 📊 Finance AI – Asistente Inteligente de Salud Financiera

## Manual de Usuario

---

## Introducción

Este manual tiene como objetivo servir como guía práctica y de referencia para los usuarios de FinanceAI, una aplicación diseñada para transformar la gestión del dinero personal mediante el uso de inteligencia artificial. A través de este documento, aprenderás a configurar tu cuenta, registrar tus movimientos, interpretar tus análisis mensuales y aprovechar al máximo las recomendaciones automatizadas para optimizar tu salud financiera.

---

## Objetivo de la Aplicación

FinanceAI ha sido desarrollada con la misión de democratizar el acceso a la gestión financiera personal, brindando a los usuarios herramientas de análisis profundo que anteriormente estaban limitadas a especialistas. El objetivo central de la aplicación es dotar al usuario de una visión clara y transparente sobre su flujo de dinero mediante tres pilares fundamentales:

* **Control y Registro:** Facilitar la creación de un historial financiero completo y organizado, permitiendo el seguimiento detallado de los ingresos y egresos diarios.

* **Análisis Conductual:** Procesar los gastos mensuales mediante algoritmos inteligentes para identificar patrones de consumo y categorizar el comportamiento financiero del usuario.

* **Perfilamiento y Salud Financiera:** Determinar un perfil financiero personalizado que permita al usuario entender su situación actual, identificar oportunidades de ahorro y recibir recomendaciones accionables para mejorar su estabilidad económica a largo plazo.

---

## Requisitos

### Requisitos del Sistema

FinanceAI es una aplicación web (WebApp) diseñada para ejecutarse en navegadores modernos. Para una experiencia óptima, recomendamos:

* **Navegador:** Versiones actualizadas de Google Chrome, Mozilla Firefox, Microsoft Edge o Safari.

* **Conexión a Internet:** Conexión estable para la comunicación con nuestros servidores de procesamiento.

* **Dispositivos:** Actualmente optimizada para equipos de escritorio (PC/Laptop). Próximamente disponible para dispositivos móviles.

### Acceso a la Aplicación

El acceso a la plataforma se realiza a través de un sistema de autenticación segura.

Registro: Accede a la URL oficial y crea tu cuenta utilizando un correo electrónico válido y una contraseña segura.

---

## Inicio de la Aplicación

Tras iniciar sesión, accederás al **Dashboard Principal**. Aquí visualizarás un resumen de tu salud financiera actual. En tu primer acceso, la aplicación te guiará mediante un asistente para configurar tus datos base e ingresos mensuales, lo cual es fundamental para que el motor de inteligencia artificial comience a generar tus perfiles de análisis.

---

## Funcionalidades

### Registro de Información Financiera

Para registrar tus gastos, puedes exportar tus estados de cuenta en formato PDF y cargarlos manualmente en la plataforma. La aplicación procesará esta información para incorporarla a tu historial detallado.

### Visualización del Análisis Financiero

El sistema analiza tus movimientos mensuales mediante nuestra API de Python. Los resultados se reflejan en gráficos interactivos que muestran la evolución de tus gastos y tu capacidad de ahorro a lo largo del tiempo.

### Consulta de Indicadores

Podrás consultar métricas clave como tu ratio de endeudamiento, gastos esenciales vs. no esenciales y tu nivel de ahorro neto.

### Recomendaciones Financieras

Basándose en tu comportamiento de gasto, FinanceAI te proporcionará recomendaciones personalizadas para optimizar tu presupuesto y alcanzar una mayor estabilidad económica.

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
Actualmente está diseñada para escritorio, pero estamos trabajando en la versión móvil próximamente.

**¿Qué hago si la categoría de un gasto no es correcta?**
La categorización es automática mediante nuestra IA; si detectas un error, el sistema aprenderá de tus correcciones en futuras cargas.

---

## Solución de Problemas

* **El análisis no carga:** Refresca la página. Si el problema persiste, verifica tu conexión a internet o intenta cerrar y volver a abrir sesión.

* **Problemas de acceso:** Utiliza la opción de "Recuperar contraseña" en la pantalla de inicio.

---

## Limitaciones

* **Acceso:** No es una aplicación nativa, por lo que su rendimiento depende del navegador web utilizado.

* **Historial:** La precisión del perfil financiero aumenta con la cantidad de meses cargados; el sistema requiere al menos un mes de datos para ofrecer un perfil inicial.

---

## Versiones
** Versión 1.0.0 (Lanzamiento inicial):** Incluye exportacion del registro de transacciones mediante PDF, categorización automática mediante API Python, generación de perfiles de riesgo y panel de visualización en WebApp.
