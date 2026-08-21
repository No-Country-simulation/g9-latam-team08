package com.financeai.service;

import com.financeai.dto.DashboardDTO;
import com.financeai.dto.DashboardMetricsDTO;
import com.financeai.entity.Usuario;

public interface DashboardService {
    DashboardDTO getDashboard(Long userId);
    DashboardMetricsDTO calculateMetrics(Usuario user);
    void checkAlerts(Usuario user);
    void generateRecommendations(Usuario user);
}
