// Tipos provisionales hasta que Backend y Data Science aprueben el contrato JSON final.

export type FinancialStatus = "HEALTHY" | "OBSERVATION" | "RISK";

export interface TransactionInput {
  description: string;
  amount: number;
  date?: string;
  paymentMethod?: string;
  purchaseMode?: "PHYSICAL" | "ONLINE";
}

export interface ClassifiedTransaction {
  id: string;
  description: string;
  amount: number;
  mainCategory: string;
  subcategory?: string;
  confidence?: number;
}

export interface ExpenseCategorySummary {
  category: string;
  amount: number;
  percentage: number;
}

export interface FinancialRecommendation {
  id: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  reason?: string;
}

export interface FinancialAnalysisResult {
  financialProfile: FinancialStatus;
  score?: number;
  indicators: {
    monthlyIncome: number;
    totalExpenses: number;
    estimatedBalance: number;
    monthlySavings: number;
    debtRatio: number;
    emergencyFundMonths: number;
  };
  expensesByCategory: ExpenseCategorySummary[];
  classifiedTransactions: ClassifiedTransaction[];
  recommendations: FinancialRecommendation[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}
