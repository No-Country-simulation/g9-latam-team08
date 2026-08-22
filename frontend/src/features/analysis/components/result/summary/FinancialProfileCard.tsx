import Card from "../../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../../types/analysis-result";
import { formatConfidence, getProfileLabel } from "../resultFormatters";

interface FinancialProfileCardProps {
  summary: FinancialAnalysisResult["summary"];
}

function FinancialProfileCard({ summary }: FinancialProfileCardProps) {
  const confidence = formatConfidence(summary.confidence);
  const profileLabel = getProfileLabel(summary.financialProfile);
  const toneClassName = `analysis-result__status-card--${summary.financialProfile.toLowerCase()}`;

  return (
    <Card className={`analysis-result__status-card ${toneClassName}`}>
      <span className="analysis-result__eyebrow">Perfil financiero</span>
      <strong className="analysis-result__status-value">{profileLabel}</strong>
      <p className="analysis-result__status-description">
        Este estado resume la lectura general de tus ingresos, gastos y capacidad de
        respuesta.
      </p>
      {confidence ? (
        <p className="analysis-result__status-meta">
          Confianza del análisis: <strong>{confidence}</strong>
        </p>
      ) : null}
    </Card>
  );
}

export default FinancialProfileCard;

