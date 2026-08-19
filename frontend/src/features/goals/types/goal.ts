export type GoalPriority = "LOW" | "MEDIUM" | "HIGH";

export type GoalStatus = "ACTIVE" | "PAUSED" | "COMPLETED";

export type GoalCategory = "TRAVEL" | "EMERGENCY" | "TECHNOLOGY" | "OTHER";

export type ContributionOrigin = "MONTHLY_SAVINGS" | "EXTRA_INCOME" | "OTHER";

export interface Contribution {
  id: string;
  goalId: string;
  amount: number;
  date: string;
  origin: ContributionOrigin;
  note?: string;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  category: GoalCategory;
  targetAmount: number;
  savedAmount: number;
  targetDate?: string;
  priority: GoalPriority;
  status: GoalStatus;
  suggestedMonthlyContribution: number;
  pauseReason?: string;
}
