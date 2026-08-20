import type { LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";
import "./StatCard.css";

export type StatTone = "primary" | "secondary" | "positive" | "warning" | "error";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: StatTone;
}

function StatCard({ icon: Icon, label, value, tone = "primary" }: StatCardProps) {
  return (
    <Card className="stat-card">
      <span className={`stat-card__icon stat-card__icon--${tone}`} aria-hidden="true">
        <Icon size={22} />
      </span>

      <span className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
      </span>
    </Card>
  );
}

export default StatCard;
