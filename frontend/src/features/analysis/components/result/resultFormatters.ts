import type {
  AnalysisRecommendationPriority,
  FinancialAnalysisResult,
  FinancialProfileStatus,
} from "../../types/analysis-result";

const decimalFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatPercentage = (value: number): string =>
  `${decimalFormatter.format(value)} %`;

export const formatMonths = (value: number): string =>
  `${decimalFormatter.format(value)} meses`;

export const formatResultDate = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
};

export const formatAnalyzedPeriod = (
  analyzedPeriod: FinancialAnalysisResult["analyzedPeriod"],
): string => {
  const from = formatResultDate(analyzedPeriod.from);
  const to = formatResultDate(analyzedPeriod.to);

  if (!from || !to) {
    return "Período no disponible";
  }

  return `${from} — ${to}`;
};

export const getProfileLabel = (profile: FinancialProfileStatus): string => {
  switch (profile) {
    case "HEALTHY":
      return "Saludable";
    case "OBSERVATION":
      return "En observación";
    case "RISK":
      return "En riesgo";
  }
};

export const getPriorityLabel = (priority: AnalysisRecommendationPriority): string => {
  switch (priority) {
    case "HIGH":
      return "Prioridad alta";
    case "MEDIUM":
      return "Prioridad media";
    case "LOW":
      return "Prioridad baja";
  }
};

export const getPriorityShortLabel = (priority: AnalysisRecommendationPriority): string => {
  switch (priority) {
    case "HIGH":
      return "Alta";
    case "MEDIUM":
      return "Media";
    case "LOW":
      return "Baja";
  }
};

export const normalizeConfidence = (value: number | null | undefined): number | null => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  const normalized = value <= 1 ? value * 100 : value;

  return Math.min(100, Math.max(0, normalized));
};

export const formatConfidence = (value: number | null | undefined): string | null => {
  const normalized = normalizeConfidence(value);

  if (normalized === null) {
    return null;
  }

  return `${Math.round(normalized)}%`;
};
