package com.financeai.controller;

import com.financeai.dto.*;
import com.financeai.entity.Usuario;
import com.financeai.service.DashboardService;
import com.financeai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private UserService userService;

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
            Usuario usuario = userService.getUserById(userId).orElse(null);
            if (usuario == null) {
                return ResponseEntity.notFound().build();
            }
            DashboardMetricsDTO metrics = dashboardService.calculateMetrics(usuario);
            return ResponseEntity.ok(metrics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
