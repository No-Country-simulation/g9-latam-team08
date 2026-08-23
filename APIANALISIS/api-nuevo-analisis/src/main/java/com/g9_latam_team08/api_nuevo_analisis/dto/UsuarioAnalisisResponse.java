package com.g9_latam_team08.api_nuevo_analisis.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UsuarioAnalisisResponse(

        @JsonAlias("ingreso_mensual")
        Long ingresoMensual,

        @JsonAlias("gastos_totales_del_mes")
        Long gastosTotalesDelMes,

        @JsonAlias("ahorro_mensual")
        Long ahorroMensual,

        @JsonAlias("ahorro_total")
        Long ahorroTotal,

        @JsonAlias("ratio_ahorro_neto")
        Double ratioAhorroNeto,

        @JsonAlias("ratio_endeudamiento_dti")
        Double ratioEndeudamientoDti,

        @JsonAlias("gastos_esenciales_ratio")
        Double gastosEsencialesRatio,

        @JsonAlias("gastos_estilo_vida_ratio")
        Double gastosEstiloVidaRatio,

        @JsonAlias("meses_supervivencia")
        Integer mesesSupervivencia,

        @JsonAlias("perfil_financiero")
        String perfilFinanciero
){
}