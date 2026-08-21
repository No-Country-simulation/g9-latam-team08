package com.financeai.service.impl;

import com.financeai.dto.*;
import com.financeai.entity.Alerta;
import com.financeai.entity.Transaccion;
import com.financeai.entity.Usuario;
import com.financeai.repository.UserRepository;
import com.financeai.repository.TransactionRepository;
import com.financeai.repository.AlertRepository;
import com.financeai.service.DashboardService;
import com.financeai.service.AlertService;
import com.financeai.service.MlService;
import com.financeai.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private AlertService alertService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private MlService mlService;

    // Categorías consideradas esenciales
    private static final Set<String> CATEGORIAS_ESENCIALES = Set.of(
        "Alimentación", "Hogar", "Salud", "Transporte"
    );

    // Categorías de ocio/entretenimiento
    private static final Set<String> CATEGORIAS_OCIO = Set.of(
        "Entretenimiento"
    );

    @Override
    public DashboardDTO getDashboard(Long userId) {
        Optional<Usuario> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        DashboardDTO dashboard = new DashboardDTO();
        Usuario u = user.get();

        // Get metrics (análisis de TODAS las transacciones)
        dashboard.setMetrics(calculateMetrics(u));

        // Get expenses by category (TODAS las transacciones)
        dashboard.setExpensesByCategory(getExpensesByCategory(u));

        // Get monthly evolution (historial completo)
        dashboard.setMonthlyEvolution(getMonthlyEvolution(u));

        // Get recent transactions
        dashboard.setRecentTransactions(transactionService.getRecentTransactions(userId, 5));

        // Get alerts
        checkAlerts(u);
        dashboard.setAlerts(alertService.getUserAlerts(userId));

        // Get recommendations
        dashboard.setRecommendations(getRecommendations(u));

        return dashboard;
    }

    @Override
    public DashboardMetricsDTO calculateMetrics(Usuario user) {
        DashboardMetricsDTO metrics = new DashboardMetricsDTO();

        // Obtener TODAS las transacciones del usuario
        List<Transaccion> transactions = transactionRepository.findByUser(user);

        Double ingresoMensualFijo = 0.0;
        Double ingresoMensualVariable = 0.0;
        Double gastosEsencialesMensuales = 0.0;
        Double gastosNoEsencialesMensuales = 0.0;
        Double cuotasMensualesDeuda = user.getMonthlyDebt();
        Integer frecuenciaTransaccionesOcio = 0;

        // Sumar TODAS las transacciones de todos los meses
        for (Transaccion t : transactions) {
            if (t.getType() == Transaccion.TransactionType.INCOME) {
                ingresoMensualFijo += t.getAmount();
            } else if (t.getType() == Transaccion.TransactionType.EXPENSE) {
                String categoryName = t.getCategory().getName();
                if (CATEGORIAS_ESENCIALES.contains(categoryName)) {
                    gastosEsencialesMensuales += t.getAmount();
                } else {
                    gastosNoEsencialesMensuales += t.getAmount();
                }
                if (CATEGORIAS_OCIO.contains(categoryName)) {
                    frecuenciaTransaccionesOcio++;
                }
            }
        }

        // Usar valores del usuario como respaldo si no hay transacciones
        if (ingresoMensualFijo == 0.0 && user.getMonthlyIncome() > 0) {
            ingresoMensualFijo = user.getMonthlyIncome();
        }
        if (gastosEsencialesMensuales == 0.0 && gastosNoEsencialesMensuales == 0.0 && user.getMonthlyExpenses() > 0) {
            gastosEsencialesMensuales = user.getMonthlyExpenses();
        }

        // ingreso_mensual = ingreso_mensual_fijo + ingreso_mensual_variable
        Double ingresoMensual = ingresoMensualFijo + ingresoMensualVariable;

        // gastos_totales_del_mes = gastos_esenciales + gastos_no_esenciales + cuotas_mensuales_deuda
        Double gastosTotalesDelMes = gastosEsencialesMensuales + gastosNoEsencialesMensuales + cuotasMensualesDeuda;

        // ahorro_mensual = ingreso_mensual - gastos_totales_del_mes
        Double ahorroMensual = ingresoMensual - gastosTotalesDelMes;

        // ahorro_previo = capital líquido previo del usuario
        Double ahorroPrevio = user.getEmergencyFund();

        // ahorro_total = ahorro_mensual + ahorro_previo
        Double ahorroTotal = Math.max(ahorroMensual, 0) + ahorroPrevio;

        // ratio_ahorro_neto = ahorro_mensual / ingreso_mensual
        Double ratioAhorroNeto = ingresoMensual > 0 ? ahorroMensual / ingresoMensual : 0.0;

        // ratio_endeudamiento_dti = cuotas_mensuales_deuda / ingreso_mensual
        Double ratioEndeudamientoDti = ingresoMensual > 0 ? cuotasMensualesDeuda / ingresoMensual : 0.0;

        // gastos_esenciales_ratio = gastos_esenciales_mensuales / ingreso_mensual
        Double gastosEsencialesRatio = ingresoMensual > 0 ? gastosEsencialesMensuales / ingresoMensual : 0.0;

        // gastos_estilo_vida_ratio = gastos_no_esenciales_mensuales / ingreso_mensual
        Double gastosEstiloVidaRatio = ingresoMensual > 0 ? gastosNoEsencialesMensuales / ingresoMensual : 0.0;

        // meses_supervivencia = Si(gastos_esenciales + cuotas > 0): ahorro_total / (gastos_esenciales + cuotas), sino 0
        Double denominadorSupervivencia = gastosEsencialesMensuales + cuotasMensualesDeuda;
        Double mesesSupervivencia = denominadorSupervivencia > 0 ? ahorroTotal / denominadorSupervivencia : 0.0;

        // perfil_financiero — primero intentar con el modelo ML, si no, usar cálculo local
        String perfilFinanciero = obtenerPerfilFinancieroML(
            ingresoMensualFijo, ingresoMensualVariable, gastosEsencialesMensuales,
            gastosNoEsencialesMensuales, cuotasMensualesDeuda, ahorroPrevio
        );
        if (perfilFinanciero == null) {
            perfilFinanciero = calcularPerfilFinanciero(ratioEndeudamientoDti, mesesSupervivencia, ratioAhorroNeto);
        }

        // Setear todos los campos
        metrics.setIngresoMensualFijo(ingresoMensualFijo);
        metrics.setIngresoMensualVariable(ingresoMensualVariable);
        metrics.setIngresoMensual(ingresoMensual);
        metrics.setGastosEsencialesMensuales(gastosEsencialesMensuales);
        metrics.setGastosNoEsencialesMensuales(gastosNoEsencialesMensuales);
        metrics.setGastosTotalesDelMes(gastosTotalesDelMes);
        metrics.setCuotasMensualesDeuda(cuotasMensualesDeuda);
        metrics.setModalidadPagoTarjeta("sin_deuda");
        metrics.setAhorroMensual(ahorroMensual);
        metrics.setAhorroPrevio(ahorroPrevio);
        metrics.setAhorroTotal(ahorroTotal);
        metrics.setRatioAhorroNeto(ratioAhorroNeto);
        metrics.setRatioEndeudamientoDti(ratioEndeudamientoDti);
        metrics.setGastosEsencialesRatio(gastosEsencialesRatio);
        metrics.setGastosEstiloVidaRatio(gastosEstiloVidaRatio);
        metrics.setMesesSupervivencia(mesesSupervivencia);
        metrics.setFrecuenciaTransaccionesOcio(frecuenciaTransaccionesOcio);
        metrics.setPerfilFinanciero(perfilFinanciero);

        return metrics;
    }

    /**
     * Llama al microservicio Python de ML para obtener el perfil financiero predicho.
     * Si el servicio no está disponible o falla, devuelve null para usar el cálculo local.
     */
    private String obtenerPerfilFinancieroML(
            Double ingresoMensualFijo, Double ingresoMensualVariable,
            Double gastosEsencialesMensuales, Double gastosNoEsencialesMensuales,
            Double cuotasMensualesDeuda, Double ahorroPrevio) {
        try {
            Map<String, Object> datosFinancieros = new HashMap<>();
            datosFinancieros.put("ingreso_mensual_fijo", ingresoMensualFijo);
            datosFinancieros.put("ingreso_mensual_variable", ingresoMensualVariable);
            datosFinancieros.put("gastos_esenciales_mensuales", gastosEsencialesMensuales);
            datosFinancieros.put("gastos_no_esenciales_mensuales", gastosNoEsencialesMensuales);
            datosFinancieros.put("cuotas_mensuales_deuda", cuotasMensualesDeuda);
            datosFinancieros.put("ahorro_previo", ahorroPrevio);

            Map<String, Object> resultado = mlService.calcularFinanzas(datosFinancieros);
            if (resultado != null && resultado.containsKey("perfil_financiero")) {
                return resultado.get("perfil_financiero").toString();
            }
        } catch (Exception e) {
            System.err.println("[Dashboard] ML service no disponible, usando cálculo local: " + e.getMessage());
        }
        return null;
    }

    private String calcularPerfilFinanciero(Double ratioEndeudamientoDti, Double mesesSupervivencia, Double ratioAhorroNeto) {
        if (ratioEndeudamientoDti > 0.37 || mesesSupervivencia < 0.4) {
            return "En riesgo";
        }
        if (ratioEndeudamientoDti <= 0.20 && mesesSupervivencia >= 1.5 && ratioAhorroNeto >= 0.15) {
            return "Saludable";
        }
        return "En observación";
    }

    @Override
    public void checkAlerts(Usuario user) {
        List<Transaccion> transactions = transactionRepository.findByUser(user);

        Double ingresoTotal = 0.0;
        Double gastosTotal = 0.0;

        // Sumar TODAS las transacciones
        for (Transaccion t : transactions) {
            if (t.getType() == Transaccion.TransactionType.INCOME) {
                ingresoTotal += t.getAmount();
            } else if (t.getType() == Transaccion.TransactionType.EXPENSE) {
                gastosTotal += t.getAmount();
            }
        }

        if (ingresoTotal == 0.0 && user.getMonthlyIncome() > 0) {
            ingresoTotal = user.getMonthlyIncome();
        }
        if (gastosTotal == 0.0 && user.getMonthlyExpenses() > 0) {
            gastosTotal = user.getMonthlyExpenses();
        }

        Double cuotasMensualesDeuda = user.getMonthlyDebt();

        // Alerta: meses de supervivencia < 1
        Double denominador = gastosTotal + cuotasMensualesDeuda;
        if (denominador > 0) {
            Double ahorroTotal = Math.max(ingresoTotal - gastosTotal - cuotasMensualesDeuda, 0) + user.getEmergencyFund();
            Double mesesSupervivencia = ahorroTotal / denominador;
            if (mesesSupervivencia < 1.0 && !hasAlert(user, Alerta.AlertType.LOW_EMERGENCY_FUND)) {
                alertService.createAlert(
                    user.getId(),
                    "Fondo de emergencia bajo",
                    "Tu ahorro cubre menos de un mes de gastos esenciales y deudas",
                    Alerta.AlertType.LOW_EMERGENCY_FUND
                );
            }
        }

        // Alerta: gastos totales > 85% de ingresos
        if (ingresoTotal > 0) {
            Double gastosRatio = gastosTotal / ingresoTotal;
            if (gastosRatio > 0.85 && !hasAlert(user, Alerta.AlertType.HIGH_EXPENSES)) {
                alertService.createAlert(
                    user.getId(),
                    "Gastos muy altos",
                    "Tus gastos totales representan más del 85% de tus ingresos",
                    Alerta.AlertType.HIGH_EXPENSES
                );
            }
        }

        // Alerta: ratio endeudamiento DTI > 50%
        Double ratioEndeudamientoDti = ingresoTotal > 0 ? cuotasMensualesDeuda / ingresoTotal : 0.0;
        if (ratioEndeudamientoDti > 0.50 && !hasAlert(user, Alerta.AlertType.HIGH_DEBT)) {
            alertService.createAlert(
                user.getId(),
                "Nivel de endeudamiento alto",
                "Tus cuotas mensuales de deuda superan el 50% de tus ingresos",
                Alerta.AlertType.HIGH_DEBT
            );
        }
    }

    @Override
    public void generateRecommendations(Usuario user) {
        // Se pueden generar recomendaciones dinámicas
    }

    private List<ExpenseByCategoryDTO> getExpensesByCategory(Usuario user) {
        List<Transaccion> transactions = transactionRepository.findByUser(user);

        Map<String, Double> categoryExpenses = new HashMap<>();
        Double totalExpenses = 0.0;

        // Sumar TODAS las transacciones de gasto de todos los meses
        for (Transaccion t : transactions) {
            if (t.getType() == Transaccion.TransactionType.EXPENSE) {
                String categoriaPrincipal = t.getCategory().getName();
                categoryExpenses.put(categoriaPrincipal, categoryExpenses.getOrDefault(categoriaPrincipal, 0.0) + t.getAmount());
                totalExpenses += t.getAmount();
            }
        }

        final Double finalTotal = totalExpenses;
        return categoryExpenses.entrySet().stream().map(entry -> {
            ExpenseByCategoryDTO dto = new ExpenseByCategoryDTO();
            dto.setCategoriaPrincipal(entry.getKey());
            dto.setMonto(entry.getValue());
            dto.setPorcentaje(finalTotal > 0 ? (int) ((entry.getValue() / finalTotal) * 100) : 0);
            return dto;
        }).collect(Collectors.toList());
    }

    private List<MonthlyEvolutionDTO> getMonthlyEvolution(Usuario user) {
        List<Transaccion> transactions = transactionRepository.findByUser(user);

        Map<String, MonthlyEvolutionDTO> monthlyData = new TreeMap<>();

        for (Transaccion t : transactions) {
            YearMonth yearMonth = YearMonth.from(t.getTransactionDate());
            String monthKey = yearMonth.toString();

            MonthlyEvolutionDTO data = monthlyData.getOrDefault(monthKey, new MonthlyEvolutionDTO());
            data.setMonth(monthKey);

            if (t.getType() == Transaccion.TransactionType.INCOME) {
                data.setIngresos((data.getIngresos() != null ? data.getIngresos() : 0.0) + t.getAmount());
            } else {
                data.setGastos((data.getGastos() != null ? data.getGastos() : 0.0) + t.getAmount());
            }

            monthlyData.put(monthKey, data);
        }

        return new ArrayList<>(monthlyData.values());
    }

    private List<RecommendationDTO> getRecommendations(Usuario user) {
        List<RecommendationDTO> recommendations = new ArrayList<>();

        // Calcular con TODAS las transacciones
        List<Transaccion> transactions = transactionRepository.findByUser(user);
        Double ingresoTotal = 0.0;
        Double gastosEsenciales = 0.0;
        Double gastosNoEsenciales = 0.0;

        for (Transaccion t : transactions) {
            if (t.getType() == Transaccion.TransactionType.INCOME) {
                ingresoTotal += t.getAmount();
            } else if (t.getType() == Transaccion.TransactionType.EXPENSE) {
                if (CATEGORIAS_ESENCIALES.contains(t.getCategory().getName())) {
                    gastosEsenciales += t.getAmount();
                } else {
                    gastosNoEsenciales += t.getAmount();
                }
            }
        }

        Double cuotasMensualesDeuda = user.getMonthlyDebt();
        Double ratioEndeudamientoDti = ingresoTotal > 0 ? cuotasMensualesDeuda / ingresoTotal : 0.0;

        if (ratioEndeudamientoDti > 0.30) {
            recommendations.add(new RecommendationDTO(
                1,
                "Reducir nivel de endeudamiento",
                "Tu ratio de endeudamiento DTI supera el 30%. Intentá reducir cuotas o consolidar deudas.",
                "HIGH"
            ));
        }

        Double gastosTotales = gastosEsenciales + gastosNoEsenciales + cuotasMensualesDeuda;
        Double ahorroTotal = Math.max(ingresoTotal - gastosTotales, 0) + user.getEmergencyFund();
        Double denominador = gastosEsenciales + cuotasMensualesDeuda;
        Double mesesSupervivencia = denominador > 0 ? ahorroTotal / denominador : 0.0;

        if (mesesSupervivencia < 3) {
            recommendations.add(new RecommendationDTO(
                2,
                "Aumentar tu fondo de emergencia",
                "Tus meses de supervivencia son bajos. Intentá ahorrar para cubrir 3-6 meses de gastos esenciales.",
                "HIGH"
            ));
        }

        if (ingresoTotal > 0 && gastosNoEsenciales / ingresoTotal > 0.30) {
            recommendations.add(new RecommendationDTO(
                3,
                "Reducir gastos de estilo de vida",
                "Tus gastos no esenciales superan el 30% de tus ingresos. Revisá suscripciones y entretenimiento.",
                "MEDIUM"
            ));
        }

        return recommendations;
    }

    private boolean hasAlert(Usuario user, Alerta.AlertType type) {
        List<Alerta> alerts = alertRepository.findByUserAndIsReadFalse(user);
        return alerts.stream().anyMatch(a -> a.getType() == type);
    }
}
