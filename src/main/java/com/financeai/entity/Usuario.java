package com.financeai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    @SequenceGenerator(name = "usuario_seq", sequenceName = "usuario_sequence", allocationSize = 1)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    // Campos financieros (pueden venir de indicadores_financieros o input manual)
    @Column(name = "ingreso_mensual")
    private Double ingresoMensual;

    @Column(name = "gastos_mensuales")
    private Double gastosMensuales;

    @Column(name = "ahorro_previo")
    private Double ahorroPrevio;

    @Column(name = "cuotas_mensuales_deuda")
    private Double cuotasMensualesDeuda;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaccion> transacciones;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Alerta> alertas;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (ingresoMensual == null) ingresoMensual = 0.0;
        if (gastosMensuales == null) gastosMensuales = 0.0;
        if (ahorroPrevio == null) ahorroPrevio = 0.0;
        if (cuotasMensualesDeuda == null) cuotasMensualesDeuda = 0.0;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
    public Double getIngresoMensual() { return ingresoMensual; }
    public void setIngresoMensual(Double ingresoMensual) { this.ingresoMensual = ingresoMensual; }
    public Double getGastosMensuales() { return gastosMensuales; }
    public void setGastosMensuales(Double gastosMensuales) { this.gastosMensuales = gastosMensuales; }
    public Double getAhorroPrevio() { return ahorroPrevio; }
    public void setAhorroPrevio(Double ahorroPrevio) { this.ahorroPrevio = ahorroPrevio; }
    public Double getCuotasMensualesDeuda() { return cuotasMensualesDeuda; }
    public void setCuotasMensualesDeuda(Double cuotasMensualesDeuda) { this.cuotasMensualesDeuda = cuotasMensualesDeuda; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<Transaccion> getTransacciones() { return transacciones; }
    public void setTransacciones(List<Transaccion> transacciones) { this.transacciones = transacciones; }
    public List<Alerta> getAlertas() { return alertas; }
    public void setAlertas(List<Alerta> alertas) { this.alertas = alertas; }

    // Aliases de compatibilidad para servicios existentes
    public String getFirstName() { return nombre; }
    public void setFirstName(String firstName) { this.nombre = firstName; }
    public String getLastName() { return ""; }
    public void setLastName(String lastName) { /* no-op, campo unificado en nombre */ }
    public Double getMonthlyIncome() { return ingresoMensual != null ? ingresoMensual : 0.0; }
    public void setMonthlyIncome(Double monthlyIncome) { this.ingresoMensual = monthlyIncome; }
    public Double getMonthlyExpenses() { return gastosMensuales != null ? gastosMensuales : 0.0; }
    public void setMonthlyExpenses(Double monthlyExpenses) { this.gastosMensuales = monthlyExpenses; }
    public Double getEmergencyFund() { return ahorroPrevio != null ? ahorroPrevio : 0.0; }
    public void setEmergencyFund(Double emergencyFund) { this.ahorroPrevio = emergencyFund; }
    public Double getMonthlyDebt() { return cuotasMensualesDeuda != null ? cuotasMensualesDeuda : 0.0; }
    public void setMonthlyDebt(Double monthlyDebt) { this.cuotasMensualesDeuda = monthlyDebt; }
    public LocalDateTime getCreatedAt() { return fechaRegistro; }
    public void setCreatedAt(LocalDateTime createdAt) { this.fechaRegistro = createdAt; }
    public List<Transaccion> getTransactions() { return transacciones; }
    public void setTransactions(List<Transaccion> transactions) { this.transacciones = transactions; }
    public List<Alerta> getAlerts() { return alertas; }
    public void setAlerts(List<Alerta> alerts) { this.alertas = alerts; }
}
