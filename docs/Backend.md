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

---
#### Métodos HTTP

Uso de métodos estándar (GET, POST, etc.) según la acción requerida.


#### Validación de Datos

Reglas implementadas para asegurar la integridad de la información recibida en las peticiones.

#### Manejo de Errores

Control de respuestas del servidor ante fallos o datos incorrectos.

---

### Integración con Base de Datos

Mapeo relacional de entidades en User, Transaction, Category y Alert, mediante JPA para almacenar de forma persistente la información financiera y recuperarla mediante consultas optimizadas en los repositorios.
En base a su persistencia Se apoya en mapeo relacional de entidades (User, Transaction, Category y Alert) mediante Spring Data JPA.

Utiliza MySQL/Railway como base de datos de producción en la nube e H2 Database para entornos locales y de pruebas.
---

### Seguridad

Configuración de seguridad mediante Spring Security  el cual se encarga de proteger los endpoints de la API en el backend mediante un sistema de filtros que intercepta cada petición HTTP, verifica la autenticidad y validez del token JWT enviado por el cliente, y asegura que solo los usuarios autorizados tengan acceso a los recursos y datos protegidos de la aplicación.

**JWT/JSON Web Token** funciona como un pase digital seguro y firmado que contiene la identidad y los permisos del usuario; el backend lo genera al iniciar sesión correctamente y el frontend lo reenvía en cada solicitud HTTP subsiguiente para demostrar quién es, permitiendo que el servidor verifique su autenticidad al instante sin necesidad de almacenar sesiones activas en su memoria.


### Pruebas

Pruebas unitarias y de integración locales para validar el correcto funcionamiento de los controladores y repositorios mediante compilaciones limpias con Maven, así como el uso de Postman y Swagger en /swagger-ui.html, para las pruebas de endpoints.

---

## Integración con otras áreas

### Ciencia de Datos

El componente Backend integra los servicios desarrollados por el área de Ciencia de Datos conectado a través de ml.service.url=http://localhost:5000, permitiendo recibir resultados analíticos como categorías predichas, niveles de confianza y alertas de salud financiera para estructurarlos y despacharlos de forma eficiente hacia el panel del cliente.


### Frontend

La integración entre el frontend (React) y el backend (Spring Boot) en FinanceAI opera mediante una arquitectura de API REST que intercambia información estructurada en formato JSON, cuyo flujo inicia cuando el usuario ingresa sus credenciales en el cliente para obtener un token JWT que autentica todas las peticiones posteriores; a partir de ahí, el frontend guía al usuario mediante un asistente paso a paso para la carga de datos financieros y transacciones manuales, enviando esta información a la API del servidor para que gestione la lógica de negocio, coordine el procesamiento automático y de clasificación inteligente con el motor de IA en la nube, y finalmente devuelva los resultados estructurados necesarios para alimentar dinámicamente las tarjetas de métricas, gráficos interactivos y recomendaciones del panel de control. 
Opera mediante una arquitectura de API REST que intercambia información estructurada en formato JSON con la aplicación en React.

El flujo inicia autenticando al usuario mediante un token JWT, permitiéndole enviar datos financieros mediante un asistente paso a paso para alimentar dinámicamente las tarjetas de métricas, gráficos interactivos y recomendaciones del panel de control.

---

## Infraestructura

### Oracle Cloud Infrastructure (OCI)

-**Despliegue Híbrido de Microservicios:** El backend en Spring Boot y el microservicio de Python (ml-service/) están diseñados para ejecutarse como servicios independientes que pueden empaquetarse en contenedores y desplegarse en instancias de computación o clusters en la nube de OCI.  


**Comunicación Interna:** El backend utiliza componentes de servicio como MlServiceImpl.java para conectarse y comunicarse con el servicio de Machine Learning ubicado en ml-service/app.py, el cual procesa los cálculos financieros y scores que se muestran en el frontend.  


**Configuración del Entorno:** Los parámetros de conexión de red, URLs de servicios y credenciales de bases de datos para este entorno en la nube se gestionan típicamente a través del archivo de propiedades del backend en src/main/resources/application.properties.  

**OCI Compute para despliegue de Backend en APIRest Java:** Se configuró y desplegó el Backend desde la instancia OCI y se encuentra operativa para manejar los datos y el análisis de la solución con configuración en Linux imagen Ubuntu.

---

## Herramientas y Tecnologías Utilizadas

- **Java 25** - Lenguaje de programación 
- **Spring Boot 3.5+** - Framework
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
