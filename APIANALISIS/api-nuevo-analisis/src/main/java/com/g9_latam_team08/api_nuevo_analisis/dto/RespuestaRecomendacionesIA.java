package com.g9_latam_team08.api_nuevo_analisis.dto;

import java.util.List;

public record RespuestaRecomendacionesIA(
        Double confidence,
        List<AnalisisResponse.Recommendation> recomendaciones
){}