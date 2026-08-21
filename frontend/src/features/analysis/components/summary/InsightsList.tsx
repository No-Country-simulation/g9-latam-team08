import Card from "../../../../components/ui/Card";
import type { AnalysisResultInsight } from "../../types/analysis-result";

interface InsightsListProps {
  title: string;
  description: string;
  insights: AnalysisResultInsight[];
  emptyMessage: string;
}

function InsightsList({ title, description, insights, emptyMessage }: InsightsListProps) {
  return (
    <Card className="analysis-result__section-card">
      <div className="analysis-result__section-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {insights.length === 0 ? (
        <p className="analysis-result__empty-state">{emptyMessage}</p>
      ) : (
        <div className="analysis-result__insights-list">
          {insights.map((insight) => (
            <article key={insight.id} className="analysis-result__insight-card">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </article>
          ))}
        </div>
      )}
    </Card>
  );
}

export default InsightsList;
