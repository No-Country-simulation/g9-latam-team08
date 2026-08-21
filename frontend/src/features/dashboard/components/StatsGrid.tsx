import { LifeBuoy, Percent, PiggyBank, TrendingDown, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import type { FinancialAnalysisResult } from "../../../types/financial-analysis";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import StatCard, { type StatTone } from "./StatCard";
import "./StatsGrid.css";

interface StatsGridProps {
  indicators: FinancialAnalysisResult["indicators"];
}

interface StatDefinition {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: StatTone;
}

function StatsGrid({ indicators }: StatsGridProps) {
  const stats: StatDefinition[] = [
    {
      label: "Ingresos",
      value: formatCurrency(indicators.monthlyIncome),
      icon: TrendingUp,
      tone: "positive",
    },
    {
      label: "Gastos",
      value: formatCurrency(indicators.totalExpenses),
      icon: TrendingDown,
      tone: "error",
    },
    {
      label: "Saldo estimado",
      value: formatCurrency(indicators.estimatedBalance),
      icon: Wallet,
      tone: "secondary",
    },
    {
      label: "Endeudamiento",
      value: formatPercentage(indicators.debtRatio),
      icon: Percent,
      tone: "primary",
    },
    {
      label: "Ahorro mensual",
      value: formatCurrency(indicators.monthlySavings),
      icon: PiggyBank,
      tone: "primary",
    },
    {
      label: "Fondo de emergencia",
      value: `${indicators.emergencyFundMonths.toLocaleString("es-AR")} meses`,
      icon: LifeBuoy,
      tone: "warning",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} tone={stat.tone} />
      ))}
    </div>
  );
}

export default StatsGrid;
