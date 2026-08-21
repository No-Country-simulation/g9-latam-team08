package com.financeai.service.impl;

import com.financeai.service.MlService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MlServiceImpl implements MlService {

    @Value("${ml.service.url:http://localhost:5000}")
    private String mlServiceUrl;

    private final RestTemplate restTemplate;

    public MlServiceImpl() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Object> calcularFinanzas(Map<String, Object> datosFinancieros) {
        String url = mlServiceUrl + "/calcular-finanzas";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(datosFinancieros, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, request, Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            }
        } catch (Exception e) {
            System.err.println("[MlService] Error al llamar /calcular-finanzas: " + e.getMessage());
        }

        // Si falla, devolver null para que el servicio principal use el cálculo local
        return null;
    }

    @Override
    @SuppressWarnings("unchecked")
    public String predecirCategoria(Map<String, Object> datoGasto) {
        String url = mlServiceUrl + "/predict/categoria";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(datoGasto, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, request, Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Object categoria = response.getBody().get("categoria_predicha");
                return categoria != null ? categoria.toString() : null;
            }
        } catch (Exception e) {
            System.err.println("[MlService] Error al llamar /predict/categoria: " + e.getMessage());
        }

        return null;
    }

    @Override
    public boolean isServiceAvailable() {
        String url = mlServiceUrl + "/health";

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getStatusCode() == HttpStatus.OK;
        } catch (Exception e) {
            return false;
        }
    }
}
