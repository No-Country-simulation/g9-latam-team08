package com.g9_latam_team08.api_nuevo_analisis.service;

import com.g9_latam_team08.api_nuevo_analisis.dto.RespuestaRecomendacionesIA;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface AsesorFinancieroIA {

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
}