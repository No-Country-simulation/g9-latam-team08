# Backend

## Objetivo

> Pendiente de completar.

---

## Alcance

Abarcar la creación de controladores REST, la gestión de entidades de usuarios, categorías, transacciones y alertas, así como la integración de los servicios de procesamiento de datos financieros.

## Arquitectura

> Pendiente de completar.

---

## Tecnologías Utilizadas

Java con Spring Boot ---> Framework principal.
Maven ---> Gestión de dependencias y compilación.  Spring Data JPA / Hibernate ---> Manejo de entidades y base de datos.

## Estructura del Proyecto


## API REST

### Endpoints

Endpoints: Rutas expuestas para gestionar usuarios, transacciones, categorías, alertas y las métricas globales del dashboard.

### Métodos HTTP

Métodos HTTP: Uso de métodos estándar (GET, POST, etc.) según la acción requerida.


### Validación de Datos


Validación de Datos: Reglas implementadas para asegurar la integridad de la información recibida en las peticiones.


### Manejo de Errores

Manejo de Errores: Control de respuestas del servidor ante fallos o datos incorrectos.

## Integración con Ciencia de Datos


## Integración con Base de Datos

Mapeo relacional de entidades en User, Transaction, Category, Alert, mediante JPA para almacenar de forma persistente la información financiera y recuperarla mediante consultas optimizadas en los repositorios.

## Infraestructura

### Oracle Cloud Infrastructure (OCI)

> Pendiente de implementación.

---

## Seguridad

Configuración de seguridad mediante Spring Security para proteger las rutas del sistema y asegurar el acceso controlado a los datos de los usuarios.

## Pruebas

> Pendiente de completar.

---

## Estado del Desarrollo

Módulos de backend, repositorios y controladores principales implementados y en fase de integración con las vistas del frontend.

## Mejoras Futuras

Optimización de consultas complejas para el rendimiento del dashboard.

Ampliación de las reglas de análisis financiero automático.

## Equipo Responsable

inicio (Magali)
login_usuario (Juan)
dashboard (Thiago y Leandro)
analisis (Magali Y Juan)
transacciones (Alan)
recomendaciones (Magali y Juan)
historial (Thiago y Juan)