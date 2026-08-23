package com.g9_latam_team08.api_nuevo_analisis.dto;

public record UsuarioAnalisisRequest(
        Double ingresoMensualFijo,
        Double ingresoMensualVariable,
        Double gastosEsenciales,
        Double gastosNoEsenciales,
        Double cuotasDeuda,
        Double ahorroPrevio
) {
}


