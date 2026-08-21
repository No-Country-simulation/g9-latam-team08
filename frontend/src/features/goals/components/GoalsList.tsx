import { Target } from "lucide-react";
import type { Goal } from "../types/goal";
import GoalCard from "./GoalCard";
import "./GoalsList.css";

interface GoalsListProps {
  goals: Goal[];
  onPause: (goal: Goal) => void;
  onResume: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

function GoalsList({ goals, onPause, onResume, onDelete }: GoalsListProps) {
  if (goals.length === 0) {
    return (
      <div className="goals-list__empty">
        <Target size={48} strokeWidth={1.4} aria-hidden="true" />
        <h3>No tenés metas todavía</h3>
        <p>Creá tu primera meta financiera para empezar a hacer seguimiento de tu progreso.</p>
      </div>
    );
  }

  return (
    <div className="goals-list">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onPause={onPause}
          onResume={onResume}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GoalsList;
