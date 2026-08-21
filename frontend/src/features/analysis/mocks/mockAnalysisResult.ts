import type {
  AnalysisDraft,
  AnalysisTransactionDraftItem,
} from "../types/analysis-draft";
import type {
  AnalysisRecommendationPriority,
  AnalysisResultCategorySummary,
  AnalysisResultInsight,
  AnalysisResultRecommendation,
  AnalysisResultTransaction,
  FinancialAnalysisResult,
  FinancialProfileStatus,
} from "../types/analysis-result";
import { getTransactionPeriod } from "../components/transactions/transactionUtils";

const createId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
};

const getMockCategory = (transaction: AnalysisTransactionDraftItem): string => {
  const description = transaction.description.toLowerCase();
  if (
    description.includes("super") ||
    description.includes("mercado") ||
    description.includes("carrefour") ||
    description.includes("coto") ||
    description.includes("comida")
  ) {
    return "Alimentación";
  }
  if (
    description.includes("ypf") ||
    description.includes("nafta") ||
    description.includes("sube") ||
    description.includes("uber") ||
    description.includes("cabify") ||
    description.includes("combustible")
  ) {
    return "Transporte";
  }
  if (
    description.includes("netflix") ||
    description.includes("spotify") ||
    description.includes("cine") ||
    description.includes("stream") ||
    description.includes("ocio")
  ) {
    return "Entretenimiento";
  }
  return "Otros";
};

const getFinancialProfile = (monthlyMargin: number): FinancialProfileStatus => {
  if (monthlyMargin < 0) {
    return "RISK";
  }
  if (monthlyMargin < 100000) {
    return "OBSERVATION";
  }
  return "HEALTHY";
};

const getPriority = (profile: FinancialProfileStatus): AnalysisRecommendationPriority => {
  if (profile === "RISK") {
    return "HIGH";
  }
  if (profile === "OBSERVATION") {
    return "MEDIUM";
  }
  return "LOW";
};

const round = (value: number): number => Math.round(value * 100) / 100;

const buildCategorySummaries = (
  transactions: AnalysisResultTransaction[],
  totalExpenses: number,
): AnalysisResultCategorySummary[] => {
  const grouped = new Map<string, { amount: number; transactionsCount: number }>();

  transactions.forEach((transaction) => {
    const current = grouped.get(transaction.category) ?? {
      amount: 0,
      transactionsCount: 0,
    };
    grouped.set(transaction.category, {
      amount: current.amount + transaction.amount,
      transactionsCount: current.transactionsCount + 1,
    });
  });

  return [...grouped.entries()]
    .map(([category, value]) => ({
      category,
      amount: round(value.amount),
      percentage: totalExpenses > 0 ? round((value.amount / totalExpenses) * 100) : 0,
      transactionsCount: value.transactionsCount,
    }))
    .sort((left, right) => right.amount - left.amount);
};

const buildInsights = (
  totalExpenses: number,
  monthlyIncome: number,
  monthlyMargin: number,
  mainCategory: string | null,
): AnalysisResultInsight[] => {
  const insights: AnalysisResultInsight[] = [];

  if (mainCategory) {
    insights.push({
      id: createId("insight-category"),
      title: "Categoría principal de gasto",
      description: `Tu mayor volumen de gasto registrado está en ${mainCategory}.`,
    });
  }

  if (monthlyIncome > 0) {
    insights.push({
      id: createId("insight-expense-ratio"),
      title: "Peso de tus gastos",
      description: `Tus gastos cargados representan aproximadamente ${round(
        (totalExpenses / monthlyIncome) * 100,
      )}% de tus ingresos mensuales.`,
    });
  }

  insights.push({
    id: createId("insight-margin"),
    title: "Margen mensual estimado",
    description: `Tu margen mensual estimado es ${monthlyMargin.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    })}.`,
  });

  return insights;
};

const buildRecommendations = (
  profile: FinancialProfileStatus,
  mainCategory: string | null,
  emergencyCoverageMonths: number | null,
): AnalysisResultRecommendation[] => {
  const priority = getPriority(profile);

  const recommendations: AnalysisResultRecommendation[] = [
    {
      id: createId("recommendation-main-category"),
      title: "Revisá tu categoría principal de gasto",
      summary: mainCategory
        ? `Analizá si podés optimizar consumos en ${mainCategory}.`
        : "Analizá en qué rubro se concentran más tus consumos.",
      priority,
      explanation:
        "Este resultado es una simulación frontend basada en la carga actual del draft.",
      recommendedActions: [
        "Revisar gastos recientes",
        "Comparar alternativas de menor costo",
      ],
    },
    {
      id: createId("recommendation-savings"),
      title: "Sostené o fortalecé tu hábito de ahorro",
      summary: "Mantener un margen mensual positivo mejora tu capacidad de respuesta.",
      priority: profile === "HEALTHY" ? "LOW" : "MEDIUM",
      recommendedActions: [
        "Definir un objetivo mensual",
        "Monitorear gastos variables",
      ],
    },
  ];

  if (emergencyCoverageMonths === null || emergencyCoverageMonths < 1) {
    recommendations.push({
      id: createId("recommendation-emergency"),
      title: "Fortalecé tu fondo de emergencia",
      summary: "Un fondo más robusto ayuda a cubrir imprevistos sin comprometer tu flujo.",
      priority: "HIGH",
      currentSituation:
        emergencyCoverageMonths === null
          ? "No hay datos suficientes para estimar cobertura."
          : `La cobertura estimada actual es de ${round(emergencyCoverageMonths)} meses.`,
      target: "Construir progresivamente una cobertura de al menos un mes.",
    });
  }

  return recommendations;
};

export const buildMockAnalysisResult = (
  draft: AnalysisDraft,
): FinancialAnalysisResult => {
  const monthlyIncome = draft.financialData.incomes.reduce(
    (total, income) => total + income.monthlyAmount,
    0,
  );

  const monthlyDebt = draft.financialData.monthlyDebtPayments ?? 0;

  const expenseTransactions = draft.transactions.filter(
    (transaction) => transaction.movementType === "EXPENSE",
  );

  const classifiedTransactions: AnalysisResultTransaction[] = expenseTransactions.map(
    (transaction) => ({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      category: getMockCategory(transaction),
      confidence: 0.58,
      paymentMethod: transaction.paymentMethod,
      purchaseMode: transaction.purchaseMode,
      movementType: transaction.movementType,
    }),
  );

  const totalExpenses = round(
    expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0),
  );

  const byCategory = buildCategorySummaries(classifiedTransactions, totalExpenses);
  const mainCategory = byCategory[0]?.category ?? null;
  const monthlyMargin = round(monthlyIncome - monthlyDebt - totalExpenses);

  const debtLevel =
    monthlyIncome > 0 ? round((monthlyDebt / monthlyIncome) * 100) : null;

  const financialProfile = getFinancialProfile(monthlyMargin);
  const analyzedPeriod = getTransactionPeriod(expenseTransactions);

  const daySpan =
    analyzedPeriod.start && analyzedPeriod.end
      ? Math.max(
          1,
          Math.floor(
            (new Date(
              Number(analyzedPeriod.end.slice(0, 4)),
              Number(analyzedPeriod.end.slice(5, 7)) - 1,
              Number(analyzedPeriod.end.slice(8, 10)),
            ).getTime() -
              new Date(
                Number(analyzedPeriod.start.slice(0, 4)),
                Number(analyzedPeriod.start.slice(5, 7)) - 1,
                Number(analyzedPeriod.start.slice(8, 10)),
              ).getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1,
        )
      : null;

  const dailyAverage = daySpan ? round(totalExpenses / daySpan) : null;

  const estimatedMonthlyExpenses =
    dailyAverage !== null && dailyAverage > 0 ? round(dailyAverage * 30) : null;

  const emergencyCoverageMonths =
    estimatedMonthlyExpenses !== null &&
    estimatedMonthlyExpenses > 0 &&
    draft.financialData.emergencyFundAmount !== null &&
    draft.financialData.emergencyFundAmount > 0
      ? round(draft.financialData.emergencyFundAmount / estimatedMonthlyExpenses)
      : null;

  const topInsights = buildInsights(totalExpenses, monthlyIncome, monthlyMargin, mainCategory);

  const recommendations = buildRecommendations(
    financialProfile,
    mainCategory,
    emergencyCoverageMonths,
  );

  return {
    analysisId: createId("analysis"),
    generatedAt: new Date().toISOString(),
    analyzedPeriod: {
      from: analyzedPeriod.start,
      to: analyzedPeriod.end,
    },
    summary: {
      financialProfile,
      confidence: 0.61,
      debtLevel,
      monthlyMargin,
      emergencyCoverageMonths,
    },
    expenses: {
      totalExpenses,
      mainCategory,
      dailyAverage,
      transactionsCount: expenseTransactions.length,
      byCategory,
      classifiedTransactions,
      insights: topInsights,
    },
    recommendations,
    topInsights,
  };
};
