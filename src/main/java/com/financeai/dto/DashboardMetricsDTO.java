package com.financeai.dto;

public class DashboardMetricsDTO {
    private Double monthlyIncome;
    private Double monthlyExpenses;
    private Double estimatedBalance;
    private Integer debtPercentage;
    private Double monthlySavings;
    private Double emergencyFundMonths;
    private Integer financialHealthScore;

    public Double getMonthlyIncome() { return monthlyIncome; }
    public void setMonthlyIncome(Double monthlyIncome) { this.monthlyIncome = monthlyIncome; }
    public Double getMonthlyExpenses() { return monthlyExpenses; }
    public void setMonthlyExpenses(Double monthlyExpenses) { this.monthlyExpenses = monthlyExpenses; }
    public Double getEstimatedBalance() { return estimatedBalance; }
    public void setEstimatedBalance(Double estimatedBalance) { this.estimatedBalance = estimatedBalance; }
    public Integer getDebtPercentage() { return debtPercentage; }
    public void setDebtPercentage(Integer debtPercentage) { this.debtPercentage = debtPercentage; }
    public Double getMonthlySavings() { return monthlySavings; }
    public void setMonthlySavings(Double monthlySavings) { this.monthlySavings = monthlySavings; }
    public Double getEmergencyFundMonths() { return emergencyFundMonths; }
    public void setEmergencyFundMonths(Double emergencyFundMonths) { this.emergencyFundMonths = emergencyFundMonths; }
    public Integer getFinancialHealthScore() { return financialHealthScore; }
    public void setFinancialHealthScore(Integer financialHealthScore) { this.financialHealthScore = financialHealthScore; }
}
