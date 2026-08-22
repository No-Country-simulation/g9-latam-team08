import Card from "../../../components/ui/Card";
import type { NotificationFilter, NotificationItem } from "../types/notification";
import NotificationCard from "./NotificationCard";
import NotificationsEmptyState from "./NotificationsEmptyState";

interface NotificationsListProps {
  filter: NotificationFilter;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationsList({
  filter,
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationsListProps) {
  return (
    <Card className="notifications-page__list-card">
      <div
        id="notifications-list-panel"
        className="notifications-page__list"
        role="tabpanel"
        aria-labelledby={`notifications-filter-${filter.toLowerCase()}`}
      >
        {notifications.length === 0 ? (
          <NotificationsEmptyState filter={filter} />
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onMarkAsUnread={onMarkAsUnread}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </Card>
  );
}

export default NotificationsList;
