import { PiggyBank, Target, TrendingUp } from "lucide-react";
import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import type { Goal } from "../types/goal";
import { getActiveGoals, getAverageProgress, getTotalSaved } from "../utils/goalHelpers";
import "./GoalsSummary.css";

interface GoalsSummaryProps {
  goals: Goal[];
}

function GoalsSummary({ goals }: GoalsSummaryProps) {
  const activeGoals = getActiveGoals(goals);
  const totalSaved = getTotalSaved(goals);
  const overallProgress = Math.round(getAverageProgress(goals));
  const monthlyTotal = activeGoals.reduce((sum, g) => sum + g.suggestedMonthlyContribution, 0);

  return (
    <div className="goals-summary">
      <Card className="goals-summary__card">
        <Target size={22} aria-hidden="true" className="goals-summary__icon" />
        <div className="goals-summary__content">
          <span className="goals-summary__value">{activeGoals.length}</span>
          <span className="goals-summary__label">Metas activas</span>
        </div>
      </Card>

      <Card className="goals-summary__card">
        <PiggyBank size={22} aria-hidden="true" className="goals-summary__icon" />
        <div className="goals-summary__content">
          <span className="goals-summary__value">{formatCurrency(totalSaved)}</span>
          <span className="goals-summary__label">Total ahorrado ({overallProgress}%)</span>
        </div>
      </Card>

      <Card className="goals-summary__card">
        <TrendingUp size={22} aria-hidden="true" className="goals-summary__icon" />
        <div className="goals-summary__content">
          <span className="goals-summary__value">{formatCurrency(monthlyTotal)}</span>
          <span className="goals-summary__label">Aporte mensual sugerido</span>
        </div>
      </Card>
    </div>
  );
}

export default GoalsSummary;
