import { Sparkles } from "lucide-react";
import Card from "../../../components/ui/Card";
import type { FinancialRecommendation } from "../../../types/financial-analysis";
import "./RecommendationsCard.css";

interface RecommendationsCardProps {
  recommendations: FinancialRecommendation[];
}

function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <Card className="recommendations-card">
      <div className="recommendations-card__header">
        <h3 className="recommendations-card__title">Recomendaciones</h3>
        <Sparkles size={18} className="recommendations-card__icon" aria-hidden="true" />
      </div>

      <ol className="recommendations-card__list">
        {recommendations.map((recommendation, index) => (
          <li key={recommendation.id} className="recommendations-card__item">
            <span className="recommendations-card__index" aria-hidden="true">
              {index + 1}
            </span>
            <span className="recommendations-card__content">
              <span>{recommendation.message}</span>
              {recommendation.reason && (
                <span className="recommendations-card__reason">{recommendation.reason}</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default RecommendationsCard;
