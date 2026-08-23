package com.g9_latam_team08.api_nuevo_analisis.service;

import com.g9_latam_team08.api_nuevo_analisis.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrquestadorFinancieroService {

    private final RestClient restClient;
    private static final Logger logger = LoggerFactory.getLogger(OrquestadorFinancieroService.class);
    private final AsesorFinancieroIA asesorIA;


    @Value("${api.destino.url}")
    private String API_DESTINO_URL;

    public OrquestadorFinancieroService(RestClient restClient, AsesorFinancieroIA asesorIA) {
        this.asesorIA = asesorIA;
        this.restClient = restClient;
    }

    public AnalisisResponse procesarYEnriquecer(AnalisisPayload payloadFrontend) {

        // 1. TRADUCIMOS lo que viene del Frontend al nuevo request de la APIREST
        logger.info("1. Mapeando datos del Frontend para Python...");
        UsuarioAnalisisRequest analisisRequest = prepararDatosParaAPI(payloadFrontend);

        // 2. Usamos el nuevo DTO para recibir los datos
        UsuarioAnalisisResponse response;

        try {
            logger.info("2. Enviando datos a la API de Python...");
            response = restClient.post()
                    .uri(API_DESTINO_URL)
                    .body(analisisRequest)
                    .retrieve()
                    .body(UsuarioAnalisisResponse.class);

        } catch (Exception e) {
            logger.error("Error comunicándose con la API de análisis: {}", e.getMessage(), e);
            throw new RuntimeException("No se pudo obtener el análisis de Python. Intente de nuevo.");
        }

        // 3. Consulta a Gemini
        List<AnalisisResponse.Recommendation> recomendacionesGemini = null;
        double confianzaIA = 0.91;

        try {
            logger.info("3. Consultando a Gemini...");
            String resumenString = response != null ? response.toString() : "Sin datos";
            String gastosString = payloadFrontend.transactions().toString();

            RespuestaRecomendacionesIA respuestaIA = asesorIA.generarRecomendaciones(resumenString, gastosString);
            recomendacionesGemini = respuestaIA.recomendaciones();

            if (respuestaIA.confidence() != null) {
                confianzaIA = respuestaIA.confidence();
            }

        } catch (Exception e) {
            logger.error("Error con Gemini, devolviendo lista vacía", e);
            recomendacionesGemini = List.of();
        }

        logger.info("4. Ensamblando JSON final para el Frontend...");

        // Calculamos los gastos usando el método interno
        AnalisisResponse.Expenses gastosCalculados = construirGastos(payloadFrontend.transactions());

        // Armamos el Summary convirtiendo los Long e Integer a Double
        AnalisisResponse.Summary summaryArmado = new AnalisisResponse.Summary(
                response.perfilFinanciero() != null ? response.perfilFinanciero() : "HEALTHY",
                0.91,
                response.ratioEndeudamientoDti() != null ? response.ratioEndeudamientoDti() : 0.0,
                response.ahorroMensual() != null ? response.ahorroMensual().doubleValue() : 0.0,
                response.mesesSupervivencia() != null ? response.mesesSupervivencia().doubleValue() : 0.0
        );

        return new AnalisisResponse(
                "analysis-" + UUID.randomUUID().toString(),
                Instant.now(),
                new AnalisisResponse.AnalyzedPeriod(LocalDate.now().withDayOfMonth(1), LocalDate.now()),
                summaryArmado,
                gastosCalculados,
                recomendacionesGemini,
                List.of()
        );
    }

    private UsuarioAnalisisRequest prepararDatosParaAPI(AnalisisPayload payload) {
        System.out.println(payload);
        double ingresosFijos = payload.financialData().incomes().stream()
                .filter(i -> "SALARY".equalsIgnoreCase(i.incomeType()))
                .mapToDouble(AnalisisPayload.Income::monthlyAmount)
                .sum();

        double ingresosVariables = payload.financialData().incomes().stream()
                .filter(i -> !"SALARY".equalsIgnoreCase(i.incomeType()))
                .mapToDouble(AnalisisPayload.Income::monthlyAmount)
                .sum();

        List<String> categoriasEsenciales = List.of("Alimentos", "Servicios", "Salud", "Transporte");

        double gastosEsenciales = payload.transactions().stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.movementType()))
                .filter(t -> t.categoryLabel() != null && categoriasEsenciales.contains(t.categoryLabel()))
                .mapToDouble(AnalisisPayload.Transaction::amount)
                .sum();

        double gastosNoEsenciales = payload.transactions().stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.movementType()))
                // Si la categoría es nula, o si no está en la lista de esenciales, cuenta como no esencial
                .filter(t -> t.categoryLabel() == null || !categoriasEsenciales.contains(t.categoryLabel()))
                .mapToDouble(AnalisisPayload.Transaction::amount)
                .sum();
        // Retornamos el nuevo DTO
        return new UsuarioAnalisisRequest(
                ingresosFijos,
                ingresosVariables,
                gastosEsenciales,
                gastosNoEsenciales,
                payload.financialData().monthlyDebtPayments(),
                payload.financialData().estimatedMonthlySavings()
        );
    }

    private AnalisisResponse.Expenses construirGastos(List<AnalisisPayload.Transaction> transacciones) {

        List<AnalisisPayload.Transaction> egresos = transacciones.stream()
                .filter(t -> "EXPENSE".equalsIgnoreCase(t.movementType()))
                .toList();

        double totalGastos = egresos.stream().mapToDouble(AnalisisPayload.Transaction::amount).sum();

        // 2. Agrupar sumas por categoría (Evitando el error del null)
        Map<String, Double> gastosPorCategoria = egresos.stream()
                .collect(Collectors.groupingBy(
                        t -> t.categoryLabel() != null ? t.categoryLabel() : "Sin Categoría", // <--- Salvavidas
                        Collectors.summingDouble(AnalisisPayload.Transaction::amount)
                ));

        String categoriaPrincipal = gastosPorCategoria.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Sin datos");

        // 4. Armar el array "byCategory" calculando el porcentaje
        List<AnalisisResponse.CategorySummary> byCategory = gastosPorCategoria.entrySet().stream()
                .map(entry -> {
                    double amount = entry.getValue();
                    double percentage = totalGastos > 0 ? (amount / totalGastos) * 100 : 0;
                    int count = (int) egresos.stream().filter(t -> {
                        String cat = t.categoryLabel() != null ? t.categoryLabel() : "Sin Categoría";
                        return cat.equals(entry.getKey());
                    }).count();
                    return new AnalisisResponse.CategorySummary(entry.getKey(), amount, percentage, count);
                }).toList();

        // 5. Mapear las transacciones al formato ClassifiedTransaction
        List<AnalisisResponse.ClassifiedTransaction> clasificadas = egresos.stream()
                .map(t -> new AnalisisResponse.ClassifiedTransaction(
                        t.id(), t.description(), t.amount(), t.date(),
                        t.categoryLabel() != null ? t.categoryLabel() : "Sin Categoría",
                        1.0, t.paymentMethod(), t.purchaseMode(), t.movementType()
                )).toList();

        return new AnalisisResponse.Expenses(
                totalGastos,
                categoriaPrincipal,
                totalGastos / 30.0,
                egresos.size(),
                byCategory,
                clasificadas,
                List.of()
        );
    }
}