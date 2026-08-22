import type {
  NotificationCategory,
  NotificationFilter,
  NotificationItem,
} from "../types/notification";

export interface NotificationSummary {
  total: number;
  unread: number;
  alerts: number;
  reminders: number;
  suggestions: number;
  news: number;
}

export const getUnreadCount = (notifications: NotificationItem[]): number =>
  notifications.filter((notification) => !notification.read).length;

export const getCategoryCount = (
  notifications: NotificationItem[],
  category: NotificationCategory,
): number =>
  notifications.filter((notification) => notification.category === category).length;

export const filterNotifications = (
  notifications: NotificationItem[],
  filter: NotificationFilter,
): NotificationItem[] => {
  switch (filter) {
    case "UNREAD":
      return notifications.filter((notification) => !notification.read);
    case "ALERT":
    case "REMINDER":
    case "SUGGESTION":
      return notifications.filter((notification) => notification.category === filter);
    case "ALL":
    default:
      return notifications;
  }
};

export const getNotificationSummary = (
  notifications: NotificationItem[],
): NotificationSummary => ({
  total: notifications.length,
  unread: getUnreadCount(notifications),
  alerts: getCategoryCount(notifications, "ALERT"),
  reminders: getCategoryCount(notifications, "REMINDER"),
  suggestions: getCategoryCount(notifications, "SUGGESTION"),
  news: getCategoryCount(notifications, "NEWS"),
});
