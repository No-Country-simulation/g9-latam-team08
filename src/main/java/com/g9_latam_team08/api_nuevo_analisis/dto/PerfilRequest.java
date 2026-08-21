package com.g9_latam_team08.api_nuevo_analisis.dto;

public record PerfilRequest(
        long id,
        double ingreso_mensual_fijo,
        double ingreso_mensual_variable,
        double gastos_esenciales_mensuales,
        double gastos_no_esenciales_mensuales,
        double cuotas_mensuales_deuda,
        double ahorro_previo
) {
}
