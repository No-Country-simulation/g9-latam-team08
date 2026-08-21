import { Bell, CalendarClock, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import Card from "../../../components/ui/Card";
import type { NotificationSummary } from "../utils/notificationCalculations";

interface NotificationsSummaryCardProps {
  summary: NotificationSummary;
}

const items = [
  {
    key: "alerts",
    label: "Alertas",
    tone: "alert",
    icon: TriangleAlert,
  },
  {
    key: "reminders",
    label: "Recordatorios",
    tone: "reminder",
    icon: CalendarClock,
  },
  {
    key: "suggestions",
    label: "Sugerencias",
    tone: "suggestion",
    icon: Lightbulb,
  },
  {
    key: "news",
    label: "Novedades",
    tone: "news",
    icon: Sparkles,
  },
] as const;

function NotificationsSummaryCard({ summary }: NotificationsSummaryCardProps) {
  return (
    <Card className="notifications-page__sidebar-card notifications-page__summary-card">
      <div className="notifications-page__sidebar-card-header">
        <div>
          <h2>Resumen de notificaciones</h2>
          <p>Este mes</p>
        </div>
        <span className="notifications-page__summary-pill">
          <Bell size={14} aria-hidden="true" />
          Este mes
        </span>
      </div>

      <div className="notifications-page__summary-grid">
        {items.map((item) => {
          const Icon = item.icon;
          const value = summary[item.key];
          return (
            <article
              key={item.key}
              className={`notifications-page__mini-metric notifications-page__mini-metric--${item.tone}`}
            >
              <span
                className={`notifications-page__mini-metric-icon notifications-page__mini-metric-icon--${item.tone}`}
              >
                <Icon size={15} aria-hidden="true" />
              </span>
              <span className="notifications-page__mini-metric-label">{item.label}</span>
              <strong className="notifications-page__mini-metric-value">{value}</strong>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export default NotificationsSummaryCard;
