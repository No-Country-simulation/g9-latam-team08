import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import NotificationsList from "../features/notifications/components/NotificationsList";
import NotificationPreferencesCard from "../features/notifications/components/NotificationPreferencesCard";
import NotificationsSummaryCard from "../features/notifications/components/NotificationsSummaryCard";
import NotificationsTabs from "../features/notifications/components/NotificationsTabs";
import NotificationsTipCard from "../features/notifications/components/NotificationsTipCard";
import {
  notificationPreferencesMock,
  notificationsDemoMeta,
  notificationsMock,
} from "../features/notifications/mocks/notifications";
import type {
  NotificationFilter,
  NotificationPreferences,
} from "../features/notifications/types/notification";
import {
  filterNotifications,
  getCategoryCount,
  getNotificationSummary,
  getUnreadCount,
} from "../features/notifications/utils/notificationCalculations";

import "./NotificationsPage.css";

function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsMock);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("ALL");
  const [preferences, setPreferences] = useState(notificationPreferencesMock);

  const unreadCount = getUnreadCount(notifications);
  const filteredNotifications = filterNotifications(notifications, activeFilter);
  const summary = getNotificationSummary(notifications);

  const filterItems = [
    {
      id: "ALL" as const,
      label: "Todas",
      count: notifications.length,
    },
    {
      id: "UNREAD" as const,
      label: "No leídas",
      count: unreadCount,
    },
    {
      id: "ALERT" as const,
      label: "Alertas",
      count: getCategoryCount(notifications, "ALERT"),
    },
    {
      id: "REMINDER" as const,
      label: "Recordatorios",
      count: getCategoryCount(notifications, "REMINDER"),
    },
    {
      id: "SUGGESTION" as const,
      label: "Sugerencias",
      count: getCategoryCount(notifications, "SUGGESTION"),
    },
  ];

  const handleMarkAsRead = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: false,
            }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id),
    );
  };

  const handleTogglePreference = (key: keyof NotificationPreferences) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: !currentPreferences[key],
    }));
  };

  return (
    <main className="notifications-page">
      <section className="notifications-page__header">
        <div className="notifications-page__header-copy">
          <div className="notifications-page__header-title-row">
            <Bell size={16} aria-hidden="true" />
            <h1>Notificaciones</h1>
          </div>
          <div>
            <p>
              Mantenete al día con alertas importantes sobre tu salud financiera.
            </p>
          </div>
        </div>

        <div className="notifications-page__header-meta">
          <span>Último análisis:</span>
          <strong>{notificationsDemoMeta.lastAnalysisLabel}</strong>
        </div>
      </section>

      <section className="notifications-page__toolbar">
        <NotificationsTabs
          activeFilter={activeFilter}
          items={filterItems}
          onChange={setActiveFilter}
        />

        <Button
          type="button"
          variant="secondary"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          className="notifications-page__mark-all-button"
        >
          <CheckCheck size={16} aria-hidden="true" />
          Marcar todas como leídas
        </Button>
      </section>

      <section className="notifications-page__content">
        <div className="notifications-page__main-column">
          <NotificationsList
            filter={activeFilter}
            notifications={filteredNotifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAsUnread={handleMarkAsUnread}
            onDelete={handleDeleteNotification}
          />
        </div>

        <aside className="notifications-page__sidebar">
          <NotificationPreferencesCard
            preferences={preferences}
            onToggle={handleTogglePreference}
          />
          <NotificationsSummaryCard summary={summary} />
          <NotificationsTipCard />
        </aside>
      </section>

      <section className="notifications-page__footer-note">
        <p>
          Estas notificaciones son orientativas y no reemplazan asesoramiento
          financiero profesional.
        </p>
      </section>
    </main>
  );
}

export default NotificationsPage;
