import Card from "../../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../../types/analysis-result";
import RecommendationAccordion from "./RecommendationAccordion";
import RecommendationsSummary from "./RecommendationsSummary";

interface RecommendationsTabProps {
  result: FinancialAnalysisResult;
}

function RecommendationsTab({ result }: RecommendationsTabProps) {
  return (
    <div className="analysis-result__tab-content">
      <RecommendationsSummary recommendations={result.recommendations} />

      <Card className="analysis-result__section-card">
        <div className="analysis-result__section-heading">
          <div>
            <h3>Plan de acción recomendado</h3>
            <p>Esta recomendación se basa en la información cargada para este análisis.</p>
          </div>
        </div>

        <RecommendationAccordion recommendations={result.recommendations} />
      </Card>
    </div>
  );
}

export default RecommendationsTab;
