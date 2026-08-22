import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { AnalysisDraftFormValues } from "../../schemas/analysis.schema";
import {
  formatTransactionDate,
  getTransactionPeriod,
} from "../transactions/transactionUtils";
import FinancialReview from "./FinancialReview";
import ReviewSummary from "./ReviewSummary";
import TransactionsReview from "./TransactionsReview";
import "./ReviewStep.css";

interface ReviewStepProps {
  onEditFinancialData: () => void;
  onEditTransactions: () => void;
}

function ReviewStep({
  onEditFinancialData,
  onEditTransactions,
}: ReviewStepProps) {
  const { control } = useFormContext<AnalysisDraftFormValues>();
  const financialData = useWatch({
    control,
    name: "financialData",
  });
  const transactions = useWatch({
    control,
    name: "transactions",
  }) ?? [];

  const totalIncome = useMemo(
    () =>
      (financialData?.incomes ?? []).reduce(
        (total, income) => total + income.monthlyAmount,
        0,
      ),
    [financialData],
  );

  const totalTransactionsAmount = useMemo(
    () => transactions.reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  );

  const period = useMemo(() => getTransactionPeriod(transactions), [transactions]);
  const formattedPeriodLabel =
    period.start && period.end
      ? period.start === period.end
        ? formatTransactionDate(period.start)
        : `${formatTransactionDate(period.start)} -> ${formatTransactionDate(period.end)}`
      : "Sin período disponible";

  if (!financialData) {
    return null;
  }

  return (
    <div className="review-step">
      <section className="analysis-card review-step__intro">
        <h2>Revisión</h2>
        <p>Revisá la información antes de realizar el análisis.</p>
      </section>

      <div className="review-step__layout">
        <div className="review-step__main">
          <FinancialReview
            financialData={financialData}
            totalIncome={totalIncome}
            onEdit={onEditFinancialData}
          />
          <TransactionsReview
            transactions={transactions}
            totalAmount={totalTransactionsAmount}
            onEdit={onEditTransactions}
          />
          <section className="analysis-banner review-step__next">
            <p>
              Al realizar el análisis, FinanceAI utilizará la información cargada
              para clasificar las transacciones, calcular indicadores financieros,
              evaluar tu perfil y generar recomendaciones.
            </p>
          </section>
        </div>

        <aside className="review-step__sidebar">
          <ReviewSummary
            totalIncome={totalIncome}
            transactionCount={transactions.length}
            totalTransactionsAmount={totalTransactionsAmount}
            periodLabel={formattedPeriodLabel}
          />
        </aside>
      </div>
    </div>
  );
}

export default ReviewStep;
