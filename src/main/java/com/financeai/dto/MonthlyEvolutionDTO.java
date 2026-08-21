package com.financeai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MonthlyEvolutionDTO {

    @JsonProperty("month")
    private String month;

    @JsonProperty("ingresos")
    private Double ingresos;

    @JsonProperty("gastos")
    private Double gastos;

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    public Double getIngresos() { return ingresos; }
    public void setIngresos(Double ingresos) { this.ingresos = ingresos; }
    public Double getGastos() { return gastos; }
    public void setGastos(Double gastos) { this.gastos = gastos; }
}
