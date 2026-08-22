import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import type { SavingsDistributionItem } from "../utils/goalCalculations";

import "./SavingsDistributionCard.css";

interface SavingsDistributionCardProps {
  items: SavingsDistributionItem[];
}

function SavingsDistributionCard({ items }: SavingsDistributionCardProps) {
  if (items.length === 0) {
    return (
      <Card className="goals-distribution-card">
        <div className="goals-sidebar-card__header">
          <h3>Distribución del ahorro por metas</h3>
          <p>Todavía no hay metas activas o pausadas para distribuir en este resumen.</p>
        </div>
      </Card>
    );
  }

  const gradientStops = items
    .map((item, index) => {
      const previousPercentage = items
        .slice(0, index)
        .reduce((total, currentItem) => total + currentItem.percentage, 0);
      const nextPercentage = previousPercentage + item.percentage;

      return `${item.color} ${previousPercentage}% ${nextPercentage}%`;
    })
    .join(", ");

  const donutStyle = {
    background:
      items.length > 0
        ? `conic-gradient(${gradientStops})`
        : "conic-gradient(rgba(11, 21, 51, 0.08) 0% 100%)",
  };

  return (
    <Card className="goals-distribution-card">
      <div className="goals-sidebar-card__header">
        <h3>Distribución del ahorro por metas</h3>
        <p>Cómo se reparte hoy tu avance entre tus objetivos activos.</p>
      </div>

      <div className="goals-distribution-card__chart-wrap">
        <div className="goals-distribution-card__donut" style={donutStyle} aria-hidden="true">
          <div className="goals-distribution-card__donut-center">
            <span>Ahorro</span>
            <strong>Total</strong>
          </div>
        </div>
      </div>

      <ul className="goals-distribution-card__legend">
        {items.map((item) => (
          <li key={item.id}>
            <span className="goals-distribution-card__legend-color" style={{ backgroundColor: item.color }} />
            <div className="goals-distribution-card__legend-copy">
              <strong>{item.name}</strong>
              <span>{formatCurrency(item.savedAmount)}</span>
            </div>
            <strong>{item.percentage}%</strong>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SavingsDistributionCard;
