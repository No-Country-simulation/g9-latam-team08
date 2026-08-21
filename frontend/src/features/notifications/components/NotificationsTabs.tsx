import type { NotificationFilter } from "../types/notification";

interface NotificationsTabsProps {
  activeFilter: NotificationFilter;
  items: Array<{
    id: NotificationFilter;
    label: string;
    count: number;
  }>;
  onChange: (filter: NotificationFilter) => void;
}

function NotificationsTabs({
  activeFilter,
  items,
  onChange,
}: NotificationsTabsProps) {
  return (
    <div
      className="notifications-page__filters"
      role="tablist"
      aria-label="Filtros de notificaciones"
    >
      {items.map((item) => {
        const isActive = activeFilter === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`notifications-filter-${item.id.toLowerCase()}`}
            className={`notifications-page__filter${
              isActive ? " notifications-page__filter--active" : ""
            }`}
            aria-selected={isActive}
            aria-controls="notifications-list-panel"
            onClick={() => onChange(item.id)}
          >
            <span>{item.label}</span>
            <span className="notifications-page__filter-count" aria-label={`${item.count}`}>
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default NotificationsTabs;
