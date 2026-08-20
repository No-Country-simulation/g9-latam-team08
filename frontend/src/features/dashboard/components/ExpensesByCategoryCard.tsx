import Card from "../../../components/ui/Card";
import type { ExpenseCategorySummary } from "../../../types/financial-analysis";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import { getCategoryColor } from "./categoryColors";
import DonutChart from "./DonutChart";
import "./ExpensesByCategoryCard.css";

interface ExpensesByCategoryCardProps {
  categories: ExpenseCategorySummary[];
  total: number;
}

function ExpensesByCategoryCard({ categories, total }: ExpensesByCategoryCardProps) {
  const segments = categories.map((category) => ({
    label: category.category,
    value: category.amount,
    color: getCategoryColor(category.category),
  }));

  return (
    <Card className="expenses-category-card">
      <h3 className="expenses-category-card__title">Gastos por categoría</h3>

      <div className="expenses-category-card__content">
        <DonutChart segments={segments} centerLabel="Total" centerValue={formatCurrency(total)} />

        <ul className="expenses-category-card__legend">
          {categories.map((category) => (
            <li key={category.category} className="expenses-category-card__legend-item">
              <span
                className="expenses-category-card__legend-dot"
                style={{ background: getCategoryColor(category.category) }}
                aria-hidden="true"
              />
              <span className="expenses-category-card__legend-label">{category.category}</span>
              <span className="expenses-category-card__legend-percentage">
                {formatPercentage(category.percentage)}
              </span>
              <span className="expenses-category-card__legend-amount">
                {formatCurrency(category.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="expenses-category-card__total">
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </Card>
  );
}

export default ExpensesByCategoryCard;
