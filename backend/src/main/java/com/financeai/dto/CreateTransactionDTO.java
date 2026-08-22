package com.financeai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class CreateTransactionDTO {
    @NotBlank(message = "El nombre de tienda es requerido")
    @JsonProperty("nombre_tienda")
    private String nombreTienda;

    @JsonProperty("subcategoria")
    private String subcategoria;

    @NotNull(message = "El monto es requerido")
    @JsonProperty("monto")
    private Double monto;

    @JsonProperty("metodo_pago")
    private String metodoPago;

    @JsonProperty("esencial")
    private Boolean esencial;

    @NotBlank(message = "La categoría principal es requerida")
    @JsonProperty("categoria_principal")
    private String categoriaPrincipal;

    @NotNull(message = "La fecha es requerida")
    @JsonProperty("fecha")
    private LocalDateTime fecha;

    @NotBlank(message = "El tipo es requerido (INCOME o EXPENSE)")
    private String type;

    public String getNombreTienda() { return nombreTienda; }
    public void setNombreTienda(String nombreTienda) { this.nombreTienda = nombreTienda; }
    public String getSubcategoria() { return subcategoria; }
    public void setSubcategoria(String subcategoria) { this.subcategoria = subcategoria; }
    public Double getMonto() { return monto; }
    public void setMonto(Double monto) { this.monto = monto; }
    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }
    public Boolean getEsencial() { return esencial; }
    public void setEsencial(Boolean esencial) { this.esencial = esencial; }
    public String getCategoriaPrincipal() { return categoriaPrincipal; }
    public void setCategoriaPrincipal(String categoriaPrincipal) { this.categoriaPrincipal = categoriaPrincipal; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
