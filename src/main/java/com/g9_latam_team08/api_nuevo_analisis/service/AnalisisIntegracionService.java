package com.g9_latam_team08.api_nuevo_analisis.service;

import com.g9_latam_team08.api_nuevo_analisis.dto.PerfilRequest;
import com.g9_latam_team08.api_nuevo_analisis.dto.PerfilResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AnalisisIntegracionService {
    private final RestClient restClient;
    private static final Logger logger = LoggerFactory.getLogger(AnalisisIntegracionService.class);

    public AnalisisIntegracionService(RestClient restClient) {
        this.restClient = restClient;
    }

    public PerfilResponse obtenerAnalisis(PerfilRequest requestDatos) {
        try {
            String API_DESTINO_URL = "http://localhost:8080/analisis";
            return restClient.post()
                    .uri(API_DESTINO_URL)
                    .body(requestDatos)
                    .retrieve()
                    .body(PerfilResponse.class);

        } catch (Exception e) {
            logger.error("Error comunicándose con la API de análisis: {}", e.getMessage(), e);
            throw new RuntimeException("No se pudo obtener el análisis. Intente de nuevo.");
        }
    }
}
