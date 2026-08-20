package com.financeai.dto;

public class MonthlyEvolutionDTO {
    private String month;
    private Double income;
    private Double expenses;

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    public Double getIncome() { return income; }
    public void setIncome(Double income) { this.income = income; }
    public Double getExpenses() { return expenses; }
    public void setExpenses(Double expenses) { this.expenses = expenses; }
}