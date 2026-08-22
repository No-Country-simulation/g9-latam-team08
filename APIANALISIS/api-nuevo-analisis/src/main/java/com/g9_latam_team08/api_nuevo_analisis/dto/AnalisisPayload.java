package com.g9_latam_team08.api_nuevo_analisis.dto;
import java.time.LocalDate;
import java.util.List;

// 1. El Record Principal (JSON del fronted)
public record AnalisisPayload(
        FinancialData financialData,
        List<Transaction> transactions
)
{

    // 2. El Record para los Datos Financieros
    public record FinancialData(
            List<Income> incomes,
            double estimatedMonthlySavings,
            double monthlyDebtPayments,
            double emergencyFundAmount,
            String savingsFrequency
    ) {
    }

    // 3. El Record para los Ingresos (dentro de la lista incomes)
    public record Income(
            String id,
            String description,
            double monthlyAmount,
            String incomeType
    ) {
    }

    // 4. El Record para las Transacciones
    public record Transaction(
            String id,
            String description,
            double amount,
            LocalDate date,
            String paymentMethod,
            String purchaseMode,
            String movementType,
            String categoryLabel
    ) {
    }
}