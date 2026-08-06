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

    @Override
    public DashboardDTO getDashboard(Long userId) {
        Optional<Usuario> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        DashboardDTO dashboard = new DashboardDTO();
        Usuario u = user.get();

        // Get metrics
        dashboard.setMetrics(calculateMetrics(u));

        // Get expenses by category
        dashboard.setExpensesByCategory(getExpensesByCategory(u));

        // Get monthly evolution
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

        metrics.setMonthlyIncome(user.getMonthlyIncome());
        metrics.setMonthlyExpenses(user.getMonthlyExpenses());

        Double estimatedBalance = user.getMonthlyIncome() - user.getMonthlyExpenses();
        metrics.setEstimatedBalance(estimatedBalance);

        Integer debtPercentage = calculateDebtPercentage(user);
        metrics.setDebtPercentage(debtPercentage);

        Double monthlySavings = user.getMonthlyIncome() - user.getMonthlyExpenses();
        metrics.setMonthlySavings(Math.max(monthlySavings, 0));

        Double emergencyFundMonths = user.getMonthlyExpenses() > 0 
            ? user.getEmergencyFund() / user.getMonthlyExpenses() 
            : 0;
        metrics.setEmergencyFundMonths(emergencyFundMonths);

        Integer healthScore = calculateFinancialHealthScore(user, debtPercentage, emergencyFundMonths);
        metrics.setFinancialHealthScore(healthScore);

        return metrics;
    }

    @Override
    public void checkAlerts(Usuario user) {
        // Check for low emergency fund
        if (user.getMonthlyExpenses() > 0) {
            Double emergencyFundMonths = user.getEmergencyFund() / user.getMonthlyExpenses();
            if (emergencyFundMonths < 1.0 && !hasAlert(user, Alerta.AlertType.LOW_EMERGENCY_FUND)) {
                alertService.createAlert(
                    user.getId(),
                    "Fondo de emergencia bajo",
                    "Tu fondo de emergencia cubre menos de un mes de gastos",
                    Alerta.AlertType.LOW_EMERGENCY_FUND
                );
            }
        }

        // Check for high debt
        Integer debtPercentage = calculateDebtPercentage(user);
        if (debtPercentage > 50 && !hasAlert(user, Alerta.AlertType.HIGH_DEBT)) {
            alertService.createAlert(
                user.getId(),
                "Nivel de deuda alto",
                "Tu deuda mensual representa más del 50% de tus ingresos",
                Alerta.AlertType.HIGH_DEBT
            );
        }

        // Check for high expenses
        Double expenseRatio = (user.getMonthlyExpenses() / user.getMonthlyIncome()) * 100;
        if (expenseRatio > 85 && !hasAlert(user, Alerta.AlertType.HIGH_EXPENSES)) {
            alertService.createAlert(
                user.getId(),
                "Gastos muy altos",
                "Tus gastos representan más del 85% de tus ingresos",
                Alerta.AlertType.HIGH_EXPENSES
            );
        }
    }

    @Override
    public void generateRecommendations(Usuario user) {
        // This method can generate dynamic recommendations
    }

    private List<ExpenseByCategoryDTO> getExpensesByCategory(Usuario user) {
        List<Transaccion> transactions = transactionRepository.findByUser(user);
        
        Map<String, Double> categoryExpenses = new HashMap<>();
        Double totalExpenses = 0.0;

        for (Transaccion t : transactions) {
            if (t.getType() == Transaccion.TransactionType.EXPENSE) {
                String categoryName = t.getCategory().getName();
                categoryExpenses.put(categoryName, categoryExpenses.getOrDefault(categoryName, 0.0) + t.getAmount());
                totalExpenses += t.getAmount();
            }
        }

        final Double finalTotal = totalExpenses;
        return categoryExpenses.entrySet().stream().map(entry -> {
            ExpenseByCategoryDTO dto = new ExpenseByCategoryDTO();
            dto.setCategoryName(entry.getKey());
            dto.setAmount(entry.getValue());
            dto.setPercentage((int) ((entry.getValue() / finalTotal) * 100));
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
                data.setIncome((data.getIncome() != null ? data.getIncome() : 0.0) + t.getAmount());
            } else {
                data.setExpenses((data.getExpenses() != null ? data.getExpenses() : 0.0) + t.getAmount());
            }

            monthlyData.put(monthKey, data);
        }

        return new ArrayList<>(monthlyData.values());
    }

    private List<RecommendationDTO> getRecommendations(Usuario user) {
        List<RecommendationDTO> recommendations = new ArrayList<>();

        Integer debtPercentage = calculateDebtPercentage(user);
        if (debtPercentage > 30) {
            recommendations.add(new RecommendationDTO(
                1,
                "Reducir gastos variables",
                "Especialmente en entretenimiento y servicios.",
                "HIGH"
            ));
        }

        if (user.getMonthlyExpenses() > 0) {
            Double emergencyFundMonths = user.getEmergencyFund() / user.getMonthlyExpenses();
            if (emergencyFundMonths < 3) {
                recommendations.add(new RecommendationDTO(
                    2,
                    "Aumentar tu fondo de emergencia",
                    "Intenta ahorrar para tener entre 3-6 meses de gastos.",
                    "HIGH"
                ));
            }
        }

        if (debtPercentage > 0) {
            recommendations.add(new RecommendationDTO(
                3,
                "Monitorear y reducir tu deuda",
                "Mantén tu deuda dentro de un rango manejable.",
                "MEDIUM"
            ));
        }

        return recommendations;
    }

    private Integer calculateDebtPercentage(Usuario user) {
        if (user.getMonthlyIncome() == 0) return 0;
        return (int) ((user.getMonthlyDebt() / user.getMonthlyIncome()) * 100);
    }

    private Integer calculateFinancialHealthScore(Usuario user, Integer debtPercentage, Double emergencyFundMonths) {
        Integer score = 100;

        // Deduct points for high debt
        if (debtPercentage > 50) score -= 30;
        else if (debtPercentage > 30) score -= 15;
        else if (debtPercentage > 0) score -= 5;

        // Deduct points for low emergency fund
        if (emergencyFundMonths < 1) score -= 20;
        else if (emergencyFundMonths < 3) score -= 10;

        // Deduct points for high expense ratio
        Double expenseRatio = (user.getMonthlyExpenses() / user.getMonthlyIncome()) * 100;
        if (expenseRatio > 85) score -= 10;
        else if (expenseRatio > 70) score -= 5;

        return Math.max(score, 0);
    }

    private boolean hasAlert(Usuario user, Alerta.AlertType type) {
        List<Alerta> alerts = alertRepository.findByUserAndIsReadFalse(user);
        return alerts.stream().anyMatch(a -> a.getType() == type);
    }
}
