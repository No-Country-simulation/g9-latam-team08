package com.financeai.service;

import com.financeai.dto.AlertDTO;
import com.financeai.entity.Alerta;
import java.util.List;

public interface AlertService {
    List<AlertDTO> getUserAlerts(Long userId);
    List<AlertDTO> getUnreadAlerts(Long userId);
    AlertDTO markAsRead(Long alertId);
    void createAlert(Long userId, String title, String message, Alerta.AlertType type);
}
