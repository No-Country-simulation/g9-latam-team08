import type { ReactNode } from "react";
import Card from "../../../components/ui/Card";

type MetricTone = "teal" | "blue" | "purple" | "amber";

interface GoalsMetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  tone: MetricTone;
}

function GoalsMetricCard({ icon, label, value, hint, tone }: GoalsMetricCardProps) {
  return (
    <Card className={`goals-metric-card goals-metric-card--${tone}`}>
      <span className="goals-metric-card__icon">{icon}</span>
      <span className="goals-metric-card__label">{label}</span>
      <strong className="goals-metric-card__value">{value}</strong>
      <span className="goals-metric-card__hint">{hint}</span>
    </Card>
  );
}

export default GoalsMetricCard;
