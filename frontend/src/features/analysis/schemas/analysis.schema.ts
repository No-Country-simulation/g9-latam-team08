import { z } from "zod";
import {
  incomeTypeOptions,
  movementTypeOptions,
  paymentMethodOptions,
  purchaseModeOptions,
  savingsFrequencyOptions,
} from "../types/analysis-draft";

const moneyField = z.number().finite().nonnegative();
const nullableMoneyField = z.union([moneyField, z.null()]);

const incomeSchema = z.object({
  id: z.string().trim().min(1),
  description: z.string().trim().min(1),
  monthlyAmount: moneyField,
  incomeType: z.enum(incomeTypeOptions),
});

const transactionSchema = z.object({
  id: z.string().trim().min(1),
  description: z.string().trim().min(1),
  amount: moneyField,
  date: z.string().date(),
  paymentMethod: z.enum(paymentMethodOptions),
  purchaseMode: z.enum(purchaseModeOptions),
  movementType: z.enum(movementTypeOptions),
  categoryLabel: z.string().trim().min(1).optional(),
});

export const analysisDraftSchema = z.object({
  financialData: z.object({
    incomes: z.array(incomeSchema),
    estimatedMonthlySavings: nullableMoneyField,
    monthlyDebtPayments: nullableMoneyField,
    emergencyFundAmount: nullableMoneyField,
    savingsFrequency: z.union([z.enum(savingsFrequencyOptions), z.null()]),
  }),
  transactions: z.array(transactionSchema),
});

export type AnalysisDraftFormValues = z.infer<typeof analysisDraftSchema>;
