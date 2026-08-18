import Card from "../../../../../components/ui/Card";
import type { AnalysisResultTransaction } from "../../../types/analysis-result";
import { formatConfidence, formatCurrency, formatResultDate } from "../resultFormatters";

interface ClassifiedTransactionsTableProps {
  transactions: AnalysisResultTransaction[];
}

function ClassifiedTransactionsTable({ transactions }: ClassifiedTransactionsTableProps) {
  return (
    <Card className="analysis-result__section-card">
      <div className="analysis-result__section-heading">
        <div>
          <h3>Transacciones clasificadas</h3>
          <p>Detalle de los movimientos tomados en cuenta para el análisis.</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="analysis-result__empty-state">
          No hay transacciones clasificadas.
        </p>
      ) : (
        <div
          className="analysis-result__table-region"
          role="region"
          aria-label="Tabla de transacciones clasificadas"
        >
          <div className="analysis-result__table-scroll">
            <table className="analysis-result__table">
              <caption className="analysis-result__sr-only">
                Transacciones clasificadas del análisis
              </caption>
              <thead>
                <tr>
                  <th scope="col">Descripción</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Subcategoría</th>
                  <th scope="col">Confianza</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>{formatCurrency(transaction.amount)}</td>
                    <td>{formatResultDate(transaction.date) ?? "No disponible"}</td>
                    <td>
                      <span className="analysis-result__table-badge">
                        {transaction.category}
                      </span>
                    </td>
                    <td>{transaction.subcategory ?? "—"}</td>
                    <td>{formatConfidence(transaction.confidence) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

export default ClassifiedTransactionsTable;

