package com.financeai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExpenseByCategoryDTO {

    @JsonProperty("categoria_principal")
    private String categoriaPrincipal;

    @JsonProperty("monto")
    private Double monto;

    @JsonProperty("porcentaje")
    private Integer porcentaje;

    private String color;
    private String icon;

    public String getCategoriaPrincipal() { return categoriaPrincipal; }
    public void setCategoriaPrincipal(String categoriaPrincipal) { this.categoriaPrincipal = categoriaPrincipal; }
    public Double getMonto() { return monto; }
    public void setMonto(Double monto) { this.monto = monto; }
    public Integer getPorcentaje() { return porcentaje; }
    public void setPorcentaje(Integer porcentaje) { this.porcentaje = porcentaje; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
