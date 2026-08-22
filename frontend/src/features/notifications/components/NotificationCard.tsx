import {
  Bell,
  CalendarClock,
  EllipsisVertical,
  Lightbulb,
  Mail,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { NotificationItem } from "../types/notification";

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryConfig = {
  ALERT: {
    label: "Alerta",
    tone: "alert",
    icon: TriangleAlert,
  },
  REMINDER: {
    label: "Recordatorio",
    tone: "reminder",
    icon: CalendarClock,
  },
  SUGGESTION: {
    label: "Sugerencia",
    tone: "suggestion",
    icon: Lightbulb,
  },
  NEWS: {
    label: "Novedad",
    tone: "news",
    icon: Sparkles,
  },
} as const;

function NotificationCard({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const panelId = useId();
  const menuButtonId = useId();
  const config = categoryConfig[notification.category];
  const Icon = config.icon;

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <article
      className={`notifications-page__notification${
        notification.read ? " notifications-page__notification--read" : ""
      }`}
    >
      <div className={`notifications-page__notification-icon notifications-page__notification-icon--${config.tone}`}>
        <Icon size={18} aria-hidden="true" />
      </div>

      <div className="notifications-page__notification-content">
        <div className="notifications-page__notification-header">
          <div className="notifications-page__notification-heading">
            <div className="notifications-page__notification-title-row">
              {!notification.read ? (
                <>
                  <span
                    className="notifications-page__notification-dot"
                    aria-hidden="true"
                  />
                  <span className="notifications-page__sr-only">No leída</span>
                </>
              ) : null}
              <h3>{notification.title}</h3>
            </div>

            <p>{notification.description}</p>
          </div>

          <div className="notifications-page__notification-actions" ref={menuRef}>
            <button
              type="button"
              id={menuButtonId}
              className="notifications-page__menu-button"
              aria-label={`Opciones de ${notification.title}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? panelId : undefined}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <EllipsisVertical size={18} aria-hidden="true" />
            </button>

            {isMenuOpen ? (
              <div
                id={panelId}
                className="notifications-page__menu"
                role="menu"
                aria-labelledby={menuButtonId}
              >
                <button
                  type="button"
                  className="notifications-page__menu-item"
                  role="menuitem"
                  onClick={() => {
                    if (notification.read) {
                      onMarkAsUnread(notification.id);
                    } else {
                      onMarkAsRead(notification.id);
                    }

                    setIsMenuOpen(false);
                  }}
                >
                  {notification.read ? <Bell size={16} aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}
                  {notification.read ? "Marcar como no leída" : "Marcar como leída"}
                </button>
                <button
                  type="button"
                  className="notifications-page__menu-item notifications-page__menu-item--danger"
                  role="menuitem"
                  onClick={() => {
                    onDelete(notification.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Eliminar notificación
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="notifications-page__notification-footer">
          <span
            className={`notifications-page__category-badge notifications-page__category-badge--${config.tone}`}
          >
            {config.label}
          </span>
          <span className="notifications-page__notification-time">
            {notification.createdAtLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

export default NotificationCard;
