package com.g9_latam_team08.api_nuevo_analisis.dto;

public record PerfilResponse(
    double ingreso_mensual,
    double gastos_totales_del_mes,
    double ahorro_mensual,
    double ahorro_total,
    double ratio_ahorro_neto,
    double ratio_endeudamiento_dti,
    double gastos_esenciales_ratio,
    double gastos_estilo_vida_ratio,
    double meses_supervivencia,
    double perfil_financiero
) {
}
