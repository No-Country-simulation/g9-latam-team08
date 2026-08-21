package com.financeai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;

    @JsonProperty("nombre_tienda")
    private String nombreTienda;

    @JsonProperty("subcategoria")
    private String subcategoria;

    @JsonProperty("monto")
    private Double monto;

    @JsonProperty("metodo_pago")
    private String metodoPago;

    @JsonProperty("esencial")
    private Boolean esencial;

    @JsonProperty("categoria_principal")
    private String categoriaPrincipal;

    private Integer confidence;

    @JsonProperty("fecha")
    private LocalDateTime fecha;

    private String type;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public Integer getConfidence() { return confidence; }
    public void setConfidence(Integer confidence) { this.confidence = confidence; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
