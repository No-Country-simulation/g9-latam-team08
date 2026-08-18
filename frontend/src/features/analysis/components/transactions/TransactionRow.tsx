import { Pencil, Trash2 } from "lucide-react";
import type { AnalysisTransactionDraftItem } from "../../types/analysis-draft";
import {
  formatTransactionAmount,
  formatTransactionDate,
  movementTypeLabels,
  paymentMethodLabels,
  purchaseModeLabels,
} from "./transactionUtils";

interface TransactionRowProps {
  index: number;
  transaction: AnalysisTransactionDraftItem;
  onEdit: (index: number, transaction: AnalysisTransactionDraftItem) => void;
  onRemove: (index: number) => void;
}

function TransactionRow({
  index,
  transaction,
  onEdit,
  onRemove,
}: TransactionRowProps) {
  return (
    <tr className="transactions-table__row">
      <td className="transactions-table__cell transactions-table__cell--description">
        <div className="transactions-table__primary">{transaction.description}</div>
        <div className="transactions-table__secondary">
          {movementTypeLabels[transaction.movementType]}
        </div>
      </td>
      <td className="transactions-table__cell transactions-table__cell--numeric">
        {formatTransactionAmount(transaction.amount)}
      </td>
      <td className="transactions-table__cell">{formatTransactionDate(transaction.date)}</td>
      <td className="transactions-table__cell">
        {paymentMethodLabels[transaction.paymentMethod]}
      </td>
      <td className="transactions-table__cell">
        {purchaseModeLabels[transaction.purchaseMode]}
      </td>
      <td className="transactions-table__cell">
        {transaction.categoryLabel ? (
          <span className="transactions-table__badge">{transaction.categoryLabel}</span>
        ) : (
          <span className="transactions-table__badge transactions-table__badge--pending">
            Se clasificará al analizar
          </span>
        )}
      </td>
      <td className="transactions-table__cell transactions-table__cell--actions">
        <div className="transactions-table__actions">
          <button
            type="button"
            className="transactions-table__icon-button"
            onClick={() => onEdit(index, transaction)}
            aria-label={`Editar transacción ${transaction.description}`}
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="transactions-table__icon-button transactions-table__icon-button--danger"
            onClick={() => onRemove(index)}
            aria-label={`Eliminar transacción ${transaction.description}`}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TransactionRow;
