import Card from "../../../components/ui/Card";
import type { NotificationPreferences } from "../types/notification";

interface NotificationPreferencesCardProps {
  preferences: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences) => void;
}

const preferenceItems: Array<{
  key: keyof NotificationPreferences;
  title: string;
  description: string;
}> = [
  {
    key: "importantAlerts",
    title: "Alertas importantes",
    description: "Gastos inusuales, presupuesto, etc.",
  },
  {
    key: "reminders",
    title: "Recordatorios",
    description: "Pagos, análisis, metas, etc.",
  },
  {
    key: "suggestions",
    title: "Sugerencias y consejos",
    description: "Recomendaciones personalizadas.",
  },
  {
    key: "productNews",
    title: "Novedades del producto",
    description: "Actualizaciones y mejoras.",
  },
];

function NotificationPreferencesCard({
  preferences,
  onToggle,
}: NotificationPreferencesCardProps) {
  return (
    <Card className="notifications-page__sidebar-card notifications-page__preferences-card">
      <div className="notifications-page__sidebar-card-header">
        <div>
          <h2>Preferencias de notificaciones</h2>
          <p>Elegí qué tipos de avisos querés recibir hacia futuro.</p>
        </div>
      </div>

      <div className="notifications-page__preferences-list">
        {preferenceItems.map((item) => (
          <div key={item.key} className="notifications-page__preference-item">
            <div className="notifications-page__preference-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={preferences[item.key]}
              aria-label={item.title}
              className={`notifications-page__switch${
                preferences[item.key] ? " notifications-page__switch--active" : ""
              }`}
              onClick={() => onToggle(item.key)}
            >
              <span className="notifications-page__switch-thumb" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="notifications-page__text-action"
        disabled
        aria-disabled="true"
      >
        Ver todas las preferencias →
      </button>
    </Card>
  );
}

export default NotificationPreferencesCard;
