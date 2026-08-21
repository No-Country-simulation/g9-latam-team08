import { Lightbulb } from "lucide-react";
import Card from "../../../components/ui/Card";
import type { Goal } from "../types/goal";
import { getGoalProgress, getRemainingAmount } from "../utils/goalCalculations";
import { formatCurrency } from "../../../utils/formatters";

interface GoalsSuggestionsProps {
  goals: Goal[];
}

function GoalsSuggestions({ goals }: GoalsSuggestionsProps) {
  const suggestions: string[] = [];

  const activeGoals = goals.filter((g) => g.status === "ACTIVE");

  if (activeGoals.length === 0) {
    suggestions.push("Creá tu primera meta para recibir sugerencias personalizadas.");
  } else {
    const lowestProgress = activeGoals.reduce((lowest, goal) =>
      getGoalProgress(goal) < getGoalProgress(lowest) ? goal : lowest
    );

    if (getGoalProgress(lowestProgress) < 30) {
      suggestions.push(
        `Tu meta "${lowestProgress.name}" tiene poco avance. Considerá aumentar el aporte mensual.`
      );
    }

    const totalMonthly = activeGoals.reduce((sum, g) => sum + g.suggestedMonthlyContribution, 0);
    if (totalMonthly > 0) {
      suggestions.push(
        `Necesitás ${formatCurrency(totalMonthly)}/mes para mantener el ritmo en todas tus metas.`
      );
    }

    const nearCompletion = activeGoals.filter((g) => getGoalProgress(g) >= 80);
    if (nearCompletion.length > 0) {
      suggestions.push(
        `"${nearCompletion[0].name}" está cerca de completarse. ¡Solo faltan ${formatCurrency(getRemainingAmount(nearCompletion[0]))}!`
      );
    }
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="goals-suggestions">
      <div className="goals-suggestions__header">
        <Lightbulb size={16} aria-hidden="true" />
        <h3>Sugerencias</h3>
      </div>
      <ul className="goals-suggestions__list">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </Card>
  );
}

export default GoalsSuggestions;
