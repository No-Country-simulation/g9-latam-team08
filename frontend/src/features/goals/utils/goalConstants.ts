import type { GoalCategory, GoalPriority, GoalStatus } from "../types/goal";

interface CategoryMeta {
  label: string;
  emoji: string;
  color: string;
}

export const CATEGORY_META: Record<GoalCategory, CategoryMeta> = {
  TRAVEL: { label: "Viaje", emoji: "✈️", color: "#2a9d8f" },
  EMERGENCY: { label: "Emergencia", emoji: "🛡️", color: "#69c9b9" },
  TECHNOLOGY: { label: "Tecnología", emoji: "💻", color: "#7d5aff" },
  OTHER: { label: "Otro", emoji: "📌", color: "#0a4d5c" },
};

export const PRIORITY_LABELS: Record<GoalPriority, string> = {
  HIGH: "Alta",
  MEDIUM: "Media",
  LOW: "Baja",
};

export const STATUS_LABELS: Record<GoalStatus, string> = {
  ACTIVE: "Activa",
  PAUSED: "Pausada",
  COMPLETED: "Completada",
};
