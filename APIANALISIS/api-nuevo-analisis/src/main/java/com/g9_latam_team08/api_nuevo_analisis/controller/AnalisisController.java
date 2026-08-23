package com.g9_latam_team08.api_nuevo_analisis.controller;

import com.g9_latam_team08.api_nuevo_analisis.dto.AnalisisPayload;
import com.g9_latam_team08.api_nuevo_analisis.dto.AnalisisResponse;
import com.g9_latam_team08.api_nuevo_analisis.service.OrquestadorFinancieroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios/analisis")
@CrossOrigin(origins = "*")
public class AnalisisController {

    private final OrquestadorFinancieroService analisisService;

    public AnalisisController (OrquestadorFinancieroService analisisService) {
        this.analisisService = analisisService;
    }

    @PostMapping()
    public ResponseEntity<AnalisisResponse> procesarPerfil(@RequestBody AnalisisPayload requestFront) {
        AnalisisResponse resultado = analisisService.procesarYEnriquecer(requestFront);
        return ResponseEntity.ok(resultado);
    }
}