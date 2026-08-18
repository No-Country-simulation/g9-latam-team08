import type { AnalysisTransactionDraftItem } from "../../types/analysis-draft";
import TransactionRow from "./TransactionRow";

interface TransactionsTableProps {
  transactions: AnalysisTransactionDraftItem[];
  error?: string;
  onEdit: (index: number, transaction: AnalysisTransactionDraftItem) => void;
  onRemove: (index: number) => void;
  onCreate: () => void;
}

function TransactionsTable({
  transactions,
  error,
  onEdit,
  onRemove,
  onCreate,
}: TransactionsTableProps) {
  return (
    <div className="transactions-table">
      {transactions.length === 0 ? (
        <div className="analysis-empty-state transactions-empty-state">
          <p>Todavía no cargaste transacciones.</p>
          <button
            type="button"
            className="transactions-empty-state__button"
            onClick={onCreate}
          >
            + Nueva transacción
          </button>
        </div>
      ) : (
        <div
          className="transactions-table__scroll"
          role="region"
          aria-label="Tabla de transacciones"
        >
          <table className="transactions-table__element">
            <thead>
              <tr>
                <th>DESCRIPCIÓN</th>
                <th>MONTO</th>
                <th>FECHA</th>
                <th>MEDIO DE PAGO</th>
                <th>MODALIDAD</th>
                <th>CATEGORÍA</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <TransactionRow
                  key={transaction.id}
                  index={index}
                  transaction={transaction}
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error ? (
        <p className="analysis-form-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default TransactionsTable;
