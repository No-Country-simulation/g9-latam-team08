import Card from "../../../../components/ui/Card";
import type { AnalysisResultCategorySummary } from "../../types/analysis-result";
import { formatCurrency } from "../resultFormatters";

interface CategoryOverviewProps {
  categories: AnalysisResultCategorySummary[];
}

function CategoryOverview({ categories }: CategoryOverviewProps) {
  return (
    <Card className="analysis-result__section-card">
      <div className="analysis-result__section-heading">
        <div>
          <h3>Resumen por categoría</h3>
          <p>Visualización compacta de los gastos clasificados.</p>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="analysis-result__empty-state">
          No hay gastos clasificados para mostrar.
        </p>
      ) : (
        <div className="analysis-result__category-list">
          {categories.map((category) => {
            const safePercentage = Math.min(100, Math.max(0, category.percentage));
            return (
              <div key={category.category} className="analysis-result__category-item">
                <div className="analysis-result__category-header">
                  <strong>{category.category}</strong>
                  <span>{formatCurrency(category.amount)}</span>
                </div>
                <div className="analysis-result__category-progress" aria-hidden="true">
                  <span
                    className="analysis-result__category-progress-fill"
                    style={{ width: `${safePercentage}%` }}
                  />
                </div>
                <div className="analysis-result__category-meta">
                  <span>{category.percentage}%</span>
                  <span>{category.transactionsCount} transacciones</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default CategoryOverview;
