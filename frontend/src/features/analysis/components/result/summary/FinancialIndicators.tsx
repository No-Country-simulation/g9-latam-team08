import Card from "../../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../../types/analysis-result";
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
      label: "Nivel de endeudamiento",
      value: getOptionalContent(result.summary.debtLevel, formatPercentage),
    },
    {
      label: "Margen mensual estimado",
      value: getOptionalContent(result.summary.monthlyMargin, formatCurrency),
    },
    {
      label: "Cobertura del fondo de emergencia",
      value: getOptionalContent(result.summary.emergencyCoverageMonths, formatMonths),
    },
    {
      label: "Total de gastos",
      value: formatCurrency(result.expenses.totalExpenses),
    },
  ];

  return (
    <div className="analysis-result__metrics-grid">
      {indicators.map((indicator) => (
        <Card key={indicator.label} className="analysis-result__metric-card">
          <span className="analysis-result__metric-label">{indicator.label}</span>
          <strong className="analysis-result__metric-value">{indicator.value}</strong>
        </Card>
      ))}
    </div>
  );
}

export default FinancialIndicators;

