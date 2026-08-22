import type { FinancialAnalysisResult } from "../../../types/financial-analysis";
import type { FinancialAlert } from "./AlertsCard";
import type { MonthlyEvolutionPoint } from "./MonthlyEvolutionCard";

// Forma de datos que consume el Dashboard. Extiende FinancialAnalysisResult (el contrato ya
// definido por el equipo) con los campos que el Dashboard necesita y que todavía no forman
// parte de ese contrato (lastAnalysisDate, monthlyEvolution, keyFactors, alerts).
// Cuando el backend confirme estos campos, esta interfaz se puede fusionar directamente
// dentro de types/financial-analysis.ts sin tener que tocar los componentes que ya consumen
// DashboardData: siguen recibiendo las mismas props.
export interface DashboardData extends FinancialAnalysisResult {
  lastAnalysisDate: string;
  monthlyEvolution: MonthlyEvolutionPoint[];
  keyFactors: string[];
  alerts: FinancialAlert[];
}

// Fuente de datos TEMPORAL. El día que exista el endpoint real, alcanza con reemplazar el uso
// de esta constante por el resultado de la llamada a la API (misma forma: DashboardData).
export const dashboardMock: DashboardData = {
  financialProfile: "OBSERVATION",
  score: 68,
  lastAnalysisDate: "20 may. 2024",
  indicators: {
    monthlyIncome: 900000,
    totalExpenses: 760000,
    estimatedBalance: 140000,
    monthlySavings: 60000,
    debtRatio: 0.2,
    emergencyFundMonths: 0.6,
  },
  expensesByCategory: [
    { category: "Vivienda", amount: 228000, percentage: 0.3 },
    { category: "Alimentación", amount: 190000, percentage: 0.25 },
    { category: "Transporte", amount: 114000, percentage: 0.15 },
    { category: "Servicios", amount: 91200, percentage: 0.12 },
    { category: "Salud", amount: 60800, percentage: 0.08 },
    { category: "Entretenimiento", amount: 76000, percentage: 0.1 },
  ],
  monthlyEvolution: [
    { month: "Dic", income: 850000, expenses: 700000 },
    { month: "Ene", income: 870000, expenses: 690000 },
    { month: "Feb", income: 880000, expenses: 720000 },
    { month: "Mar", income: 860000, expenses: 730000 },
    { month: "Abr", income: 890000, expenses: 740000 },
    { month: "May", income: 900000, expenses: 760000 },
  ],
  classifiedTransactions: [
    {
      id: "1",
      description: "Supermercado La Anónima",
      amount: -45230,
      mainCategory: "Alimentación",
      confidence: 0.95,
    },
    {
      id: "2",
      description: "Carga SUBE",
      amount: -1200,
      mainCategory: "Transporte",
      confidence: 0.98,
    },
    {
      id: "3",
      description: "Netflix",
      amount: -6499,
      mainCategory: "Entretenimiento",
      confidence: 0.97,
    },
    {
      id: "4",
      description: "Farmacity",
      amount: -8750,
      mainCategory: "Salud",
      confidence: 0.93,
    },
  ],
  keyFactors: [
    "Tus gastos representan el 84,4% de tus ingresos",
    "Tu deuda mensual está dentro de un rango manejable",
    "Tu fondo de emergencia cubre menos de un mes",
  ],
  recommendations: [
    {
      id: "1",
      priority: "HIGH",
      message: "Reducí gastos variables, especialmente en entretenimiento y servicios.",
    },
    {
      id: "2",
      priority: "MEDIUM",
      message: "Aumentá tu ahorro mensual para fortalecer tu fondo de emergencia.",
    },
    {
      id: "3",
      priority: "LOW",
      message: "Seguí monitoreando tu deuda y mantenela dentro de un rango saludable.",
    },
  ],
  alerts: [
    {
      id: "1",
      severity: "WARNING",
      message: "Fondo de emergencia bajo",
    },
  ],
};
