package com.financeai.dto;

import java.util.List;

public class DashboardDTO {
    private DashboardMetricsDTO metrics;
    private List<ExpenseByCategoryDTO> expensesByCategory;
    private List<MonthlyEvolutionDTO> monthlyEvolution;
    private List<TransactionDTO> recentTransactions;
    private List<AlertDTO> alerts;
    private List<RecommendationDTO> recommendations;

    public DashboardMetricsDTO getMetrics() { return metrics; }
    public void setMetrics(DashboardMetricsDTO metrics) { this.metrics = metrics; }
    public List<ExpenseByCategoryDTO> getExpensesByCategory() { return expensesByCategory; }
    public void setExpensesByCategory(List<ExpenseByCategoryDTO> expensesByCategory) { this.expensesByCategory = expensesByCategory; }
    public List<MonthlyEvolutionDTO> getMonthlyEvolution() { return monthlyEvolution; }
    public void setMonthlyEvolution(List<MonthlyEvolutionDTO> monthlyEvolution) { this.monthlyEvolution = monthlyEvolution; }
    public List<TransactionDTO> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<TransactionDTO> recentTransactions) { this.recentTransactions = recentTransactions; }
    public List<AlertDTO> getAlerts() { return alerts; }
    public void setAlerts(List<AlertDTO> alerts) { this.alerts = alerts; }
    public List<RecommendationDTO> getRecommendations() { return recommendations; }
    public void setRecommendations(List<RecommendationDTO> recommendations) { this.recommendations = recommendations; }
}