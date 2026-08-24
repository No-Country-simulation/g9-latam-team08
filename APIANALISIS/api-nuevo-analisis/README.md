# 🚀 API Orquestador Financiero (BFF) con IA

Este proyecto es un backend construido con **Java y Spring Boot** que actúa como un Orquestador (Backend For Frontend - BFF) y enriquecedor de datos.

Su objetivo principal es recibir los datos financieros "crudos" del usuario desde el frontend, pre-procesarlos con IA para clasificarlos, delegar los cálculos matemáticos a una API REST externa (la cual interactúa con modelos de Python), y finalmente **enriquecer los resultados utilizando Inteligencia Artificial Generativa (Google Gemini)** para proveer recomendaciones accionables, devolviendo una respuesta unificada y formateada.

## ✨ Características Principales
* **Auto-Clasificación con IA:** Si el Frontend envía transacciones sin categorizar, el BFF utiliza Gemini para analizar la descripción (ej: "carne", "internet") y asignar automáticamente la categoría correcta antes de realizar cálculos.
* **Tolerancia a Fallos y Manejo de Nulos:** Arquitectura resiliente que previene caídas del sistema ante la ausencia de datos en el payload original.
* **Adaptabilidad de Contratos (DTOs):** Uso avanzado de anotaciones de Jackson (`@JsonAlias`, `@JsonProperty`) para traducir automáticamente las respuestas `snake_case` de la APIRESTcls a variables `camelCase` en Java.
* **Formateo de Precisión:** Cálculos estadísticos y porcentajes redondeados matemáticamente a dos decimales para una renderización limpia en la interfaz de usuario.

## 🏗️ Arquitectura y Flujo de Datos

1. **Frontend** envía el perfil y transacciones del usuario (incluso si carecen de etiquetas de categoría).
2. **Spring Boot (Orquestador - Fase 1):** Intercepta los datos y consulta a **Google Gemini** para que clasifique inteligentemente los ingresos y gastos crudos.
3. **Mapeo y Cálculo Previo:** El BFF reconstruye el JSON con los datos limpios, suma los montos por categoría y adapta el formato al contrato esperado por la API externa.
4. **API REST / Python:** Esta API externa procesa la petición delegando el trabajo a un motor en **Python** que realiza los cálculos estadísticos y evalúa el riesgo financiero. Devuelve los resultados a nuestro Spring Boot.
5. **Spring Boot (Orquestador - Fase 2):** Toma los resultados matemáticos y consulta nuevamente a **Google Gemini** (vía LangChain4j).
6. **Gemini** analiza el contexto financiero total y genera 3 recomendaciones personalizadas y priorizadas.
7. **Respuesta Unificada:** Spring Boot ensambla la respuesta matemática original con las recomendaciones de la IA y entrega un único JSON estructurado al Frontend.

## 🛠️ Tecnologías Utilizadas

* **Java 21**
* **Spring Boot 3.x** (Web, RestClient)
* **LangChain4j** (Framework de integración IA)
* **Google Gemini AI** (Modelo `${modelo}`)
* **Jackson** (Serialización y deserialización avanzada de JSON)
* **Lombok** (Para reducir código boilerplate)

---

## ⚙️ Configuración y Puesta en Marcha

### 1. Variables de Entorno
Antes de ejecutar la aplicación, debes configurar tu clave de API de Gemini y la URL de la API externa. Crea o edita el archivo `src/main/resources/application.properties`:

```properties
# Puerto de esta aplicación
server.port=8084

# Clave de la API de Google Gemini (AI Studio)
gemini.api.key=${GEMINI_API_KEY}

# Modelo de GEMINI
modelo=${GEMINI_MODEL}

# URL de la API REST externa encargada del análisis
api.destino.url=${API_DESTINO}

```

## 📖 Documentación del Endpoint
Generar Análisis Financiero y Recomendaciones

Procesa los ingresos, deudas y transacciones de un usuario para generar un reporte de salud financiera con recomendaciones de IA.

- URL: /api/usuarios/analisis

- Método HTTP: POST

- Content-Type: application/json


### Ejemplo de Petición (Request Body)

```
{
  "financialData": {
    "incomes": [
      {
        "id": "income-1",
        "description": "Sueldo",
        "monthlyAmount": 800000,
        "incomeType": "SALARY"
      }
    ],
    "estimatedMonthlySavings": 100000,
    "monthlyDebtPayments": 150000,
    "emergencyFundAmount": 300000,
    "savingsFrequency": "MONTHLY"
  },
  "transactions": [
    {
      "id": "transaction-1",
      "description": "Supermercado",
      "amount": 45000,
      "date": "2026-08-10",
      "paymentMethod": "DEBIT",
      "purchaseMode": "PHYSICAL",
      "movementType": "EXPENSE",
      "categoryLabel": "Alimentos"
    }
  ]
}
```

### Ejemplo de Respuesta (Response)

El endpoint devolverá un estado 200 OK con la información procesada por la API externa y el bloque de recommendations inyectado por Gemini.

```
{
  "analysisId": "analysis-123",
  "generatedAt": "2026-08-21T15:00:00.000Z",
  "analyzedPeriod": {
    "from": "2026-08-01",
    "to": "2026-08-20"
  },
  "summary": {
    "financialProfile": "HEALTHY",
    "confidence": 0.91,
    "debtLevel": 18.75,
    "monthlyMargin": 250000,
    "emergencyCoverageMonths": 2.4
  },
  "expenses": {
    "totalExpenses": 550000,
    "mainCategory": "Alimentos",
    "dailyAverage": 27500,
    "transactionsCount": 15
  },
  "recommendations": [
    {
      "id": "recommendation-1",
      "title": "Reducir gastos variables",
      "summary": "Revisá los gastos de mayor frecuencia.",
      "priority": "MEDIUM",
      "explanation": "Esta categoría concentra una parte importante del gasto.",
      "recommendedActions": [
        "Definir un límite mensual",
        "Revisar compras recurrentes"
      ],
      "potentialImpact": "Mejorar el margen mensual",
      "currentSituation": "Los gastos variables son elevados.",
      "target": "Reducirlos un 10%"
    }
  ],
  "topInsights": []
}
```