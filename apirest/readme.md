# API REST Spring Boot - Sistema de Alerta Financiera Temprana
Proyecto de No Country enfocado en desarrollar una herramienta de gestion de finanzas para usuarios.

## Descripción
Aplicación integral desarrollada para gestionar las finanzas de los usuarios, integrando un backend robusto en Spring Boot con servicios de Machine Learning basados en Python para la categorización automática de gastos y el análisis de perfiles de riesgo financiero.

## Objetivo
Brindar a los usuarios una plataforma automatizada que permita registrar y clasificar transacciones, evaluar métricas de salud económica (como ratios de endeudamiento y supervivencia) y predecir perfiles financieros mediante modelos predictivos.

## Funcionalidades principales
* **Gestión de Usuarios y Clientes Financieros:** Registro y control de datos económicos (ingresos fijos y variables, ahorros, deudas y gastos).
* **Cálculo Financiero Automatizado:** Evaluación de ratios de ahorro neto, DTI (endeudamiento), gastos esenciales, estilo de vida y meses de supervivencia.
* **Predicción de Perfil Financiero:** Integración con un modelo de Machine Learning para clasificar el perfil de riesgo del usuario.
* **Gestión de Gastos por Usuario:** Registro de transacciones individuales asociadas a cada cliente, abarcando detalles como tienda, monto, método de pago y carácter esencial.
* **Categorización Automática:** Capacidad de enviar datos de gastos para su clasificación a través de artefactos de Machine Learning hosteados en la nube.

## Herramientas y tecnologías
* Java / Spring Boot: Framework para el desarrollo de la API REST del backend.  
* Spring Data JPA / Hibernate: Mapeo objeto-relacional para la persistencia de datos.
* Python / Flask: Microservicio encargado de la ejecución de lógica financiera y modelos de Machine Learning.
* Pandas / Scikit-learn / Joblib: Procesamiento de datos y ejecución de modelos predictivos.
* MySQL: Sistema de gestión de base de datos relacional.
* Oracle Cloud Infrastructure (OCI) Object Storage: Almacenamiento en la nube para los artefactos de modelos de Machine Learning.
* Requests: Cliente HTTP para la comunicación entre servicios.


## Estructura del repositorio

```
├── apirest/                               # Proyecto principal en Spring Boot (Java)
│   ├── src/main/java/team08/apirest/
│   │   ├── controllers/                   # Controladores REST (GastoController, UsuarioController)
│   │   ├── models/                        # Entidades JPA (GastoModel, UsuarioModel)
│   │   ├── repositories/                  # Interfaces de acceso a datos (GastoRepository, UsuarioRepository)
│   │   └── services/                      # Lógica de negocio e integración (GastoService, UsuarioService)
│   └── src/main/resources/
│       └── application.properties         # Configuración de conexión y base de datos
├── app.py                                 # Microservicio en Flask (Python) para ML y cálculos
└── README.md                              # Documentación general del proyecto

```

## Documentación
### Endpoints de la API REST (Spring Boot)
### Módulo de Gastos 
**Obtener todos los gastos**

```text
URL: /api/gastos
Método:GET  
```
**Descripción:** Retorna una lista con todos los registros de gastos almacenados. 


**Registrar un nuevo gasto**
```text
URL: /api/gastos  
Método: POST  
```
**Descripción:** Guarda un nuevo gasto asociado a un cliente.


**Obtener gastos por cliente**

```text
URL: /api/gastos/cliente/{idCliente}  
Método: GET  

```
**Descripción:** Filtra y devuelve todos los gastos pertenecientes a un cliente específico mediante su ID. 

**Obtener un gasto por ID**

```text
URL: /api/gastos/{id}  
Método: GET 

``` 
**Descripción:** Busca y retorna un registro de gasto particular a través de su identificador. 

**Eliminar un gasto**

```text
URL: /api/gastos/{id}  
Método: DELETE  

```
**Descripción:** Elimina el gasto correspondiente al ID proporcionado. 


### Módulo de Usuarios / Clientes Financieros

**Obtener todos los usuarios**

```text
URL: /api/usuarios  
Método: GET 

``` 
**Descripción:** Lista todos los clientes financieros registrados.


**Registrar un usuarioURL:** 

```text
URL: /api/usuarios  
Método: POST 

``` 
**Descripción:** Envía los datos financieros del usuario al microservicio de Python (/calcular-finanzas) para procesar ratios y perfilar el riesgo antes de guardarlos en MySQL.

**Obtener usuario por ID**

```text
URL: /api/usuarios/{id}  
Método: GET 

``` 
**Descripción:** Retorna la información detallada de un usuario específico según su ID. 
 
**Eliminar usuario**

```text
URL: /api/usuarios/{id}  
Método: DELETE  

```

**Descripción:** Da de baja a un usuario del sistema mediante su identificador. 


**Filtrar usuarios por perfil financiero**

```text
URL: /api/usuarios/{perfilFinanciero}  
Método: GET  

```
**Descripción:** Permite buscar usuarios agrupados por su categoría de perfil de riesgo.

**Filtrar usuarios con meses de supervivencia activos**

```text
URL: /api/usuarios/{meses_supervivencia}  
Método: GET  

```
**Descripción:** Retorna aquellos usuarios cuyos meses de supervivencia estimados sean mayores a cero. 

## Equipo de trabajo
Equipo: Grupo de Desarrollo del equipo 8.