import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { AnalysisResultRecommendation } from "../../types/analysis-result";
import { getPriorityLabel } from "../resultFormatters";

interface RecommendationAccordionProps {
  recommendations: AnalysisResultRecommendation[];
}

function RecommendationAccordion({ recommendations }: RecommendationAccordionProps) {
  const [openRecommendationId, setOpenRecommendationId] = useState<string | null>(
    recommendations[0]?.id ?? null,
  );

  const handleToggle = (recommendationId: string) => {
    setOpenRecommendationId((currentId) =>
      currentId === recommendationId ? null : recommendationId,
    );
  };

  if (recommendations.length === 0) {
    return (
      <p className="analysis-result__empty-state">
        No hay recomendaciones disponibles.
      </p>
    );
  }

  return (
    <div className="analysis-result__accordion">
      {recommendations.map((recommendation) => {
        const isOpen = openRecommendationId === recommendation.id;
        const panelId = `analysis-recommendation-panel-${recommendation.id}`;

        return (
          <article key={recommendation.id} className="analysis-result__accordion-item">
            <button
              type="button"
              className="analysis-result__accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleToggle(recommendation.id)}
            >
              <div className="analysis-result__accordion-summary">
                <span
                  className={`analysis-result__priority-badge analysis-result__priority-badge--${recommendation.priority.toLowerCase()}`}
                >
                  {getPriorityLabel(recommendation.priority)}
                </span>
                <strong>{recommendation.title}</strong>
                <p>{recommendation.summary}</p>
              </div>
              <ChevronDown
                className={`analysis-result__accordion-chevron${
                  isOpen ? " analysis-result__accordion-chevron--open" : ""
                }`}
                size={18}
                aria-hidden="true"
              />
            </button>

            {isOpen ? (
              <div id={panelId} className="analysis-result__accordion-panel">
                {recommendation.explanation ? (
                  <div>
                    <h4>Explicación</h4>
                    <p>{recommendation.explanation}</p>
                  </div>
                ) : null}

                {recommendation.currentSituation ? (
                  <div>
                    <h4>Situación actual</h4>
                    <p>{recommendation.currentSituation}</p>
                  </div>
                ) : null}

                {recommendation.target ? (
                  <div>
                    <h4>Objetivo</h4>
                    <p>{recommendation.target}</p>
                  </div>
                ) : null}

                {recommendation.potentialImpact ? (
                  <div>
                    <h4>Impacto potencial</h4>
                    <p>{recommendation.potentialImpact}</p>
                  </div>
                ) : null}

                {recommendation.recommendedActions &&
                recommendation.recommendedActions.length > 0 ? (
                  <div>
                    <h4>Acciones sugeridas</h4>
                    <ul className="analysis-result__actions-list">
                      {recommendation.recommendedActions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default RecommendationAccordion;
