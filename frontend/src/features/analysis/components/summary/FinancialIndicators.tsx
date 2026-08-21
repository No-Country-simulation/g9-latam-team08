import { BanknoteArrowDown, PiggyBank, Scale } from "lucide-react";
import Card from "../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../types/analysis-result";
import { formatCurrency, formatMonths, formatPercentage } from "../resultFormatters";

interface FinancialIndicatorsProps {
  result: FinancialAnalysisResult;
}

const getOptionalContent = (
  value: number | null | undefined,
  formatter: (value: number) => string,
): string => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "No disponible";
  }
  return formatter(value);
};

function FinancialIndicators({ result }: FinancialIndicatorsProps) {
  const indicators = [
    {
      icon: Scale,
      tone: "debt",
      label: "Nivel de endeudamiento",
      value: getOptionalContent(result.summary.debtLevel, formatPercentage),
    },
    {
      icon: BanknoteArrowDown,
      tone: "margin",
      label: "Margen mensual estimado",
      value: getOptionalContent(result.summary.monthlyMargin, formatCurrency),
    },
    {
      icon: PiggyBank,
      tone: "coverage",
      label: "Cobertura del fondo de emergencia",
      value: getOptionalContent(result.summary.emergencyCoverageMonths, formatMonths),
    },
  ];

  return (
    <div className="analysis-result__metrics-grid">
      {indicators.map((indicator) => (
        <Card
          key={indicator.label}
          className={`analysis-result__metric-card analysis-result__metric-card--${indicator.tone}`}
        >
          <span
            className={`analysis-result__metric-icon analysis-result__metric-icon--${indicator.tone}`}
            aria-hidden="true"
          >
            <indicator.icon size={16} />
          </span>
          <span className="analysis-result__metric-label">{indicator.label}</span>
          <strong
            className={`analysis-result__metric-value analysis-result__metric-value--${indicator.tone}`}
          >
            {indicator.value}
          </strong>
        </Card>
      ))}
    </div>
  );
}

export default FinancialIndicators;
