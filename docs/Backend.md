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

```

backend/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── financeai/
    │   │           ├── FinanceAiApplication.java
    │   │           ├── config/
    │   │           │   ├── DataInitializer.java
    │   │           │   └── SecurityConfig.java
    │   │           ├── controller/
    │   │           │   ├── AlertController.java
    │   │           │   ├── CategoryController.java
    │   │           │   ├── DashboardController.java
    │   │           │   ├── TransactionController.java
    │   │           │   └── UserController.java
    │   │           ├── dto/
    │   │           │   ├── AlertDTO.java
    │   │           │   ├── CreateTransactionDTO.java
    │   │           │   ├── DashboardDTO.java
    │   │           │   ├── DashboardMetricsDTO.java
    │   │           │   ├── ExpenseByCategoryDTO.java
    │   │           │   ├── MonthlyEvolutionDTO.java
    │   │           │   ├── RecommendationDTO.java
    │   │           │   └── TransactionDTO.java
    │   │           ├── entity/
    │   │           │   ├── Alerta.java
    │   │           │   ├── Categoria.java
    │   │           │   ├── Transaccion.java
    │   │           │   └── Usuario.java
    │   │           ├── repository/
    │   │           │   ├── AlertRepository.java
    │   │           │   ├── CategoryRepository.java
    │   │           │   ├── TransactionRepository.java
    │   │           │   └── UserRepository.java
    │   │           └── service/
    │   │               ├── AlertService.java
    │   │               ├── CategoryService.java
    │   │               ├── DashboardService.java
    │   │               ├── MlService.java
    │   │               ├── TransactionService.java
    │   │               ├── UserService.java
    │   │               └── impl/
    │   │                   ├── AlertServiceImpl.java
    │   │                   ├── CategoryServiceImpl.java
    │   │                   ├── DashboardServiceImpl.java
    │   │                   ├── MlServiceImpl.java
    │   │                   ├── TransactionServiceImpl.java
    │   │                   └── UserServiceImpl.java
    └── resources/
        └── application.properties

```

---

### API REST

#### Endpoints

Rutas expuestas para gestionar usuarios, transacciones, categorías, alertas y las métricas globales del dashboard.

## Endpoints principales

### Usuarios

**Registrar un usuario**

```text
URL: /users
Método: POST
```
**Descripción:** Crea un nuevo usuario en el sistema.


**Obtener un usuario por ID**

```text
URL: /users/{userId}
Método: GET
```
**Descripción:** Recupera la información detallada de un usuario específico mediante su ID.


**Buscar usuario por correo**

```text
URL: /users/email/{email}
Método: GET
```
**Descripción:** Busca un usuario en el sistema utilizando su dirección de correo electrónico.

**Actualizar datos básicos**

```text
URL: /users/{userId}
Método: PUT
```
**Descripción:** Actualiza la información personal básica de un usuario existente.


**Actualizar datos financieros**

```text
URL: /users/{userId}/financial
Método: PUT
```
**Descripción:** Modifica únicamente la información financiera asociada a un usuario.


**Eliminar usuario**

```text
URL: /users/{userId}
Método: DELETE
```
**Descripción:** Elimina permanentemente a un usuario del sistema.


### Transacciones

**Crear una transacción**

```text
URL: /transactions
Método: POST
```
**Descripción:** Registra un nuevo movimiento o gasto en el sistema asociado a un usuario.


**Obtener transacciones de un usuario**

```text
URL: /transactions/user/{userId}
Método: GET
```
**Descripción:** Lista todas las transacciones realizadas por un usuario específico.


**Obtener una transacción por ID**

```text
URL: /transactions/{transactionId}
Método: GET
```
**Descripción:** Recupera los detalles de una transacción única mediante su identificador.


**Eliminar una transacción**

```text
URL: /transactions/{transactionId}
Método: DELETE
```
**Descripción:** Borra un registro de transacción específico del sistema.


### Categorías

**Listar categorías**

```text
URL: /categories
Método: GET
```
**Descripción:** Obtiene un listado completo de las categorías disponibles para transacciones.


**Buscar categoría por nombre**

```text
URL: /categories/{name}
Método: GET
```
**Descripción:** Busca una categoría específica filtrándola por su nombre.


**Crear categoría**

```text
URL: /categories
Método: POST
```
**Descripción:** Añade una nueva categoría para clasificar gastos o ingresos.


### Alertas

**Obtener alertas de un usuario**

```text
URL: /alerts/user/{userId}
Método: GET
```
**Descripción:** Recupera todas las alertas generadas para un usuario en particular.


**Obtener alertas no leídas**

```text
URL: /alerts/user/{userId}/unread
Método: GET
```
**Descripción:** Filtra y muestra solo las notificaciones o alertas que el usuario aún no ha revisado.


**Marcar alerta como leída**

```text
URL: /alerts/{alertId}/read
Método: PUT
```
**Descripción:** Actualiza el estado de una alerta específica para marcarla como leída.


### Finanzas

**Calcular finanzas y perfil de riesgo**

```text
URL: /calcular-finanzas
Método: POST
```
**Descripción:** Procesa los ingresos, gastos y ahorros, calcula los ratios financieros correspondientes a supervivencia, endeudamiento, etc. Evalúa el perfil de riesgo mediante un modelo predictivo.


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

Pruebas unitarias y de integración locales para validar el correcto funcionamiento de los controladores y repositorios mediante compilaciones limpias con Maven, así como el uso de Postman y Swagger en /swagger-ui.html, para las pruebas de endpoints.

---

## Integración con otras áreas

### Ciencia de Datos

El componente Backend integra los servicios desarrollados por el área de Ciencia de Datos conectado a través de ml.service.url=http://localhost:5000, permitiendo recibir resultados analíticos como categorías predichas, niveles de confianza y alertas de salud financiera para estructurarlos y despacharlos de forma eficiente hacia el panel del cliente.

---

## Infraestructura

### Oracle Cloud Infrastructure (OCI)

-**Despliegue Híbrido de Microservicios:** El backend en Spring Boot y el microservicio de Python (ml-service/) están diseñados para ejecutarse como servicios independientes que pueden empaquetarse en contenedores y desplegarse en instancias de computación o clusters en la nube de OCI.  


-**Comunicación Interna:** El backend utiliza componentes de servicio como MlServiceImpl.java para conectarse y comunicarse con el servicio de Machine Learning ubicado en ml-service/app.py, el cual procesa los cálculos financieros y scores que se muestran en el frontend.  


-**Configuración del Entorno:** Los parámetros de conexión de red, URLs de servicios y credenciales de bases de datos para este entorno en la nube se gestionan típicamente a través del archivo de propiedades del backend en src/main/resources/application.properties.  


---

## Herramientas y Tecnologías Utilizadas

- **Spring Boot 3.2.0** - Framework
- **Spring Data JPA** - ORM
- **Spring Security** - Autenticación
- **MySQL/Railway** - Base de datos de producción en la nube
- **H2 Database** - Base de datos local/desarrollo usada para el desarrollo y pruebas en backend.
- **Lombok** - Reducir boilerplate
- **Maven** - Gestor de dependencias
- **Springdoc OpenAPI (Swagger)** - Su utilidad actual es tener todos los endpoints juntos para pruebas desde backend y probar el envío de datos al análisis de los modelos entrenados y pasarlos a frontend para que se visualizen.
- **JWT** - Autenticación por tokens 

---

## Equipo Responsable

Equipo: Grupo de Desarrollo del equipo 8.