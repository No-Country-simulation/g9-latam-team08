import type { Goal } from "../types/goal";

export const goalsMock: Goal[] = [
  {
    id: "goal-travel-europe",
    name: "Viaje a Europa",
    description: "Disfrutar 15 días recorriendo Europa en 2026 ✈️",
    category: "TRAVEL",
    targetAmount: 200000,
    savedAmount: 84500,
    targetDate: "2026-12-30",
    priority: "HIGH",
    status: "ACTIVE",
    suggestedMonthlyContribution: 45000,
  },
  {
    id: "goal-emergency-fund",
    name: "Fondo de emergencia",
    description: "Tener un respaldo para imprevistos y mayor tranquilidad.",
    category: "EMERGENCY",
    targetAmount: 180000,
    savedAmount: 70000,
    priority: "HIGH",
    status: "ACTIVE",
    suggestedMonthlyContribution: 35000,
  },
  {
    id: "goal-new-computer",
    name: "Nueva computadora",
    description: "Renovar mi equipo para estudiar y trabajar mejor.",
    category: "TECHNOLOGY",
    targetAmount: 90000,
    savedAmount: 30000,
    targetDate: "2026-11-30",
    priority: "MEDIUM",
    status: "ACTIVE",
    suggestedMonthlyContribution: 20000,
  },
];
