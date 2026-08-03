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

Lenguaje: Java

Framework: Spring Boot

Gestor de dependencias y construcción: Maven

Control de versiones: Git y GitHub

Documentación de API: Swagger / OpenAPI (Springdoc-OpenAPI)


Spring Data JPA / Hibernate ---> Manejo de entidades y base de datos.

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

Preparación de servicios lógicos capaces de recibir resultados analíticos como categorías predichas, niveles de confianza y alertas de salud financiera para estructurarlos y despacharlos de forma eficiente hacia el panel del cliente.

## Integración con Base de Datos

Mapeo relacional de entidades en User, Transaction, Category, Alert, mediante JPA para almacenar de forma persistente la información financiera y recuperarla mediante consultas optimizadas en los repositorios.

## Infraestructura

### Oracle Cloud Infrastructure (OCI)

> Pendiente de implementación.

---

## Seguridad

Configuración de seguridad mediante Spring Security para proteger las rutas del sistema y asegurar el acceso controlado a los datos de los usuarios.

## Pruebas

Pruebas unitarias y de integración locales para validar el correcto funcionamiento de los controladores y repositorios mediante compilaciones limpias con Maven, así como el uso de postman y swagger para las pruebas de endpoints.

## Estado del Desarrollo

Módulos de backend, repositorios y controladores principales implementados y en fase de integración con las vistas del frontend.

## Mejoras Futuras

Optimización de consultas complejas para el rendimiento del dashboard.

Ampliación de las reglas de análisis financiero automático.

## Equipo Responsable

- [ ] **inicio** — Magali
- [ ] **login_usuario** — Juan
- [ ] **dashboard** — Thiago y Leandro
- [ ] **analisis** — Magali Y Juan
- [ ] **transacciones** — Alan
- [ ] **recomendaciones** — Magali y Juan
- [ ] **historial** — Thiago y Juan