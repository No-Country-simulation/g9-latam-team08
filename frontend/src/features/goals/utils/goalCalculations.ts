import type { Goal } from "../types/goal";

export interface SavingsDistributionItem {
  id: string;
  name: string;
  savedAmount: number;
  percentage: number;
  color: string;
}

const DISTRIBUTION_COLORS: Record<Goal["category"], string> = {
  TRAVEL: "#2a9d8f",
  EMERGENCY: "#69c9b9",
  TECHNOLOGY: "#7d5aff",
  OTHER: "#0a4d5c",
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const getVisibleGoals = (goals: Goal[]) =>
  goals.filter((goal) => goal.status !== "COMPLETED");

export const getGoalProgress = (goal: Goal) =>
  clamp((goal.savedAmount / goal.targetAmount) * 100, 0, 100);

export const getActiveGoals = (goals: Goal[]) => goals.filter((goal) => goal.status === "ACTIVE");

export const getRemainingAmount = (goal: Goal) =>
  Math.max(goal.targetAmount - goal.savedAmount, 0);

export const getTotalSaved = (goals: Goal[]) =>
  goals.reduce((total, goal) => total + goal.savedAmount, 0);

export const getAverageProgress = (goals: Goal[]) => {
  if (goals.length === 0) {
    return 0;
  }
  const totalProgress = goals.reduce((total, goal) => total + getGoalProgress(goal), 0);
  return totalProgress / goals.length;
};

export const getSavingsDistribution = (goals: Goal[]): SavingsDistributionItem[] => {
  const totalSaved = getTotalSaved(goals);
  return goals.map((goal) => ({
    id: goal.id,
    name: goal.name,
    savedAmount: goal.savedAmount,
    percentage: totalSaved === 0 ? 0 : Math.round((goal.savedAmount / totalSaved) * 100),
    color: DISTRIBUTION_COLORS[goal.category],
  }));
};

export const getProjectedCompletionLabel = (goals: Goal[]) => {
  const withTargetDate = goals.filter((goal) => goal.targetDate);
  if (withTargetDate.length === 0) {
    return "Sin fecha estimada";
  }

  const goalsOnTrack = withTargetDate.filter((goal) => {
    const remainingAmount = Math.max(goal.targetAmount - goal.savedAmount, 0);
    return goal.suggestedMonthlyContribution > 0 && remainingAmount / goal.suggestedMonthlyContribution <= 6;
  }).length;

  if (goalsOnTrack === withTargetDate.length) {
    return "En ritmo previsto";
  }

  if (goalsOnTrack >= Math.ceil(withTargetDate.length / 2)) {
    return "Buen ritmo general";
  }

  return "Conviene revisar aportes";
};

export const getGoalTargetDateLabel = (targetDate?: string) => {
  if (!targetDate) {
    return "Sin fecha objetivo";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${targetDate}T00:00:00`));
};
