export type FinancialProfileStatus = "HEALTHY" | "OBSERVATION" | "RISK";

export type AnalysisRecommendationPriority = "LOW" | "MEDIUM" | "HIGH";

export interface AnalysisResultInsight {
  id: string;
  title: string;
  description: string;
}

export interface AnalysisResultCategorySummary {
  category: string;
  amount: number;
  percentage: number;
  transactionsCount: number;
}

export interface AnalysisResultTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  subcategory?: string;
  confidence?: number;
  paymentMethod?: string;
  purchaseMode?: string;
  movementType?: string;
}

export interface AnalysisResultRecommendation {
  id: string;
  title: string;
  summary: string;
  priority: AnalysisRecommendationPriority;
  explanation?: string;
  recommendedActions?: string[];
  potentialImpact?: string;
  currentSituation?: string;
  target?: string;
}

export interface FinancialAnalysisResult {
  analysisId: string;
  generatedAt: string;
  analyzedPeriod: {
    from: string | null;
    to: string | null;
  };
  summary: {
    financialProfile: FinancialProfileStatus;
    confidence?: number | null;
    debtLevel?: number | null;
    monthlyMargin?: number | null;
    emergencyCoverageMonths?: number | null;
  };
  expenses: {
    totalExpenses: number;
    mainCategory?: string | null;
    dailyAverage?: number | null;
    transactionsCount: number;
    byCategory: AnalysisResultCategorySummary[];
    classifiedTransactions: AnalysisResultTransaction[];
    insights: AnalysisResultInsight[];
  };
  recommendations: AnalysisResultRecommendation[];
  topInsights: AnalysisResultInsight[];
}
