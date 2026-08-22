export const incomeTypeOptions = [
  "SALARY",
  "FREELANCE",
  "BUSINESS",
  "BENEFIT",
  "OTHER",
] as const;

export const savingsFrequencyOptions = [
  "WEEKLY",
  "BIWEEKLY",
  "MONTHLY",
  "IRREGULAR",
  "NONE",
] as const;

export const paymentMethodOptions = [
  "CASH",
  "DEBIT",
  "CREDIT",
  "TRANSFER",
  "WALLET",
  "OTHER",
] as const;

export const purchaseModeOptions = [
  "PHYSICAL",
  "ONLINE",
  "MIXED",
  "OTHER",
] as const;

export const movementTypeOptions = [
  "EXPENSE",
  "INCOME",
  "TRANSFER",
  "OTHER",
] as const;

export type IncomeType = (typeof incomeTypeOptions)[number];
export type SavingsFrequency = (typeof savingsFrequencyOptions)[number];
export type PaymentMethod = (typeof paymentMethodOptions)[number];
export type PurchaseMode = (typeof purchaseModeOptions)[number];
export type MovementType = (typeof movementTypeOptions)[number];

export interface AnalysisIncomeDraftItem {
  id: string;
  description: string;
  monthlyAmount: number;
  incomeType: IncomeType;
}

export interface AnalysisTransactionDraftItem {
  id: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  purchaseMode: PurchaseMode;
  movementType: MovementType;
  // TODO-DATA-CONTRACT:
  // La categorÃ­a definitiva serÃ¡ provista por el anÃ¡lisis.
  // Este campo sÃ³lo permite representar informaciÃ³n temporal.
  categoryLabel?: string;
}

export interface AnalysisDraftFinancialData {
  incomes: AnalysisIncomeDraftItem[];
  estimatedMonthlySavings: number | null;
  monthlyDebtPayments: number | null;
  emergencyFundAmount: number | null;
  savingsFrequency: SavingsFrequency | null;
}

export interface AnalysisDraft {
  financialData: AnalysisDraftFinancialData;
  transactions: AnalysisTransactionDraftItem[];
}

export const createEmptyAnalysisDraft = (): AnalysisDraft => ({
  financialData: {
    incomes: [],
    estimatedMonthlySavings: null,
    monthlyDebtPayments: null,
    emergencyFundAmount: null,
    savingsFrequency: null,
  },
  transactions: [],
});
