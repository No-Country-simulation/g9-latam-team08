import { CalendarRange, Pencil, Wallet } from "lucide-react";
import type { AnalysisTransactionDraftItem } from "../../types/analysis-draft";
import {
  formatTransactionAmount,
  formatTransactionDate,
  getTransactionPeriod,
  paymentMethodLabels,
} from "../transactions/transactionUtils";

interface TransactionsReviewProps {
  transactions: AnalysisTransactionDraftItem[];
  totalAmount: number;
  onEdit: () => void;
}

function TransactionsReview({
  transactions,
  totalAmount,
  onEdit,
}: TransactionsReviewProps) {
  const period = getTransactionPeriod(transactions);

  return (
    <section className="analysis-card review-card">
      <div className="review-card__header">
        <div className="review-card__header-copy">
          <h3>Transacciones</h3>
          <p>Revisá el detalle de movimientos que se usará en el análisis.</p>
        </div>

        <button
          type="button"
          className="review-card__edit-button"
          onClick={onEdit}
          aria-label="Editar transacciones"
        >
          <Pencil size={16} aria-hidden="true" />
          Editar
        </button>
      </div>

      <div className="review-card__metrics">
        <div className="review-card__metric">
          <p className="analysis-summary-card__label">TRANSACCIONES</p>
          <p className="analysis-summary-card__description">
            {transactions.length} cargada{transactions.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="review-card__metric">
          <p className="analysis-summary-card__label">PERÍODO</p>
          <p className="analysis-summary-card__description">
            <CalendarRange size={15} aria-hidden="true" />
            {period.start && period.end
              ? period.start === period.end
                ? formatTransactionDate(period.start)
                : `${formatTransactionDate(period.start)} -> ${formatTransactionDate(period.end)}`
              : "Sin período disponible"}
          </p>
        </div>
        <div className="review-card__metric">
          <p className="analysis-summary-card__label">TOTAL CARGADO</p>
          <p className="analysis-summary-card__description">
            <Wallet size={15} aria-hidden="true" />
            {formatTransactionAmount(totalAmount)}
          </p>
        </div>
      </div>

      {transactions.length > 0 ? (
        <div
          className="review-transactions__scroll"
          role="region"
          aria-label="Vista previa de transacciones"
        >
          <table className="review-transactions__table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Medio de pago</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{formatTransactionAmount(transaction.amount)}</td>
                  <td>{formatTransactionDate(transaction.date)}</td>
                  <td>{paymentMethodLabels[transaction.paymentMethod]}</td>
                  <td>
                    {transaction.categoryLabel ? (
                      <span className="transactions-table__badge">{transaction.categoryLabel}</span>
                    ) : (
                      <span className="transactions-table__badge transactions-table__badge--pending">
                        Se clasificará al analizar
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="analysis-empty-state">
          <p>Todavía no cargaste transacciones.</p>
        </div>
      )}
    </section>
  );
}

export default TransactionsReview;
