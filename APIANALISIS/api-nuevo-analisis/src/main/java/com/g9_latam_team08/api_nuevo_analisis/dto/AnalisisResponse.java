package com.g9_latam_team08.api_nuevo_analisis.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record AnalisisResponse(
        String analysisId,
        Instant generatedAt,
        AnalyzedPeriod analyzedPeriod,
        Summary summary,
        Expenses expenses,
        List<Recommendation> recommendations,
        List<Insight> topInsights
) {
    // 1. Periodo analizado
    public record AnalyzedPeriod(
            LocalDate from,
            LocalDate to
    ){}

    // 2. Resumen financiero
    public record Summary(
            String financialProfile,
            double confidence,
            double debtLevel,
            double monthlyMargin,
            double emergencyCoverageMonths
    ) {}

    // 3. Bloque principal de gastos
    public record Expenses(
            double totalExpenses,
            String mainCategory,
            double dailyAverage,
            int transactionsCount,
            List<CategorySummary> byCategory,
            List<ClassifiedTransaction> classifiedTransactions,
            List<Insight> insights
    ) {}

    // 4. Resumen por categoría (dentro de Expenses)
    public record CategorySummary(
            String category,
            double amount,
            double percentage,
            int transactionsCount
    ) {}

    // 5. Transacciones ya clasificadas por la IA
    public record ClassifiedTransaction(
            String id,
            String description,
            double amount,
            LocalDate date,
            String category,
            double confidence,
            String paymentMethod,
            String purchaseMode,
            String movementType
    ) {}

    // 6. Insights (utilizado tanto en Expenses como en topInsights)
    public record Insight(
            String id,
            String title,
            String description
    ) {}

    // 7. Recomendaciones accionables
    public record Recommendation(
            String id,
            String title,
            String summary,
            String priority,
            String explanation,
            List<String> recommendedActions,
            String potentialImpact,
            String currentSituation,
            String target
    ) {}
}
