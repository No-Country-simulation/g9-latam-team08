# g9-latam-team08

Proyecto de No Country enfocado en desarrollar una herramienta de gestión de finanzas para usuarios.

## Frontend

La base inicial del frontend vive en [frontend](./frontend) y contiene la landing pública del MVP de FinanceAI.

# 📖 Documentación de API - FinanceAI

Este documento detalla la integración entre el Frontend (React) y la API REST (Spring Boot) para los módulos principales de la plataforma: **Autenticación** e **Historial de Transacciones**.

---

## 🔐 Módulo 1: Autenticación y Autorización

El sistema soporta un enfoque de autenticación híbrido. Los usuarios pueden registrarse e iniciar sesión utilizando credenciales tradicionales (correo y contraseña) o delegando su identidad a través de **Google Sign-In**. En ambos casos, el sistema asegura las sesiones internas emitiendo un **JWT (JSON Web Token)** que el Frontend almacena en su `localStorage`.

### 1. Registro Tradicional

Crea una nueva cuenta de usuario en la base de datos de FinanceAI. Las contraseñas son encriptadas (ej. con BCrypt) antes de ser persistidas.

- **Endpoint:** `POST /api/auth/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body Request:**
  ```json
  {
    "nombre": "Carlos Martinez",
    "email": "carlos@example.com",
    "password": "PasswordSegura123!"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "mensaje": "Usuario registrado con éxito"
  }
  ```
- **Códigos de Error:**
  - `400 Bad Request`: Datos incompletos o inválidos (ej. contraseña muy corta).
  - `409 Conflict`: El correo electrónico ya se encuentra registrado.

### 2. Login Tradicional

Valida las credenciales del usuario y devuelve un token de acceso JWT.

- **Endpoint:** `POST /api/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body Request:**
  ```json
  {
    "email": "carlos@example.com",
    "password": "PasswordSegura123!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "106",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdW...",
    "nombre": "Carlos Martinez",
    "email": "carlos@example.com"
  }
  ```
- **Códigos de Error:**
  - `401 Unauthorized`: Correo no encontrado o contraseña incorrecta.

### 3. Autenticación con Google (Token Exchange)

Inicia sesión o registra a un nuevo usuario (de forma transparente) validando su credencial temporal entregada por Google.

- **Endpoint:** `POST /api/auth/google`
- **Headers:**
  - `Content-Type: application/json`
- **Body Request:**
  ```json
  {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZ..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "105",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdW...",
    "nombre": "Juan Manuel",
    "email": "juan@example.com"
  }
  ```
- **Códigos de Error:**
  - `401 Unauthorized`: Token de Google inválido, expirado o malformado.

---

## 📊 Módulo 2: Historial de Transacciones

Gestión completa (Lectura, Edición y Eliminación) de los registros contables del usuario.
⚠️ **Importante:** Todos los endpoints de este módulo requieren que el usuario esté autenticado.

- **Header Obligatorio:** `Authorization: Bearer <TU_JWT_TOKEN>`

### `GET /api/transactions`

Obtiene la lista completa de movimientos asociados al usuario autenticado. (El filtrado detallado se delega al Frontend por cuestiones de rendimiento).

- **Body Request:** Ninguno.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "1",
      "description": "Compras Supermercado",
      "amount": 24500.0,
      "date": "2024-05-19",
      "category": "Comida",
      "type": "expense",
      "account": "Principal"
    },
    {
      "id": "2",
      "description": "Sueldo",
      "amount": 850000.0,
      "date": "2024-05-01",
      "category": "Todos",
      "type": "income",
      "account": "Principal"
    }
  ]
  ```

### `PUT /api/transactions/{id}`

Sobrescribe los datos de una transacción existente.

- **Parámetros:** `id` (Identificador único en la URL).
- **Headers:**
  - `Content-Type: application/json`
- **Body Request:**
  ```json
  {
    "id": "1",
    "description": "Compras Supermercado Coto",
    "amount": 28000.0,
    "date": "2024-05-19",
    "category": "Comida",
    "type": "expense",
    "account": "Principal"
  }
  ```
- **Response (200 OK):** Devuelve el objeto modificado para su actualización optimista en el Frontend.
- **Códigos de Error:**
  - `404 Not Found`: El registro no existe.
  - `403 Forbidden`: Intento de modificar una transacción ajena.

### `DELETE /api/transactions/{id}`

Elimina de forma permanente un registro financiero.

- **Parámetros:** `id` (Identificador único en la URL).
- **Body Request:** Ninguno.
- **Response:**
  - `200 OK` / `204 No Content` (Operación exitosa, sin cuerpo en la respuesta).
