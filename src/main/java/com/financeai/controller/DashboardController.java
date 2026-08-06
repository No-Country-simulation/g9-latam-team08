package com.financeai.controller;

import com.financeai.dto.*;
import com.financeai.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/{userId}")
    public ResponseEntity<DashboardDTO> getDashboard(@PathVariable Long userId) {
        try {
            DashboardDTO dashboard = dashboardService.getDashboard(userId);
            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{userId}/metrics")
    public ResponseEntity<DashboardMetricsDTO> getMetrics(@PathVariable Long userId) {
        try {
            DashboardMetricsDTO metrics = dashboardService.calculateMetrics(
                new com.financeai.entity.Usuario()
            );
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
