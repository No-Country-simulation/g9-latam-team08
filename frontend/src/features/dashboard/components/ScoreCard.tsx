import { CircleCheck, Eye, TriangleAlert, type LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";
import type { FinancialStatus } from "../../../types/financial-analysis";
import { formatPercentage } from "../../../utils/formatters";
import ScoreGauge from "./ScoreGauge";
import "./ScoreCard.css";

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  modifier: string;
  gaugeColor: string;
}

const STATUS_CONFIG: Record<FinancialStatus, StatusConfig> = {
  HEALTHY: {
    label: "Saludable",
    icon: CircleCheck,
    modifier: "score-card__badge--healthy",
    gaugeColor: "var(--color-positive)",
  },
  OBSERVATION: {
    label: "En observación",
    icon: Eye,
    modifier: "score-card__badge--observation",
    gaugeColor: "var(--color-warning)",
  },
  RISK: {
    label: "En riesgo",
    icon: TriangleAlert,
    modifier: "score-card__badge--risk",
    gaugeColor: "var(--color-error)",
  },
};

interface ScoreCardProps {
  status: FinancialStatus;
  score: number;
  monthlyIncome: number;
  totalExpenses: number;
}

function ScoreCard({ status, score, monthlyIncome, totalExpenses }: ScoreCardProps) {
  const { label, icon: Icon, modifier, gaugeColor } = STATUS_CONFIG[status];
  const expenseRatio = monthlyIncome > 0 ? totalExpenses / monthlyIncome : 0;

  return (
    <Card className="score-card">
      <div className="score-card__info">
        <h2 className="score-card__title">Salud financiera</h2>

        <span className={`score-card__badge ${modifier}`}>
          <Icon size={16} aria-hidden="true" />
          {label}
        </span>

        <p className="score-card__description">
          Tus gastos representan el {formatPercentage(expenseRatio)} de tus ingresos
        </p>
      </div>

      <ScoreGauge value={score} color={gaugeColor} />
    </Card>
  );
}

export default ScoreCard;
