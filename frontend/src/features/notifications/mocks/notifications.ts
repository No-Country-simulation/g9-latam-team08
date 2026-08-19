import type {
  NotificationItem,
  NotificationPreferences,
} from "../types/notification";

export const notificationsMock: NotificationItem[] = [
  {
    id: "notification-alert-1",
    title: "Gasto inusual detectado",
    description:
      'Tu gasto en "Restaurantes y delivery" aumentó un 32% respecto al mes anterior.',
    category: "ALERT",
    read: false,
    createdAt: "2026-08-19T10:30:00",
    createdAtLabel: "Hoy, 10:30",
    relatedEntityType: "BUDGET",
  },
  {
    id: "notification-alert-2",
    title: "Te estás acercando al límite de presupuesto",
    description:
      'Llevás un 85% de tu presupuesto mensual en "Entretenimiento".',
    category: "ALERT",
    read: false,
    createdAt: "2026-08-19T09:15:00",
    createdAtLabel: "Hoy, 09:15",
    relatedEntityType: "BUDGET",
  },
  {
    id: "notification-reminder-1",
    title: "Recordatorio de pago próximo",
    description: "Tenés 2 facturas para vencer en los próximos 5 días.",
    category: "REMINDER",
    read: false,
    createdAt: "2026-08-18T18:45:00",
    createdAtLabel: "Ayer, 18:45",
    relatedEntityType: "INVOICE",
  },
  {
    id: "notification-reminder-2",
    title: "Nuevo análisis disponible",
    description: "Tu análisis mensual de salud financiera ya está listo.",
    category: "REMINDER",
    read: false,
    createdAt: "2026-08-10T11:00:00",
    createdAtLabel: "10 ago. 2026, 11:00",
    relatedEntityType: "ANALYSIS",
  },
  {
    id: "notification-suggestion-1",
    title: 'Meta "Viaje a Europa" en progreso',
    description: "¡Vas muy bien! Alcanzaste el 42% de tu objetivo.",
    category: "SUGGESTION",
    read: false,
    createdAt: "2026-08-18T12:20:00",
    createdAtLabel: "Ayer, 12:20",
    relatedEntityType: "GOAL",
  },
  {
    id: "notification-suggestion-2",
    title: "Consejo personalizado",
    description: "Revisá tus gastos variables: podrías ahorrar hasta $45.000 al mes.",
    category: "SUGGESTION",
    read: true,
    createdAt: "2026-08-09T16:30:00",
    createdAtLabel: "9 ago. 2026, 16:30",
  },
  {
    id: "notification-suggestion-3",
    title: "Fondo de emergencia",
    description: "Tu fondo cubre 3,4 meses de gastos. ¡Buen trabajo!",
    category: "SUGGESTION",
    read: true,
    createdAt: "2026-08-08T14:10:00",
    createdAtLabel: "8 ago. 2026, 14:10",
  },
];

export const notificationPreferencesMock: NotificationPreferences = {
  importantAlerts: true,
  reminders: true,
  suggestions: true,
  productNews: false,
};

export const notificationsDemoMeta = {
  lastAnalysisLabel: "11 ago. 2026, 11:45",
};
