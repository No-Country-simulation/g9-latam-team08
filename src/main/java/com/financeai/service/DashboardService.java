package com.financeai.service;

import com.financeai.dto.DashboardDTO;
import com.financeai.dto.DashboardMetricsDTO;
import com.financeai.entity.User;

public interface DashboardService {
    DashboardDTO getDashboard(Long userId);
    DashboardMetricsDTO calculateMetrics(User user);
    void checkAlerts(User user);
    void generateRecommendations(User user);
}