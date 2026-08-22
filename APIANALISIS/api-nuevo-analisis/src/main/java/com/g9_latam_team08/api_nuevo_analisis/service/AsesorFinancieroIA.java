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
            "Genera exactamente 3 recomendaciones accionables para mejorar su salud financiera.",
            "REGLA ESTRICTA: El campo 'priority' DEBE estar en INGLÉS usando solo estos valores: 'HIGH', 'MEDIUM' o 'LOW'.",
            "Devuelve un JSON con una única propiedad llamada 'recomendaciones' que contenga la lista.",
            "IMPORTANTE: Devuelve ÚNICAMENTE el JSON crudo. NO uses bloques de código markdown (```json), NO agregues texto extra."
    })
    @UserMessage("Genera las recomendaciones basadas en este resumen: {{resumen}} y estos gastos: {{gastos}}")

    RespuestaRecomendacionesIA generarRecomendaciones(
            @V("resumen") String resumenFinanciero,
            @V("gastos") String resumenGastos
    );
}