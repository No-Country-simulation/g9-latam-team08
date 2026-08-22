import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import BarChart, { type BarChartSeries } from "./BarChart";
import "./MonthlyEvolutionCard.css";

export interface MonthlyEvolutionPoint {
  month: string;
  income: number;
  expenses: number;
}

interface MonthlyEvolutionCardProps {
  data: MonthlyEvolutionPoint[];
}

function MonthlyEvolutionCard({ data }: MonthlyEvolutionCardProps) {
  const categories = data.map((point) => point.month);

  const series: BarChartSeries[] = [
    {
      label: "Ingresos",
      color: "var(--color-primary)",
      values: data.map((point) => point.income),
    },
    {
      label: "Gastos",
      color: "var(--color-secondary)",
      values: data.map((point) => point.expenses),
    },
  ];

  return (
    <Card className="monthly-evolution-card">
      <div className="monthly-evolution-card__header">
        <h3 className="monthly-evolution-card__title">Evolución mensual</h3>

        <ul className="monthly-evolution-card__legend">
          {series.map((item) => (
            <li key={item.label} className="monthly-evolution-card__legend-item">
              <span
                className="monthly-evolution-card__legend-dot"
                style={{ background: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <BarChart categories={categories} series={series} valueFormatter={formatCurrency} />
    </Card>
  );
}

export default MonthlyEvolutionCard;
