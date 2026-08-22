import { Bus, ChevronRight, Pill, Receipt, ShoppingCart, Tv, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import type { ClassifiedTransaction } from "../../../types/financial-analysis";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import CategoryBadge from "./CategoryBadge";
import ConfidenceBar from "./ConfidenceBar";
import "./TransactionsTable.css";

// Ícono decorativo por categoría (no forma parte del contrato de datos: si la categoría no
// tiene un ícono asignado, se usa un ícono genérico de recibo como fallback).
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Alimentación: ShoppingCart,
  Transporte: Bus,
  Entretenimiento: Tv,
  Salud: Pill,
};

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] ?? Receipt;
}

interface TransactionsTableProps {
  transactions: ClassifiedTransaction[];
}

function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <Card className="transactions-table">
      <h3 className="transactions-table__title">Transacciones clasificadas</h3>

      <div className="transactions-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Descripción</th>
              <th scope="col">Monto</th>
              <th scope="col">Categoría</th>
              <th scope="col">Confianza</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.mainCategory);

              return (
                <tr key={transaction.id}>
                  <td>
                    <span className="transactions-table__description">
                      <span className="transactions-table__icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      {transaction.description}
                    </span>
                  </td>
                  <td className="transactions-table__amount">{formatCurrency(transaction.amount)}</td>
                  <td>
                    <CategoryBadge category={transaction.mainCategory} />
                  </td>
                  <td>
                    {typeof transaction.confidence === "number" && (
                      <span className="transactions-table__confidence">
                        <span>{formatPercentage(transaction.confidence)}</span>
                        <ConfidenceBar value={transaction.confidence} />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link className="transactions-table__footer-link" to="/dashboard/transacciones">
        Ver todas las transacciones
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </Card>
  );
}

export default TransactionsTable;
