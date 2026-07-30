package team08.apirest.models;

// @Table(name="usuario") 
public class UsuarioModel{

    // Variables privadas
    private Long id_cliente;
    private String nombre;
    private String password;
    private String email;
    private Long ingreso_mensual_fijo;
    private Long ingreso_mensual_variable;
    private Long ingreso_mensual;
    private Long gastos_esenciales_mensuales;
    private Long gastos_no_esenciales_mensuales;
    private Long gastos_totales_del_mes;
    private Long cuotas_mensuales_deuda;
    private Long ahorro_mensual;
    private Long ahorro_total;
    private Double ratio_ahorro_neto;
    private Double ratio_endeudamiento_dti;
    private Double gastos_esenciales_ratio;
    private Double gastos_estilo_vida_ratio;
    private int meses_supervivencia;
    private Double frecuencia_transacciones_ocio;
    private String perfil_financiero;
    private String modalidad_pago_tarjeta;
    private Long ahorro_previo;


    // GETTERS & SETTERS
    
    public Long getId() {
        return id_cliente;
    }

    public String getModalidad_pago_tarjeta() {
        return modalidad_pago_tarjeta;
    }

    public void setModalidad(String modalidad_pago_tarjeta){
        this.modalidad_pago_tarjeta = modalidad_pago_tarjeta;
    }

    public Long getAhorros(){
        return ahorro_previo;
    }

    public void setAhorro_previo(Long ahorro_previo){
        this.ahorro_previo = ahorro_previo;
    }

    public void setId(Long id_cliente) {
        this.id_cliente = id_cliente;
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
        return ingreso_mensual_fijo;
    }

    public void setIngreso_mensual_fijo(Long ingreso_mensual_fijo) {
        this.ingreso_mensual_fijo = ingreso_mensual_fijo;
    }

    public Long getIngreso_mensual_variable() {
        return ingreso_mensual_variable;
    }

    public void setIngreso_mensual_variable(Long ingreso_mensual_variable) {
        this.ingreso_mensual_variable = ingreso_mensual_variable;
    }

    public Long getIngreso_mensual() {
        return ingreso_mensual;
    }

    public void setIngreso_mensual(Long ingreso_mensual) {
        this.ingreso_mensual = ingreso_mensual;
    }

    public Long getGastos_esenciales_mensuales() {
        return gastos_esenciales_mensuales;
    }

    public void setGastos_esenciales_mensuales(Long gastos_esenciales_mensuales) {
        this.gastos_esenciales_mensuales = gastos_esenciales_mensuales;
    }

    public Long getGastos_no_esenciales_mensuales() {
        return gastos_no_esenciales_mensuales;
    }

    public void setGastos_no_esenciales_mensuales(Long gastos_no_esenciales_mensuales) {
        this.gastos_no_esenciales_mensuales = gastos_no_esenciales_mensuales;
    }

    public Long getGastos_totales_del_mes() {
        return gastos_totales_del_mes;
    }

    public void setGastos_totales_del_mes(Long gastos_totales_del_mes) {
        this.gastos_totales_del_mes = gastos_totales_del_mes;
    }

    public Long getCuotas_mensuales_deuda() {
        return cuotas_mensuales_deuda;
    }

    public void setCuotas_mensuales_deuda(Long cuotas_mensuales_deuda) {
        this.cuotas_mensuales_deuda = cuotas_mensuales_deuda;
    }

    public Long getAhorro_mensual() {
        return ahorro_mensual;
    }

    public void setAhorro_mensual(Long ahorro_mensual) {
        this.ahorro_mensual = ahorro_mensual;
    }

    public Long getAhorro_total() {
        return ahorro_total;
    }

    public void setAhorro_total(Long ahorro_total) {
        this.ahorro_total = ahorro_total;
    }

    public Double getRatio_ahorro_neto() {
        return ratio_ahorro_neto;
    }

    public void setRatio_ahorro_neto(Double ratio_ahorro_neto) {
        this.ratio_ahorro_neto = ratio_ahorro_neto;
    }

    public Double getRatio_endeudamiento_dti() {
        return ratio_endeudamiento_dti;
    }

    public void setRatio_endeudamiento_dti(Double ratio_endeudamiento_dti) {
        this.ratio_endeudamiento_dti = ratio_endeudamiento_dti;
    }

    public Double getGastos_esenciales_ratio() {
        return gastos_esenciales_ratio;
    }

    public void setGastos_esenciales_ratio(Double gastos_esenciales_ratio) {
        this.gastos_esenciales_ratio = gastos_esenciales_ratio;
    }

    public Double getGastos_estilo_vida_ratio() {
        return gastos_estilo_vida_ratio;
    }

    public void setGastos_estilo_vida_ratio(Double gastos_estilo_vida_ratio) {
        this.gastos_estilo_vida_ratio = gastos_estilo_vida_ratio;
    }

    public int getMeses_supervivencia() {
        return meses_supervivencia;
    }

    public void setMeses_supervivencia(int meses_supervivencia) {
        this.meses_supervivencia = meses_supervivencia;
    }

    public Double getFrecuencia_transacciones_ocio() {
        return frecuencia_transacciones_ocio;
    }

    public void setFrecuencia_transacciones_ocio(Double frecuencia_transacciones_ocio) {
        this.frecuencia_transacciones_ocio = frecuencia_transacciones_ocio;
    }

    public String getPerfil_financiero() {
        return perfil_financiero;
    }

    public void setPerfil_financiero(String perfil_financiero) {
        this.perfil_financiero = perfil_financiero;
    }

}