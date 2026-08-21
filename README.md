# 🚀 API Orquestador Financiero (BFF)

Este proyecto es un backend construido con **Java y Spring Boot** que actúa como un Orquestador (Backend For Frontend - BFF).

Su objetivo principal es recibir los datos financieros del usuario desde el frontend, delegar los cálculos a una API REST externa (la cual interactúa internamente con modelos de Python), y finalmente **enriquecer los resultados utilizando Inteligencia Artificial Generativa (Google Gemini)** para proveer recomendaciones accionables, devolviendo una respuesta unificada.

## 🏗️ Arquitectura y Flujo de Datos

1. **Frontend** envía el perfil y transacciones del usuario.
2. **Spring Boot (Orquestador)** recibe la petición y la envía a una **API REST principal**.
3. **API REST / Python:** Esta API externa procesa la petición delegando el trabajo a un motor en **Python** que realiza los cálculos estadísticos, clasifica gastos y evalúa el riesgo financiero. Una vez procesado, la API devuelve el JSON con los resultados a nuestro Spring Boot.
4. **Spring Boot** toma esos resultados y, utilizando **LangChain4j**, se comunica con la API de **Google Gemini**.
5. **Gemini** analiza los datos y genera 3 recomendaciones financieras personalizadas.
6. **Spring Boot** fusiona la respuesta matemática original con las recomendaciones generadas por la IA y entrega un único JSON estructurado y completo al Frontend.

## 🛠️ Tecnologías Utilizadas

*   **Java 21**
*   **Spring Boot 3.x** (Web, RestClient)
*   **LangChain4j** (Framework de integración IA)
*   **Google Gemini AI** (Modelo `gemini-3.5-flash-lite`)
*   **Lombok** (Opcional, para reducir código boilerplate)
---

## ⚙️ Configuración y Puesta en Marcha

### 1. Variables de Entorno
Antes de ejecutar la aplicación, debes configurar tu clave de API de Gemini y la URL de la API externa. Crea o edita el archivo `src/main/resources/application.properties`:

```properties
# Puerto de esta aplicación
server.port=8084

# Clave de la API de Google Gemini (AI Studio)
gemini.api.key=TU_API_KEY_AQUI

# URL de la API REST externa encargada del análisis
api.destino.url=http://localhost:8080/analisis

