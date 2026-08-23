package com.g9_latam_team08.api_nuevo_analisis.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
public record UsuarioAnalisisRequest(
        @JsonProperty("ingreso_mensual_fijo")
        Double ingresoMensualFijo,

        @JsonProperty("ingreso_mensual_variable")
        Double ingresoMensualVariable,

        @JsonProperty("gastos_esenciales")
        Double gastosEsenciales,

        @JsonProperty("gastos_no_esenciales")
        Double gastosNoEsenciales,

        @JsonProperty("cuotas_deuda")
        Double cuotasDeuda,

        @JsonProperty("ahorro_previo")
        Double ahorroPrevio
) {
}


