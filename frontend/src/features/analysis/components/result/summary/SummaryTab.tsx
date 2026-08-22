import { ArrowRight } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import Card from "../../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../../types/analysis-result";
import { getPriorityLabel } from "../resultFormatters";
import CategoryOverview from "./CategoryOverview";
import FinancialIndicators from "./FinancialIndicators";
import FinancialProfileCard from "./FinancialProfileCard";
import InsightsList from "./InsightsList";

interface SummaryTabProps {
  result: FinancialAnalysisResult;
  onViewRecommendations: () => void;
}

function SummaryTab({ result, onViewRecommendations }: SummaryTabProps) {
  const featuredRecommendations = result.recommendations.slice(0, 2);

  return (
    <div className="analysis-result__tab-content">
      <div className="analysis-result__summary-grid">
        <FinancialProfileCard summary={result.summary} />
        <FinancialIndicators result={result} />
      </div>

      <CategoryOverview categories={result.expenses.byCategory} />

      <InsightsList
        title="Insights principales"
        description="Hallazgos destacados a partir de la información procesada."
        insights={result.topInsights.slice(0, 3)}
        emptyMessage="No hay insights principales para mostrar."
      />

      <Card className="analysis-result__section-card">
        <div className="analysis-result__section-heading">
          <div>
            <h3>Recomendaciones destacadas</h3>
            <p>Priorizá primero las acciones con mayor impacto potencial.</p>
          </div>
          {result.recommendations.length > 0 ? (
            <Button type="button" variant="secondary" onClick={onViewRecommendations}>
              Ver recomendaciones
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          ) : null}
        </div>

        {featuredRecommendations.length === 0 ? (
          <p className="analysis-result__empty-state">
            No hay recomendaciones disponibles.
          </p>
        ) : (
          <div className="analysis-result__recommendation-cards">
            {featuredRecommendations.map((recommendation) => (
              <article
                key={recommendation.id}
                className="analysis-result__recommendation-card"
              >
                <div className="analysis-result__recommendation-header">
                  <span
                    className={`analysis-result__priority-badge analysis-result__priority-badge--${recommendation.priority.toLowerCase()}`}
                  >
                    {getPriorityLabel(recommendation.priority)}
                  </span>
                </div>
                <h4>{recommendation.title}</h4>
                <p>{recommendation.summary}</p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default SummaryTab;
