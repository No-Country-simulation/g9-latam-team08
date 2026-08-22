package com.financeai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones")
public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario user;

    @Column(name = "nombre_comercio", nullable = false)
    private String nombreTienda;

    @Column(name = "monto", nullable = false)
    private Double monto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(nullable = false)
    private Integer confidence;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @Column(name = "esencial")
    private Boolean esencial;

    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type; // INCOME, EXPENSE

    @PrePersist
    protected void onCreate() {
        creadoEn = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Usuario getUser() { return user; }
    public void setUser(Usuario user) { this.user = user; }
    public String getNombreTienda() { return nombreTienda; }
    public void setNombreTienda(String nombreTienda) { this.nombreTienda = nombreTienda; }
    public Double getMonto() { return monto; }
    public void setMonto(Double monto) { this.monto = monto; }
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Integer getConfidence() { return confidence; }
    public void setConfidence(Integer confidence) { this.confidence = confidence; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }
    public Boolean getEsencial() { return esencial; }
    public void setEsencial(Boolean esencial) { this.esencial = esencial; }
    public LocalDateTime getCreadoEn() { return creadoEn; }
    public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    // Aliases de compatibilidad para el servicio existente
    public String getDescription() { return nombreTienda; }
    public void setDescription(String description) { this.nombreTienda = description; }
    public Double getAmount() { return monto; }
    public void setAmount(Double amount) { this.monto = amount; }
    public Categoria getCategory() { return categoria; }
    public void setCategory(Categoria category) { this.categoria = category; }
    public LocalDateTime getTransactionDate() { return fecha; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.fecha = transactionDate; }
    public LocalDateTime getCreatedAt() { return creadoEn; }
    public void setCreatedAt(LocalDateTime createdAt) { this.creadoEn = createdAt; }

    public enum TransactionType {
        INCOME, EXPENSE
    }
}
