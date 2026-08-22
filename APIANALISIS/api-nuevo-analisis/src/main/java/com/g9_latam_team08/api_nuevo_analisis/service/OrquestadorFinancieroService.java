package com.g9_latam_team08.api_nuevo_analisis.service;

import com.g9_latam_team08.api_nuevo_analisis.dto.AnalisisPayload;
import com.g9_latam_team08.api_nuevo_analisis.dto.AnalisisResponse;
import com.g9_latam_team08.api_nuevo_analisis.dto.RespuestaRecomendacionesIA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class OrquestadorFinancieroService {

    private final RestClient restClient;
    private static final Logger logger = LoggerFactory.getLogger(OrquestadorFinancieroService.class);
    private final AsesorFinancieroIA asesorIA;

    public OrquestadorFinancieroService(RestClient restClient, AsesorFinancieroIA asesorIA) {
        this.asesorIA = asesorIA;
        this.restClient = restClient;
    }

    public AnalisisResponse procesarYEnriquecer(AnalisisPayload payloadFrontend) {

        String resumenString;
        String gastosString;
        AnalisisResponse respuestaPython;

        try {
            String API_DESTINO_URL = "http://146.181.60.43:8080/api/usuarios/analisis";

            respuestaPython = restClient.post()
                    .uri(API_DESTINO_URL)
                    .body(payloadFrontend)
                    .retrieve()
                    .body(AnalisisResponse.class);


            resumenString = respuestaPython.summary() != null ? respuestaPython.summary().toString() : "Sin datos";
            gastosString = respuestaPython.expenses() != null ? respuestaPython.expenses().toString() : "Sin datos";

        } catch (Exception e) {
            logger.error("Error comunicándose con la API de análisis: {}", e.getMessage(), e);
            throw new RuntimeException("No se pudo obtener el análisis. Intente de nuevo.");
        }

        List<AnalisisResponse.Recommendation> recomendacionesGemini = null;
        try {
            RespuestaRecomendacionesIA respuestaIA = asesorIA.generarRecomendaciones(resumenString, gastosString);

            recomendacionesGemini = respuestaIA.recomendaciones();

        } catch (Exception e) {
            logger.error("Error con Gemini, devolviendo lista vacía", e);
            recomendacionesGemini = List.of(); // Fallback de seguridad
        }

        logger.info("3. Ensamblando JSON final para el Frontend...");

        System.out.println(recomendacionesGemini);

        return new AnalisisResponse(
                respuestaPython.analysisId(),
                respuestaPython.generatedAt(),
                respuestaPython.analyzedPeriod(),
                respuestaPython.summary(),
                respuestaPython.expenses(),
                recomendacionesGemini,
                respuestaPython.topInsights()
        );
    }
}