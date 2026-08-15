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

| Método | Ruta | Descripción |
|---|---|---|
| POST | /users | Crear un usuario |
| GET | /users/{userId} | Obtener un usuario por ID |
| GET | /users/email/{email} | Buscar usuario por correo |
| PUT | /users/{userId} | Actualizar datos básicos |
| PUT | /users/{userId}/financial | Actualizar datos financieros |
| DELETE | /users/{userId} | Eliminar usuario |

### Transacciones

| Método | Ruta | Descripción |
|---|---|---|
| POST | /transactions | Crear una transacción |
| GET | /transactions/user/{userId} | Obtener transacciones de un usuario |
| GET | /transactions/{transactionId} | Obtener una transacción por ID |
| DELETE | /transactions/{transactionId} | Eliminar una transacción |

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| GET | /categories | Listar categorías |
| GET | /categories/{name} | Buscar categoría por nombre |
| POST | /categories | Crear categoría |

### Alertas

| Método | Ruta | Descripción |
|---|---|---|
| GET | /alerts/user/{userId} | Obtener alertas de un usuario |
| GET | /alerts/user/{userId}/unread | Obtener alertas no leídas |
| PUT | /alerts/{alertId}/read | Marcar alerta como leída |

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

