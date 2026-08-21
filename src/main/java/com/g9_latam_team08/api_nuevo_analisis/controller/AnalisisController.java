package com.g9_latam_team08.api_nuevo_analisis.controller;

import com.g9_latam_team08.api_nuevo_analisis.dto.PerfilRequest;
import com.g9_latam_team08.api_nuevo_analisis.dto.PerfilResponse;
import com.g9_latam_team08.api_nuevo_analisis.service.AnalisisIntegracionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nuevo-analisis")
public class AnalisisController {

    private AnalisisIntegracionService analisisService;

    public AnalisisController (AnalisisIntegracionService analisisService) {
        this.analisisService = analisisService;
    }

    @PostMapping("/procesar-perfil")
    public ResponseEntity<PerfilResponse> procesarPerfil(@RequestBody PerfilRequest requestFront) {
        PerfilResponse resultado = analisisService.obtenerAnalisis(requestFront);
        return ResponseEntity.ok(resultado);
    }

}
