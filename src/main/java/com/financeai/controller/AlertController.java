package com.financeai.controller;

import com.financeai.dto.AlertDTO;
import com.financeai.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AlertDTO>> getUserAlerts(@PathVariable Long userId) {
        try {
            List<AlertDTO> alerts = alertService.getUserAlerts(userId);
            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<AlertDTO>> getUnreadAlerts(@PathVariable Long userId) {
        try {
            List<AlertDTO> alerts = alertService.getUnreadAlerts(userId);
            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{alertId}/read")
    public ResponseEntity<AlertDTO> markAsRead(@PathVariable Long alertId) {
        try {
            AlertDTO alert = alertService.markAsRead(alertId);
            return ResponseEntity.ok(alert);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
