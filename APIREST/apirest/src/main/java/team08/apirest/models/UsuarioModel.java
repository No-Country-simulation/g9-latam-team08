package team08.apirest.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="clientes_financiero")

public class UsuarioModel{

    // Variables privadas
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "ingreso_mensual_fijo")
    private Long ingresoMensualFijo;

    @Column(name = "ingreso_mensual_variable")
    private Long ingresoMensualVariable;

    @Column(name = "ingreso_mensual")
    private Long ingresoMensual;

    @Column(name = "gastos_esenciales_mensuales")
    private Long gastosEsencialesMensuales;

    @Column(name = "gastos_no_esenciales_mensuales")
    private Long gastosNoEsencialesMensuales;

    @Column(name = "gastos_totales_del_mes")
    private Long gastosTotalesDelMes;

    @Column(name = "cuotas_mensuales_deuda")
    private Long cuotasMensualesDeuda;

    @Column(name = "ahorro_mensual")
    private Long ahorroMensual;

    @Column(name = "ahorro_total")
    private Long ahorroTotal;

    @Column(name = "ratio_ahorro_neto")
    private Double ratioAhorroNeto;

    @Column(name = "ratio_endeudamiento_dti")
    private Double ratioEndeudamientoDti;

    @Column(name = "gastos_esenciales_ratio")
    private Double gastosEsencialesRatio;

    @Column(name = "gastos_estilo_vida_ratio")
    private Double gastosEstiloVidaRatio;

    @Column(name = "meses_supervivencia")
    private int mesesSupervivencia;

    @Column(name = "frecuencia_transacciones_ocio")
    private Double frecuenciaTransaccionesOcio;

    @Column(name = "perfil_financiero")
    private String perfilFinanciero;
    
    @Column(name = "modalidad_pago_tarjeta")
    private String modalidadPagoTarjeta;

    @Column(name = "ahorro_previo")
    private Long ahorroPrevio;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GastoModel> gastos;

    // GETTERS & SETTERS
    
    public Long getId() {
        return idCliente;
    }

    public String getModalidad_pago_tarjeta() {
        return modalidadPagoTarjeta;
    }

    public void setModalidad(String modalidadPagoTarjeta){
        this.modalidadPagoTarjeta = modalidadPagoTarjeta;
    }

    public Long getAhorros(){
        return ahorroPrevio;
    }

    public void setAhorro_previo(Long ahorroPrevio){
        this.ahorroPrevio = ahorroPrevio;
    }

    public void setId(Long idCliente) {
        this.idCliente = idCliente;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
    public String getPassword(){
        return password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public Long getIngreso_mensual_fijo() {
        return ingresoMensualFijo;
    }

    public void setIngreso_mensual_fijo(Long ingresoMensualFijo) {
        this.ingresoMensualFijo = ingresoMensualFijo;
    }

    public Long getIngreso_mensual_variable() {
        return ingresoMensualVariable;
    }

    public void setIngreso_mensual_variable(Long ingresoMensualVariable) {
        this.ingresoMensualVariable = ingresoMensualVariable;
    }

    public Long getIngreso_mensual() {
        return ingresoMensual;
    }

    public void setIngreso_mensual(Long ingresoMensual) {
        this.ingresoMensual = ingresoMensual;
    }

    public Long getGastos_esenciales_mensuales() {
        return gastosEsencialesMensuales;
    }

    public void setGastos_esenciales_mensuales(Long gastosEsencialesMensuales) {
        this.gastosEsencialesMensuales = gastosEsencialesMensuales;
    }

    public Long getGastos_no_esenciales_mensuales() {
        return gastosNoEsencialesMensuales;
    }

    public void setGastos_no_esenciales_mensuales(Long gastosNoEsencialesMensuales) {
        this.gastosNoEsencialesMensuales = gastosNoEsencialesMensuales;
    }

    public Long getGastos_totales_del_mes() {
        return gastosTotalesDelMes;
    }

    public void setGastos_totales_del_mes(Long gastostotalesdelmes) {
        this.gastosTotalesDelMes = gastostotalesdelmes;
    }

    public Long getCuotas_mensuales_deuda() {
        return cuotasMensualesDeuda;
    }

    public void setCuotas_mensuales_deuda(Long cuotasMensualesDeuda) {
        this.cuotasMensualesDeuda = cuotasMensualesDeuda;
    }

    public Long getAhorro_mensual() {
        return ahorroMensual;
    }

    public void setAhorro_mensual(Long ahorroMensual) {
        this.ahorroMensual = ahorroMensual;
    }

    public Long getAhorro_total() {
        return ahorroTotal;
    }

    public void setAhorro_total(Long ahorroTotal) {
        this.ahorroTotal = ahorroTotal;
    }

    public Double getRatio_ahorro_neto() {
        return ratioAhorroNeto;
    }

    public void setRatio_ahorro_neto(Double ratioAhorroNeto) {
        this.ratioAhorroNeto = ratioAhorroNeto;
    }

    public Double getRatio_endeudamiento_dti() {
        return ratioEndeudamientoDti;
    }

    public void setRatio_endeudamiento_dti(Double ratioEndeudamientoDti) {
        this.ratioEndeudamientoDti = ratioEndeudamientoDti;
    }

    public Double getGastos_esenciales_ratio() {
        return gastosEsencialesRatio;
    }

    public void setGastos_esenciales_ratio(Double gastosEsencialesRatio) {
        this.gastosEsencialesRatio = gastosEsencialesRatio;
    }

    public Double getGastos_estilo_vida_ratio() {
        return gastosEstiloVidaRatio;
    }

    public void setGastos_estilo_vida_ratio(Double gastosEstiloVidaRatio) {
        this.gastosEstiloVidaRatio = gastosEstiloVidaRatio;
    }

    public int getMeses_supervivencia() {
        return mesesSupervivencia;
    }

    public void setMeses_supervivencia(int mesesSupervivencia) {
        this.mesesSupervivencia = mesesSupervivencia;
    }

    public Double getFrecuencia_transacciones_ocio() {
        return frecuenciaTransaccionesOcio;
    }

    public void setFrecuencia_transacciones_ocio(Double frecuenciatransaccionesocio) {
        this.frecuenciaTransaccionesOcio = frecuenciatransaccionesocio;
    }

    public String getPerfil_financiero() {
        return perfilFinanciero;
    }

    public void setPerfil_financiero(String perfilfinanciero) {
        this.perfilFinanciero = perfilfinanciero;
    }

    public List<GastoModel> getGastos() {
        return gastos; 
    }
    
    public void setGastos(List<GastoModel> gastos) {
        this.gastos = gastos; 
    }

}