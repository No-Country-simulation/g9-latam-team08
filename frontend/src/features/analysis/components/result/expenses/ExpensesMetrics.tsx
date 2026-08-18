import Card from "../../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../../types/analysis-result";
import { formatCurrency } from "../resultFormatters";

interface ExpensesMetricsProps {
  expenses: FinancialAnalysisResult["expenses"];
}

function ExpensesMetrics({ expenses }: ExpensesMetricsProps) {
  const metrics = [
    {
      label: "Total de gastos",
      value: formatCurrency(expenses.totalExpenses),
    },
    {
      label: "Categoría principal",
      value: expenses.mainCategory ?? "No disponible",
    },
    {
      label: "Promedio diario",
      value:
        typeof expenses.dailyAverage === "number"
          ? formatCurrency(expenses.dailyAverage)
          : "No disponible",
    },
    {
      label: "Transacciones clasificadas",
      value: String(expenses.transactionsCount),
    },
  ];

  return (
    <div className="analysis-result__metrics-grid">
      {metrics.map((metric) => (
        <Card key={metric.label} className="analysis-result__metric-card">
          <span className="analysis-result__metric-label">{metric.label}</span>
          <strong className="analysis-result__metric-value">{metric.value}</strong>
        </Card>
      ))}
    </div>
  );
}

export default ExpensesMetrics;

