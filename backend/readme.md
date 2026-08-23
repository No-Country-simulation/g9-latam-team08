# API REST - Sistema de Alerta Financiera Temprana

Proyecto backend en Spring Boot para gestionar usuarios, gastos financieros y evaluación de riesgo financiero. La solución está pensada para calcular señales tempranas de salud económica, clasificar perfiles financieros y facilitar la gestión de transacciones asociadas a cada cliente.

## Descripción general

La API permite:

- Registrar y consultar usuarios financieros.
- Registrar y consultar gastos asociados a cada usuario.
- Evaluar indicadores de salud financiera como ahorro neto, DTI, gastos esenciales y meses de supervivencia.
- Filtrar usuarios por perfil financiero.
- Integrar un cálculo adicional con un servicio Python para el análisis predictivo.

## Objetivo

Brindar una herramienta de gestión financiera para visualizar de forma rápida y estructurada la situación económica de cada usuario, detectando señales de riesgo y permitiendo una mejor toma de decisiones.

## Arquitectura de despliegue

- **Railway** aloja únicamente la base de datos MySQL.
- **OCI Compute** ejecuta únicamente el backend Spring Boot.
- OCI no necesita instalar ni ejecutar MySQL localmente.
- El backend escucha en el puerto `8080` y se conecta a Railway mediante variables de entorno.
- Las credenciales no deben guardarse en Git, en el WAR ni en este README.

## Funcionalidades principales

- Gestión de usuarios y clientes financieros.
- Registro y consulta de gastos por usuario.
- Cálculo de ratios financieros y métricas clave.
- Perfilamiento financiero por riesgo.
- Persistencia relacional en MySQL alojado en Railway.
- Arquitectura REST con Spring Boot.
- Despliegue operativo en una instancia OCI con acceso público en el puerto 8080.

## Stack tecnológico

- Java 21
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA / Hibernate
- MySQL 8
- Maven
- OCI (Oracle Cloud Infrastructure) VM
- systemd para servicio del backend

## Estructura del proyecto

```text
apirest/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── team08/apirest/
│   │   │       ├── controllers/
│   │   │       │   ├── GastoController.java
│   │   │       │   └── UsuarioController.java
│   │   │       ├── models/
│   │   │       │   ├── GastoModel.java
│   │   │       │   └── UsuarioModel.java
│   │   │       ├── repositories/
│   │   │       │   ├── GastoRepository.java
│   │   │       │   └── UsuarioRepository.java
│   │   │       ├── services/
│   │   │       │   ├── GastoService.java
│   │   │       │   └── UsuarioService.java
│   │   │       ├── ApirestApplication.java
│   │   │       └── ServletInitializer.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/team08/apirest/ApirestApplicationTests.java
├── pom.xml
├── mvnw
├── mvnw.cmd
├── readme.md
├── .mvn/wrapper/maven-wrapper.properties
└── .gitignore
```

## Requisitos de ejecución

- Java 21
- Maven
- Acceso a la base de datos MySQL en Railway
- Acceso SSH a la infraestructura OCI si se desea desplegar en servidor
- Clave SSH privada para OCI, fuera del repositorio

## Configuración local

Archivo principal:

```properties
spring.application.name=apirest
server.address=0.0.0.0
server.port=8080

spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Para ejecución local, configura las variables sin escribir la contraseña en archivos versionados:

```bash
export SPRING_DATASOURCE_URL='jdbc:mysql://HOST:PUERTO/BASE?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC&sslMode=REQUIRED'
export SPRING_DATASOURCE_USERNAME='USUARIO'
export SPRING_DATASOURCE_PASSWORD='CONTRASENA'
```

### Ejecutar localmente

```bash
cd apirest
./mvnw clean test
./mvnw clean package -DskipTests
java -jar target/apirest-0.0.1-SNAPSHOT.war --server.port=8080
```

Las pruebas usan H2 temporal y no dependen de Railway. El empaquetado requiere Java 21.

## Despliegue en OCI

El backend quedó configurado y ejecutándose en una instancia OCI con acceso público en el puerto 8080.

### Datos de despliegue verificados

- IP pública: 146.181.60.43
- Usuario: ubuntu
- Puerto: 8080
- URL base: http://146.181.60.43:8080

### Pasos de despliegue usados

1. Crear y configurar la base de datos MySQL en Railway.
2. Instalar Java 21 y Maven en la VM de OCI.
3. Compilar el proyecto con Maven.
4. Subir el artefacto WAR a la VM.
5. Configurar las variables de conexión a Railway.
6. Crear un servicio `systemd` para arrancar la aplicación automáticamente.

### Servicio systemd

```ini
[Unit]
Description=API REST Backend
Wants=network-online.target
After=network-online.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/usr/lib/jvm/java-21-openjdk-amd64/bin/java -jar /home/ubuntu/apirest.war --server.port=8080
Restart=always
RestartSec=10
EnvironmentFile=/etc/apirest.env
StandardOutput=append:/home/ubuntu/apirest.log
StandardError=append:/home/ubuntu/apirest.log

[Install]
WantedBy=multi-user.target
```

Crear `/etc/apirest.env` directamente en OCI, sin subirlo a Git:

```ini
SPRING_DATASOURCE_URL=jdbc:mysql://HOST:PUERTO/BASE?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC&sslMode=REQUIRED
SPRING_DATASOURCE_USERNAME=USUARIO
SPRING_DATASOURCE_PASSWORD=CONTRASENA
PYTHON_SERVICE_URL=
PYTHON_ML_URL=
APP_CORS_ALLOWED_ORIGINS=*
```

Aplicar la configuración:

```bash
sudo chmod 600 /etc/apirest.env
sudo systemctl daemon-reload
sudo systemctl enable apirest
sudo systemctl restart apirest
```

Para subir una nueva versión:

```bash
scp -i /ruta/clave-oci target/apirest-0.0.1-SNAPSHOT.war ubuntu@IP_PUBLICA_OCI:/home/ubuntu/apirest.war
ssh -i /ruta/clave-oci ubuntu@IP_PUBLICA_OCI
sudo systemctl restart apirest
```

### Comandos de gestión del servicio

```bash
sudo systemctl status apirest
sudo systemctl restart apirest
sudo journalctl -u apirest -f
```

## Endpoints de la API REST

### Módulo de gastos

#### 1) Listar todos los gastos

```http
GET /api/gastos
```

#### 2) Registrar un gasto

```http
POST /api/gastos
Content-Type: application/json
```

Ejemplo de body:

```json
{
  "nombreTienda": "Supermercado",
  "subcategoria": "Alimentos",
  "monto": 1500.5,
  "metodoPago": "Tarjeta",
  "esencial": true,
  "categoriaPrincipal": "Hogar",
  "usuario": {
    "id": 1
  }
}
```

#### 3) Obtener gastos por cliente

```http
GET /api/gastos/cliente/{idCliente}
```

#### 4) Obtener gasto por ID

```http
GET /api/gastos/{id}
```

#### 5) Eliminar gasto

```http
DELETE /api/gastos/{id}
```

### Módulo de usuarios

#### 1) Listar usuarios

```http
GET /api/usuarios
```

#### 2) Registrar usuario

```http
POST /api/usuarios
Content-Type: application/json
```

Ejemplo de ejemplo:

```json
{
  "nombre": "Ana",
  "password": "123456",
  "email": "ana@email.com",
  "ingresoMensualFijo": 2500000,
  "ingresoMensualVariable": 500000,
  "ingresoMensual": 3000000,
  "gastosEsencialesMensuales": 1200000,
  "gastosNoEsencialesMensuales": 400000,
  "gastosTotalesDelMes": 1600000,
  "cuotasMensualesDeuda": 300000,
  "ahorroMensual": 700000,
  "ahorroTotal": 8000000,
  "perfilFinanciero": "Estable",
  "mesesSupervivencia": 8
}
```

#### 3) Obtener usuario por ID

```http
GET /api/usuarios/{id}
```

#### 4) Eliminar usuario

```http
DELETE /api/usuarios/{id}
```

#### 5) Filtrar usuarios por perfil financiero

```http
GET /api/usuarios/perfil/{perfilFinanciero}
```

#### 6) Filtrar usuarios con supervivencia > 0

```http
GET /api/usuarios/supervivencia-mayor-cero
```

## Observaciones del proyecto

- La aplicación utiliza JPA para mapear entidades y persistirlas en MySQL.
- La estructura de entidades incluye una relación entre `UsuarioModel` y `GastoModel`.
- La conexión a la base de datos se gestiona por Spring Boot HikariCP.
- `spring.jpa.hibernate.ddl-auto=none` conserva el esquema administrado en Railway y evita cambios automáticos en producción.
- Los importes históricos con separadores de miles, como `-1.454.888`, se normalizan mediante `FormattedLongConverter`.
- Si las URLs Python están vacías, el backend conserva el funcionamiento principal y guarda los datos sin clasificación externa.

## Problemas comunes y soluciones

### Error: Java version unsupported

Si el backend falla con `UnsupportedClassVersionError`, significa que se compiló con Java más reciente que la versión disponible en la VM.

Solución:

```bash
sudo apt-get install openjdk-21-jdk
```

Y compilar de nuevo con Java 21.

### Error de conexión con Railway

Verificar que `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` y `SPRING_DATASOURCE_PASSWORD` estén configuradas en el servicio `systemd` y que la base de datos de Railway esté disponible.

### Puerto 8080 no responde

Verificar:

```bash
sudo systemctl status apirest
sudo journalctl -u apirest -n 100 --no-pager
ss -lnt | grep 8080
curl -i http://127.0.0.1:8080/api/usuarios
```

Si la prueba interna responde `HTTP 200` pero la pública agota el tiempo, revisar la regla de entrada de OCI/NSG/Security List para `TCP 8080`. `ss` solo confirma que Java escucha localmente; no confirma que OCI permita tráfico desde Internet. También revisar `sudo ufw status verbose` y, si corresponde, `sudo ufw allow 8080/tcp`.

La IP `192.168.0.1` es la IP privada del router local, no la IP pública. Para descartar NAT loopback o bloqueo del proveedor, probar desde otra red o datos móviles.

## Equipo

Equipo 8 - Desarrollo backend y servicios financieros.

## Estado actual

El backend se ejecuta en OCI, escucha en el puerto 8080 y usa Railway como base de datos remota. El acceso externo depende de las reglas de red de OCI.