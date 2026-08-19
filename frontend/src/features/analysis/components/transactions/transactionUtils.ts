import { formatCurrency } from "../../../../utils/formatters";
import type {
  AnalysisTransactionDraftItem,
  MovementType,
  PaymentMethod,
  PurchaseMode,
} from "../../types/analysis-draft";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  CASH: "Efectivo",
  DEBIT: "Débito",
  CREDIT: "Crédito",
  TRANSFER: "Transferencia",
  WALLET: "Billetera virtual",
  OTHER: "Otro",
};

export const purchaseModeLabels: Record<PurchaseMode, string> = {
  PHYSICAL: "Presencial",
  ONLINE: "Online",
  MIXED: "Mixta",
  OTHER: "Otra",
};

export const movementTypeLabels: Record<MovementType, string> = {
  EXPENSE: "Gasto",
  INCOME: "Ingreso de dinero",
  TRANSFER: "Transferencia",
  OTHER: "Otro",
};

export const formatTransactionAmount = (value: number): string => formatCurrency(value);

export const formatTransactionDate = (value: string): string => {
  if (!value) {
    return "Sin fecha";
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
};

export const getTransactionPeriod = (
  transactions: AnalysisTransactionDraftItem[],
): { start: string | null; end: string | null } => {
  const sortedDates = transactions
    .map((transaction) => transaction.date)
    .filter((date): date is string => Boolean(date))
    .sort((left, right) => left.localeCompare(right));

  if (sortedDates.length === 0) {
    return { start: null, end: null };
  }

  return {
    start: sortedDates[0],
    end: sortedDates[sortedDates.length - 1],
  };
};

export const getIdentifiedCategoriesCount = (
  transactions: AnalysisTransactionDraftItem[],
): number =>
  new Set(
    transactions
      .map((transaction) => transaction.categoryLabel?.trim())
      .filter((category): category is string => Boolean(category)),
  ).size;
