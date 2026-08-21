import { AlertTriangle, ListChecks, Target } from "lucide-react";
import Card from "../../../../components/ui/Card";
import type {
  AnalysisRecommendationPriority,
  FinancialAnalysisResult,
} from "../../types/analysis-result";
import { getPriorityShortLabel } from "../resultFormatters";

interface RecommendationsSummaryProps {
  recommendations: FinancialAnalysisResult["recommendations"];
}

const priorityRank: AnalysisRecommendationPriority[] = ["HIGH", "MEDIUM", "LOW"];

function RecommendationsSummary({ recommendations }: RecommendationsSummaryProps) {
  const counts = {
    HIGH: recommendations.filter((item) => item.priority === "HIGH").length,
    MEDIUM: recommendations.filter((item) => item.priority === "MEDIUM").length,
    LOW: recommendations.filter((item) => item.priority === "LOW").length,
  };

  const highestPriority =
    priorityRank.find((priority) => counts[priority] > 0) ?? null;

  return (
    <div className="analysis-result__recommendations-summary">
      <Card className="analysis-result__metric-card">
        <span className="analysis-result__metric-icon" aria-hidden="true">
          <ListChecks size={16} />
        </span>
        <span className="analysis-result__metric-label">Cantidad de recomendaciones</span>
        <strong className="analysis-result__metric-value">{recommendations.length}</strong>
      </Card>

      <Card className="analysis-result__metric-card">
        <span className="analysis-result__metric-icon" aria-hidden="true">
          <AlertTriangle size={16} />
        </span>
        <span className="analysis-result__metric-label">Prioridad más alta detectada</span>
        <strong className="analysis-result__metric-value">
          {highestPriority ? getPriorityShortLabel(highestPriority) : "No disponible"}
        </strong>
      </Card>

      <Card className="analysis-result__metric-card">
        <span className="analysis-result__metric-icon" aria-hidden="true">
          <Target size={16} />
        </span>
        <span className="analysis-result__metric-label">Distribución por prioridad</span>
        <strong className="analysis-result__metric-value">
          Alta {counts.HIGH} · Media {counts.MEDIUM} · Baja {counts.LOW}
        </strong>
      </Card>
    </div>
  );
}

export default RecommendationsSummary;
