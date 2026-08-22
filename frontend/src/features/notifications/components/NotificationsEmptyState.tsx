import { BellOff, Lightbulb, ListChecks, Siren, TriangleAlert } from "lucide-react";
import type { NotificationFilter } from "../types/notification";

interface NotificationsEmptyStateProps {
  filter: NotificationFilter;
}

const emptyStateByFilter: Record<
  NotificationFilter,
  { title: string; description: string; icon: typeof BellOff }
> = {
  ALL: {
    title: "Todo tranquilo por acá",
    description: "Todavía no tenés notificaciones.",
    icon: BellOff,
  },
  UNREAD: {
    title: "Estás al día",
    description: "No tenés notificaciones pendientes de lectura.",
    icon: ListChecks,
  },
  ALERT: {
    title: "No hay alertas",
    description: "No detectamos alertas para mostrar en este momento.",
    icon: TriangleAlert,
  },
  REMINDER: {
    title: "No hay recordatorios",
    description: "No tenés recordatorios pendientes.",
    icon: Siren,
  },
  SUGGESTION: {
    title: "No hay sugerencias",
    description: "Cuando haya recomendaciones útiles, aparecerán acá.",
    icon: Lightbulb,
  },
};

function NotificationsEmptyState({ filter }: NotificationsEmptyStateProps) {
  const config = emptyStateByFilter[filter];
  const Icon = config.icon;

  return (
    <section className="notifications-page__empty-state">
      <div className="notifications-page__empty-icon">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="notifications-page__empty-copy">
        <h3>{config.title}</h3>
        <p>{config.description}</p>
      </div>
    </section>
  );
}

export default NotificationsEmptyState;
