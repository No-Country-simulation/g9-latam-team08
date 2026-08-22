import Card from "../../../../components/ui/Card";
import type { AnalysisTransactionDraftItem } from "../../types/analysis-draft";
import {
  formatTransactionAmount,
  formatTransactionDate,
  getIdentifiedCategoriesCount,
  getTransactionPeriod,
} from "./transactionUtils";

interface TransactionsSummaryProps {
  transactions: AnalysisTransactionDraftItem[];
}

function TransactionsSummary({ transactions }: TransactionsSummaryProps) {
  const transactionCount = transactions.length;
  const totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );
  const period = getTransactionPeriod(transactions);
  const categoriesCount = getIdentifiedCategoriesCount(transactions);

  return (
    <Card className="analysis-summary-card transactions-summary-card">
      <div className="transactions-summary-card__block">
        <p className="analysis-summary-card__label">TRANSACCIONES CARGADAS</p>
        <p className="analysis-summary-card__value transactions-summary-card__value-sm">
          {transactionCount}
        </p>
      </div>

      <div className="transactions-summary-card__block">
        <p className="analysis-summary-card__label">TOTAL CARGADO</p>
        <p className="analysis-summary-card__value">{formatTransactionAmount(totalAmount)}</p>
      </div>

      <div className="transactions-summary-card__details" aria-label="Resumen del período">
        <div>
          <p className="analysis-summary-card__label">PERÍODO ANALIZADO</p>
          <p className="analysis-summary-card__description">
            {period.start && period.end
              ? `${formatTransactionDate(period.start)} -> ${formatTransactionDate(period.end)}`
              : "Todavía no hay transacciones cargadas."}
          </p>
        </div>

        <div>
          <p className="analysis-summary-card__label">CATEGORÍAS IDENTIFICADAS</p>
          <p className="analysis-summary-card__description">
            {categoriesCount > 0
              ? `${categoriesCount} categoría${categoriesCount === 1 ? "" : "s"}`
              : "Se asignarán durante el análisis."}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default TransactionsSummary;
