import {
  Calendar,
  CheckCircle2,
  Edit3,
  Pause,
  Play,
  PlusCircle,
  Target,
  Trash2,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import type { Goal } from "../types/goal";
import { CATEGORY_META, PRIORITY_LABELS } from "../utils/goalConstants";
import { getGoalProgress, getGoalTargetDateLabel, getRemainingAmount } from "../utils/goalCalculations";
import "./GoalCard.css";

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onAddContribution: (goal: Goal) => void;
  onComplete: (goal: Goal) => void;
  onPause: (goal: Goal) => void;
  onResume: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

function GoalCard({
  goal,
  onEdit,
  onAddContribution,
  onComplete,
  onPause,
  onResume,
  onDelete,
}: GoalCardProps) {
  const progress = Math.round(getGoalProgress(goal));
  const remaining = getRemainingAmount(goal);
  const category = CATEGORY_META[goal.category];
  const isPaused = goal.status === "PAUSED";
  const isCompleted = goal.status === "COMPLETED";

  return (
    <Card className={`goal-card${isPaused ? " goal-card--paused" : ""}`}>
      <div className="goal-card__header">
        <div className="goal-card__title-row">
          <span className="goal-card__emoji" aria-hidden="true">
            {category.emoji}
          </span>
          <h3 className="goal-card__name">{goal.name}</h3>
        </div>

        <div className="goal-card__badges">
          <span className={`goal-card__priority goal-card__priority--${goal.priority.toLowerCase()}`}>
            {PRIORITY_LABELS[goal.priority]}
          </span>
          {isPaused && <span className="goal-card__status-badge">Pausada</span>}
          {isCompleted && <span className="goal-card__status-badge goal-card__status-badge--done">Completada</span>}
        </div>
      </div>

      <p className="goal-card__description">{goal.description}</p>

      <div className="goal-card__progress-section">
        <div className="goal-card__progress-labels">
          <span className="goal-card__saved">{formatCurrency(goal.savedAmount)}</span>
          <span className="goal-card__target">de {formatCurrency(goal.targetAmount)}</span>
        </div>
        <div className="goal-card__progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="goal-card__progress-fill"
            style={{ width: `${progress}%`, backgroundColor: category.color }}
          />
        </div>
        <div className="goal-card__progress-meta">
          <span className="goal-card__percentage">{progress}%</span>
          <span className="goal-card__remaining">Faltan {formatCurrency(remaining)}</span>
        </div>
      </div>

      <div className="goal-card__footer">
        <div className="goal-card__info-pills">
          <span className="goal-card__pill">
            <Calendar size={14} aria-hidden="true" />
            {getGoalTargetDateLabel(goal.targetDate)}
          </span>
          <span className="goal-card__pill">
            <Target size={14} aria-hidden="true" />
            {formatCurrency(goal.suggestedMonthlyContribution)}/mes
          </span>
        </div>

        <div className="goal-card__actions">
          {!isCompleted && (
            <>
              <button
                type="button"
                className="goal-card__action-btn"
                title="Registrar aporte"
                aria-label="Registrar aporte"
                onClick={() => onAddContribution(goal)}
              >
                <PlusCircle size={16} />
              </button>
              <button
                type="button"
                className="goal-card__action-btn"
                title="Editar meta"
                aria-label="Editar meta"
                onClick={() => onEdit(goal)}
              >
                <Edit3 size={16} />
              </button>
              <button
                type="button"
                className="goal-card__action-btn"
                title="Completar meta"
                aria-label="Completar meta"
                onClick={() => onComplete(goal)}
              >
                <CheckCircle2 size={16} />
              </button>
              <button
                type="button"
                className="goal-card__action-btn"
                title={isPaused ? "Reactivar meta" : "Pausar meta"}
                aria-label={isPaused ? "Reactivar meta" : "Pausar meta"}
                onClick={() => (isPaused ? onResume(goal) : onPause(goal))}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </>
          )}
          <button
            type="button"
            className="goal-card__action-btn goal-card__action-btn--danger"
            title="Eliminar meta"
            aria-label="Eliminar meta"
            onClick={() => onDelete(goal)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default GoalCard;
