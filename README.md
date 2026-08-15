# Finance AI Dashboard

Backend RESTful API para un dashboard de análisis de salud financiera, desarrollado con Java y Spring Boot.

## ¿Qué incluye este proyecto?

Gestión de usuarios
Registro y consulta de transacciones
Dashboard con métricas financieras
Alertas automáticas
Recomendaciones personalizadas
Categorías predeterminadas para gastos

## Requisitos previos

- Java 
- Maven 
- Git

> Importante: para que el proyecto funcione correctamente, la variable `JAVA_HOME` debe apuntar a un JDK .

## Estructura del proyecto

```text
src/main/java/com/financeai/
├── config/              # Configuraciones y inicialización de datos
├── controller/          # Controladores REST
├── dto/                 # Objetos de transferencia de datos
├── entity/              # Entidades JPA
├── repository/          # Repositorios Spring Data JPA
├── service/             # Interfaces de servicios
├── service/impl/        # Implementaciones de servicios
└── FinanceAiApplication.java
```

## Configuración local

### 1. Clonar el repositorio 

```
https://github.com/No-Country-simulation/g9-latam-team08.git
```

### 2. Verificar Java y Maven

```bash
java -version
mvn -v
```

### 3. Compilar el proyecto

```bash
mvn clean install
```

### 4. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La API quedará disponible en:

```text
http://localhost:8080
```

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


###Finanzas

**Calcular finanzas y perfil de riesgo**

```text
URL: /calcular-finanzas
Método: POST
```
Descripción: Procesa los ingresos, gastos y ahorros, calcula los ratios financieros correspondientes a supervivencia, endeudamiento, etc. Evalúa el perfil de riesgo mediante un modelo predictivo.



## Ejemplos de uso

### Crear un usuario

```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"juan@example.com\",\"password\":\"123456\",\"firstName\":\"Juan\",\"lastName\":\"Pérez\"}"
```

### Crear una transacción

```bash
curl -X POST http://localhost:8080/transactions?userId=1 \
  -H "Content-Type: application/json" \
  -d "{\"description\":\"Supermercado\",\"amount\":45000,\"category\":\"Alimentación\",\"transactionDate\":\"2024-05-20T14:30:00\",\"type\":\"EXPENSE\"}"

```

## Base de datos

Por defecto el proyecto usa H2 en memoria.

La consola H2 queda disponible en:

```text
http://localhost:8080/h2-console
```

## Variables de entorno importantes

- `JAVA_HOME`: debe apuntar al JDK.
- `PATH`: debe incluir `%JAVA_HOME%\bin`.

## Troubleshooting

### Puerto ocupado

Si 8080 ya está en uso, puedes cambiarlo en `application.properties`:

```properties
server.port=8081
```

El backend está configurado para aceptar solicitudes desde:
- `http://localhost:3000`
- `http://localhost:4200`

## Logs

Los logs están configurados en `application.properties`:

```properties
logging.level.root=INFO
logging.level.com.financeai=DEBUG
```
### Error: "Table creation"
Verifica que `spring.jpa.hibernate.ddl-auto=create-drop` está en `application.properties`

### Error: "User not found"
Asegúrate de que el usuario exista antes de crear transacciones


## Build y Deployment

### Compilar JAR ejecutable

```bash
mvn clean package
```

### Ejecutar JAR

```bash
java -jar target/finance-dashboard-api-1.0.0.jar
```

## Tecnologías Utilizadas

- **Spring Boot 3.2.0** - Framework
- **Spring Data JPA** - ORM
- **Spring Security** - Autenticación
- **H2 Database** - Base de datos
- **Lombok** - Reducir boilerplate
- **Maven** - Gestor de dependencias
- **Springdoc OpenAPI (Swagger)** - Documentación interactiva de la API integrada en /swagger-ui.html.
- **JWT** - Autenticación por tokens  

## Variables de Entorno

Puedes configurar variables de entorno en `application.properties` o crear un archivo `application-prod.properties` para producción.

## Desarrollo Futuro

- [ ] Agregar dockerizacion 

---

