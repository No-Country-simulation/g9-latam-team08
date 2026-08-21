import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import type { SavingsDistributionItem } from "../utils/goalCalculations";

interface SavingsDistributionCardProps {
  items: SavingsDistributionItem[];
}

function SavingsDistributionCard({ items }: SavingsDistributionCardProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="savings-distribution">
      <h3 className="savings-distribution__title">Distribución de ahorro</h3>
      <div className="savings-distribution__bar">
        {items.map((item) => (
          <div
            key={item.id}
            className="savings-distribution__segment"
            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
            title={`${item.name}: ${item.percentage}%`}
          />
        ))}
      </div>
      <ul className="savings-distribution__legend">
        {items.map((item) => (
          <li key={item.id} className="savings-distribution__legend-item">
            <span
              className="savings-distribution__dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="savings-distribution__legend-label">{item.name}</span>
            <span className="savings-distribution__legend-value">
              {formatCurrency(item.savedAmount)} ({item.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default SavingsDistributionCard;
