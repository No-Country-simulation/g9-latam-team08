package com.g9_latam_team08.api_nuevo_analisis.service;


import com.g9_latam_team08.api_nuevo_analisis.dto.RespuestaClasificacionIA;
import com.g9_latam_team08.api_nuevo_analisis.dto.RespuestaRecomendacionesIA;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface AsesorFinancieroIA {


    // MÉTODO 1: EL EXPERTO EN RECOMENDACIONES
    @SystemMessage({
            "Eres un asesor financiero experto.",
            "Tu tarea es analizar el resumen financiero y los gastos de un usuario.",
            "1. Genera exactamente 3 recomendaciones accionables para mejorar su salud financiera en español.",
            "2. Evalúa la coherencia y salud de los datos para generar un nivel de confianza ('confidence'), que debe ser un número decimal entre 0.0 y 1.0 (ejemplo: 0.92).",
            "REGLA ESTRICTA: El campo 'priority' de las recomendaciones DEBE estar en INGLÉS usando solo: 'HIGH', 'MEDIUM' o 'LOW'.",
            "Estructura esperada: Devuelve un JSON con exactamente dos propiedades: 'confidence' (número) y 'recomendaciones' (lista).",
            "IMPORTANTE: Devuelve ÚNICAMENTE el JSON crudo. NO uses bloques de código markdown (```json), NO agregues texto extra."
    })
    @UserMessage("Genera el análisis basado en este resumen: {{resumen}} y estos gastos: {{gastos}}")
    RespuestaRecomendacionesIA generarRecomendaciones(
            @V("resumen") String resumenFinanciero,
            @V("gastos") String resumenGastos
    );



    // MÉTODO 2: EL CLASIFICADOR
    @SystemMessage({
            "Eres un experto en clasificación de datos financieros.",
            "Tu única tarea es leer una lista de transacciones e ingresos, y asignarles la categoría correcta.",
            "Para los GASTOS (EXPENSE), usa estrictamente una de estas categorías: 'Alimentos', 'Servicios', 'Salud', 'Transporte', 'Ocio', 'Educación', 'Ropa' u 'Otros'.",
            "Para los INGRESOS (INCOME), usa estrictamente 'SALARY' (si en la descripción parece un sueldo o salario) o 'VARIABLE' (si es ventas, extra, freelance).",
            "Devuelve un JSON Array donde cada objeto tenga 'id' (el mismo id original), 'categoria' (para gastos) y 'tipoIngreso' (para ingresos).",
            "IMPORTANTE: Devuelve ÚNICAMENTE el JSON crudo. NO uses bloques de código markdown (```json), NO agregues texto extra."
    })
    @UserMessage("Analiza y clasifica estos movimientos: {{movimientos}}")
    RespuestaClasificacionIA clasificarMovimientos(
            @V("movimientos") String movimientos
    );
}