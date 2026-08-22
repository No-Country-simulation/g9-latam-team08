package com.financeai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DashboardMetricsDTO {

    @JsonProperty("ingreso_mensual_fijo")
    private Double ingresoMensualFijo;

    @JsonProperty("ingreso_mensual_variable")
    private Double ingresoMensualVariable;

    @JsonProperty("ingreso_mensual")
    private Double ingresoMensual;

    @JsonProperty("gastos_esenciales_mensuales")
    private Double gastosEsencialesMensuales;

    @JsonProperty("gastos_no_esenciales_mensuales")
    private Double gastosNoEsencialesMensuales;

    @JsonProperty("gastos_totales_del_mes")
    private Double gastosTotalesDelMes;

    @JsonProperty("cuotas_mensuales_deuda")
    private Double cuotasMensualesDeuda;

    @JsonProperty("modalidad_pago_tarjeta")
    private String modalidadPagoTarjeta;

    @JsonProperty("ahorro_mensual")
    private Double ahorroMensual;

    @JsonProperty("ahorro_previo")
    private Double ahorroPrevio;

    @JsonProperty("ahorro_total")
    private Double ahorroTotal;

    @JsonProperty("ratio_ahorro_neto")
    private Double ratioAhorroNeto;

    @JsonProperty("ratio_endeudamiento_dti")
    private Double ratioEndeudamientoDti;

    @JsonProperty("gastos_esenciales_ratio")
    private Double gastosEsencialesRatio;

    @JsonProperty("gastos_estilo_vida_ratio")
    private Double gastosEstiloVidaRatio;

    @JsonProperty("meses_supervivencia")
    private Double mesesSupervivencia;

    @JsonProperty("frecuencia_transacciones_ocio")
    private Integer frecuenciaTransaccionesOcio;

    @JsonProperty("perfil_financiero")
    private String perfilFinanciero;

    public Double getIngresoMensualFijo() { return ingresoMensualFijo; }
    public void setIngresoMensualFijo(Double ingresoMensualFijo) { this.ingresoMensualFijo = ingresoMensualFijo; }
    public Double getIngresoMensualVariable() { return ingresoMensualVariable; }
    public void setIngresoMensualVariable(Double ingresoMensualVariable) { this.ingresoMensualVariable = ingresoMensualVariable; }
    public Double getIngresoMensual() { return ingresoMensual; }
    public void setIngresoMensual(Double ingresoMensual) { this.ingresoMensual = ingresoMensual; }
    public Double getGastosEsencialesMensuales() { return gastosEsencialesMensuales; }
    public void setGastosEsencialesMensuales(Double gastosEsencialesMensuales) { this.gastosEsencialesMensuales = gastosEsencialesMensuales; }
    public Double getGastosNoEsencialesMensuales() { return gastosNoEsencialesMensuales; }
    public void setGastosNoEsencialesMensuales(Double gastosNoEsencialesMensuales) { this.gastosNoEsencialesMensuales = gastosNoEsencialesMensuales; }
    public Double getGastosTotalesDelMes() { return gastosTotalesDelMes; }
    public void setGastosTotalesDelMes(Double gastosTotalesDelMes) { this.gastosTotalesDelMes = gastosTotalesDelMes; }
    public Double getCuotasMensualesDeuda() { return cuotasMensualesDeuda; }
    public void setCuotasMensualesDeuda(Double cuotasMensualesDeuda) { this.cuotasMensualesDeuda = cuotasMensualesDeuda; }
    public String getModalidadPagoTarjeta() { return modalidadPagoTarjeta; }
    public void setModalidadPagoTarjeta(String modalidadPagoTarjeta) { this.modalidadPagoTarjeta = modalidadPagoTarjeta; }
    public Double getAhorroMensual() { return ahorroMensual; }
    public void setAhorroMensual(Double ahorroMensual) { this.ahorroMensual = ahorroMensual; }
    public Double getAhorroPrevio() { return ahorroPrevio; }
    public void setAhorroPrevio(Double ahorroPrevio) { this.ahorroPrevio = ahorroPrevio; }
    public Double getAhorroTotal() { return ahorroTotal; }
    public void setAhorroTotal(Double ahorroTotal) { this.ahorroTotal = ahorroTotal; }
    public Double getRatioAhorroNeto() { return ratioAhorroNeto; }
    public void setRatioAhorroNeto(Double ratioAhorroNeto) { this.ratioAhorroNeto = ratioAhorroNeto; }
    public Double getRatioEndeudamientoDti() { return ratioEndeudamientoDti; }
    public void setRatioEndeudamientoDti(Double ratioEndeudamientoDti) { this.ratioEndeudamientoDti = ratioEndeudamientoDti; }
    public Double getGastosEsencialesRatio() { return gastosEsencialesRatio; }
    public void setGastosEsencialesRatio(Double gastosEsencialesRatio) { this.gastosEsencialesRatio = gastosEsencialesRatio; }
    public Double getGastosEstiloVidaRatio() { return gastosEstiloVidaRatio; }
    public void setGastosEstiloVidaRatio(Double gastosEstiloVidaRatio) { this.gastosEstiloVidaRatio = gastosEstiloVidaRatio; }
    public Double getMesesSupervivencia() { return mesesSupervivencia; }
    public void setMesesSupervivencia(Double mesesSupervivencia) { this.mesesSupervivencia = mesesSupervivencia; }
    public Integer getFrecuenciaTransaccionesOcio() { return frecuenciaTransaccionesOcio; }
    public void setFrecuenciaTransaccionesOcio(Integer frecuenciaTransaccionesOcio) { this.frecuenciaTransaccionesOcio = frecuenciaTransaccionesOcio; }
    public String getPerfilFinanciero() { return perfilFinanciero; }
    public void setPerfilFinanciero(String perfilFinanciero) { this.perfilFinanciero = perfilFinanciero; }
}
