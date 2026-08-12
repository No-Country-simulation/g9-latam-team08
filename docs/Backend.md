# Sistema de Alerta Financiera Temprana

## Backend

---
## Objetivo

Documentar la arquitectura, implementación e integración del componente Backend desarrollado para el Sistema de Alerta Financiera Temprana, describiendo los servicios y APIs implementados, la persistencia de datos y los mecanismos de comunicación con las demás áreas del proyecto.

---

## Alcance

Este documento describe los componentes, servicios y procesos implementados por el área de Backend, abarcando la arquitectura de las APIs desarrolladas en **Spring Boot y Python/Flask**, la creación de controladores y servicios REST, la gestión de usuarios, transacciones, categorías y alertas, la persistencia de datos, las validaciones, la seguridad, las pruebas realizadas y la integración de los servicios de procesamiento financiero con **Ciencia de Datos, Frontend y Oracle Cloud Infrastructure (OCI)**.

---

## Desarrollo del Componente

### Arquitectura

> Pendiente de completar.

---

### API REST

#### Endpoints

Rutas expuestas para gestionar usuarios, transacciones, categorías, alertas y las métricas globales del dashboard.

#### Métodos HTTP

Uso de métodos estándar (GET, POST, etc.) según la acción requerida.

#### Validación de Datos

Reglas implementadas para asegurar la integridad de la información recibida en las peticiones.

#### Manejo de Errores

Control de respuestas del servidor ante fallos o datos incorrectos.

---

### Integración con Base de Datos

Mapeo relacional de entidades en User, Transaction, Category y Alert, mediante JPA para almacenar de forma persistente la información financiera y recuperarla mediante consultas optimizadas en los repositorios.

---

### Seguridad

Configuración de seguridad mediante Spring Security para proteger las rutas del sistema y asegurar el acceso controlado a los datos de los usuarios.

### Pruebas

Pruebas unitarias y de integración locales para validar el correcto funcionamiento de los controladores y repositorios mediante compilaciones limpias con Maven, así como el uso de Postman y Swagger para las pruebas de endpoints.

---

## Integración con otras áreas

### Ciencia de Datos

El componente Backend integra los servicios desarrollados por el área de Ciencia de Datos, permitiendo recibir resultados analíticos como categorías predichas, niveles de confianza y alertas de salud financiera para estructurarlos y despacharlos de forma eficiente hacia el panel del cliente.

---

## Infraestructura

### Oracle Cloud Infrastructure (OCI)

> Pendiente de implementación.

---

## Herramientas y Tecnologías Utilizadas

Lenguaje: Java

Framework: Spring Boot

Gestor de dependencias y construcción: Maven

Spring Data JPA / Hibernate

Swagger / OpenAPI (Springdoc-OpenAPI)

Control de versiones: Git y GitHub

---

## Equipo Responsable

Equipo: Grupo de Desarrollo del equipo 8.