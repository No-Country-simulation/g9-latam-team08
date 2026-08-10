# Sistema de Alerta Financiera Temprana

## Oracle Cloud Infrastructure (OCI)

---

## Objetivo

Documentar la infraestructura en Oracle Cloud Infrastructure (OCI) utilizada en el Sistema de Alerta Financiera Temprana, describiendo los servicios implementados, la configuración realizada y la integración con los demás componentes del proyecto.

---

## Alcance

Este documento describe los servicios, recursos y procesos implementados en Oracle Cloud Infrastructure (OCI), incluyendo el almacenamiento, el despliegue, la integración con Backend y Ciencia de Datos, la configuración de los servicios utilizados y las tecnologías empleadas durante el desarrollo del proyecto.

---

## Desarrollo del Componente

### Arquitectura de la Solución

OCI cumple dos funciones dentro del proyecto: alojar los modelos entrenados por el equipo de Ciencia de Datos (Object Storage) y hospedar la API que los consume (Compute). Los modelos se suben al bucket una vez entrenados y serializados; la API, corriendo en la instancia de Compute, los descarga desde ahí al iniciar y los utiliza para procesar las solicitudes de análisis financiero. La base de datos del proyecto no se implementó en OCI, sino en MySQL sobre Railway.

---

### Servicios Utilizados

#### Object Storage

Se creó un bucket con dos carpetas, correspondientes a los dos modelos del proyecto:

- `clasificacion-gastos/`: `artefactos_categoria.pkl`, `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras`.
- `clasificacion-perfil/`: `modelo_riesgo_financiero.pkl`.

El acceso se otorga mediante un Pre-Authenticated Request (PAR) a nivel de bucket, con permiso de lectura y listado de objetos habilitado, con fecha de expiración definida. Esto permite a Backend descargar cualquiera de los cuatro archivos mediante una URL, sin necesidad de credenciales de OCI.

#### Compute

Se provisionó una instancia para alojar la API REST del proyecto:

- Imagen: Ubuntu 20.04.
- Shape: `VM.Standard.E2.1.Micro`.
- Red: VCN y subnet pública propias, con IP pública asignada.
- Puerto 8080 habilitado en la Security List para el tráfico entrante de la API.
- Acceso mediante autenticación por clave SSH (usuario `ubuntu`).

#### Functions

No se implementó. El procesamiento se resuelve desde la API alojada en Compute, sin necesidad de funciones serverless para este proyecto.

#### Base de Datos (Opcional)

No se implementó en OCI. La base de datos del proyecto (MySQL) se aloja en Railway.

---

### Despliegue

1. Creación del bucket en Object Storage y organización de los artefactos en dos carpetas.
2. Generación del Pre-Authenticated Request para el acceso de Backend a los modelos.
3. Creación de la VCN y subnet pública mediante el asistente de red de OCI.
4. Provisión de la instancia Compute (Ubuntu) dentro de esa red.
5. Apertura del puerto 8080 en la Security List para permitir el acceso público a la API.
6. Entrega de credenciales de acceso (IP pública, clave SSH) al equipo de Backend para el despliegue de la API sobre la instancia.

---

### Seguridad

- El acceso a los modelos en Object Storage se realiza mediante un Pre-Authenticated Request con permisos limitados a lectura y listado, y con expiración definida, en lugar de exponer credenciales permanentes de la cuenta.
- El acceso a la instancia Compute se realiza mediante autenticación por clave SSH, sin contraseña.
- El puerto habilitado en la Security List se limita al necesario para el funcionamiento de la API (8080).

---

## Integración con otras áreas

### Backend

Backend accede a los modelos entrenados a través del Pre-Authenticated Request de Object Storage, y despliega la API REST sobre la instancia de Compute provista, utilizando el acceso SSH entregado.

### Ciencia de Datos

Los artefactos alojados en Object Storage corresponden a los modelos entrenados y serializados por el equipo de Ciencia de Datos: el clasificador de perfil financiero (`modelo_riesgo_financiero.pkl`) y el clasificador de gastos (`artefactos_categoria.pkl`, `modelo_categoria_full.keras`, `modelo_categoria_reducido.keras`).

---

## Infraestructura

- **Object Storage:** 1 bucket, 2 carpetas, 4 archivos, acceso mediante PAR.
- **Compute:** 1 instancia (Ubuntu, VM.Standard.E2.1.Micro), IP pública, puerto 8080 habilitado.
- **Red:** 1 VCN con subnet pública, creada específicamente para el proyecto.

---

## Herramientas y Tecnologías Utilizadas

- Oracle Cloud Infrastructure (OCI): Object Storage, Compute, Networking (VCN, Security Lists).
- SSH para el acceso a la instancia.
- Ubuntu 20.04 como sistema operativo de la instancia.

---

## Mejoras Futuras

- No se realizaron más modificaciones.

---

## Equipo Responsable

- **Matías Bueno** – Data Engineer
