package com.g9_latam_team08.api_nuevo_analisis.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UsuarioAnalisisResponse(
        Long ingresoMensual,
        Long gastosTotalesDelMes,
        Long ahorroMensual,
        Long ahorroTotal,
        Double ratioAhorroNeto,
        Double ratioEndeudamientoDti,
        Double gastosEsencialesRatio,
        Double gastosEstiloVidaRatio,
        Integer mesesSupervivencia,
        String perfilFinanciero
) {
}
