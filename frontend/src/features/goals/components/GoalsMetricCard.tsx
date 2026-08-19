import type { ReactNode } from "react";
import Card from "../../../components/ui/Card";

import "./GoalsMetricCard.css";

interface GoalsMetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: "teal" | "blue" | "purple" | "amber";
}

function GoalsMetricCard({
  icon,
  label,
  value,
  hint,
  tone = "teal",
}: GoalsMetricCardProps) {
  return (
    <Card className={`goals-metric-card goals-metric-card--${tone}`}>
      <div className={`goals-metric-card__icon goals-metric-card__icon--${tone}`}>{icon}</div>
      <span className="goals-metric-card__label">{label}</span>
      <strong className="goals-metric-card__value">{value}</strong>
      <p className="goals-metric-card__hint">{hint}</p>
    </Card>
  );
}

export default GoalsMetricCard;
