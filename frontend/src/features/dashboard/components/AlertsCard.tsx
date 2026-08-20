import { Bell, OctagonAlert, TriangleAlert, type LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";
import "./AlertsCard.css";

export type AlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface FinancialAlert {
  id: string;
  message: string;
  severity: AlertSeverity;
}

interface SeverityConfig {
  icon: LucideIcon;
  modifier: string;
}

const SEVERITY_CONFIG: Record<AlertSeverity, SeverityConfig> = {
  INFO: {
    icon: Bell,
    modifier: "alerts-card__item--info",
  },
  WARNING: {
    icon: TriangleAlert,
    modifier: "alerts-card__item--warning",
  },
  CRITICAL: {
    icon: OctagonAlert,
    modifier: "alerts-card__item--critical",
  },
};

interface AlertsCardProps {
  alerts: FinancialAlert[];
}

function AlertsCard({ alerts }: AlertsCardProps) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="alerts-card">
      <h3 className="alerts-card__title">Alertas</h3>

      <ul className="alerts-card__list">
        {alerts.map((alert) => {
          const { icon: Icon, modifier } = SEVERITY_CONFIG[alert.severity];

          return (
            <li key={alert.id} className={`alerts-card__item ${modifier}`}>
              <Icon size={16} aria-hidden="true" />
              {alert.message}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default AlertsCard;
