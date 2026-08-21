export type NotificationCategory = "ALERT" | "REMINDER" | "SUGGESTION" | "NEWS";

export type NotificationFilter =
  | "ALL"
  | "UNREAD"
  | "ALERT"
  | "REMINDER"
  | "SUGGESTION";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  read: boolean;
  createdAt: string;
  createdAtLabel: string;
  relatedEntityId?: string;
  relatedEntityType?: "BUDGET" | "INVOICE" | "ANALYSIS" | "GOAL";
}

export interface NotificationPreferences {
  importantAlerts: boolean;
  reminders: boolean;
  suggestions: boolean;
  productNews: boolean;
}
