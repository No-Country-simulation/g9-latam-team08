import {
  CheckCircle2,
  EllipsisVertical,
  Laptop2,
  Pause,
  Pencil,
  ShieldPlus,
  Target,
  Trash2,
  Wallet,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Card from "../../../components/ui/Card";
import { formatCurrency } from "../../../utils/formatters";
import type { Goal } from "../types/goal";
import { getGoalProgress, getGoalTargetDateLabel } from "../utils/goalCalculations";

import "./GoalCard.css";

const categoryConfig = {
  TRAVEL: {
    icon: Target,
    label: "Viaje",
    className: "goals-card__icon-wrap--travel",
    progressClassName: "goals-card__progress-fill--travel",
  },
  EMERGENCY: {
    icon: ShieldPlus,
    label: "Fondo",
    className: "goals-card__icon-wrap--emergency",
    progressClassName: "goals-card__progress-fill--emergency",
  },
  TECHNOLOGY: {
    icon: Laptop2,
    label: "Tecnología",
    className: "goals-card__icon-wrap--technology",
    progressClassName: "goals-card__progress-fill--technology",
  },
  OTHER: {
    icon: Wallet,
    label: "Meta",
    className: "goals-card__icon-wrap--other",
    progressClassName: "goals-card__progress-fill--other",
  },
} as const;

const priorityLabels = {
  LOW: "Prioridad baja",
  MEDIUM: "Prioridad media",
  HIGH: "Prioridad alta",
} as const;

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
  const category = categoryConfig[goal.category];
  const CategoryIcon = category.icon;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const menuActions =
    goal.status === "PAUSED"
      ? [
          { label: "Editar meta", onSelect: () => onEdit(goal), tone: "default", icon: Pencil },
          {
            label: "Registrar aporte",
            onSelect: () => onAddContribution(goal),
            tone: "default",
            icon: Wallet,
          },
          {
            label: "Marcar como completada",
            onSelect: () => onComplete(goal),
            tone: "default",
            icon: CheckCircle2,
          },
          { label: "Reactivar meta", onSelect: () => onResume(goal), tone: "pause", icon: Pause },
          { label: "Eliminar meta", onSelect: () => onDelete(goal), tone: "danger", icon: Trash2 },
        ]
      : [
          { label: "Editar meta", onSelect: () => onEdit(goal), tone: "default", icon: Pencil },
          {
            label: "Registrar aporte",
            onSelect: () => onAddContribution(goal),
            tone: "default",
            icon: Wallet,
          },
          {
            label: "Marcar como completada",
            onSelect: () => onComplete(goal),
            tone: "default",
            icon: CheckCircle2,
          },
          { label: "Pausar meta", onSelect: () => onPause(goal), tone: "pause", icon: Pause },
          { label: "Eliminar meta", onSelect: () => onDelete(goal), tone: "danger", icon: Trash2 },
        ];

  return (
    <Card className={`goals-card${goal.status === "PAUSED" ? " goals-card--paused" : ""}`}>
      <div className="goals-card__header">
        <div className="goals-card__title-group">
          <div className={`goals-card__icon-wrap ${category.className}`}>
            <CategoryIcon size={18} aria-hidden="true" />
          </div>
          <div>
            <div className="goals-card__heading-row">
              <h3>{goal.name}</h3>
              <span
                className={`goals-card__priority-badge goals-card__priority-badge--${goal.priority.toLowerCase()}`}
              >
                {priorityLabels[goal.priority]}
              </span>
            </div>
            <p>{goal.description}</p>
          </div>
        </div>

        <div className="goals-card__menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="goals-card__menu-button"
            aria-label={`Opciones de ${goal.name}`}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <EllipsisVertical size={18} aria-hidden="true" />
          </button>

          {isMenuOpen ? (
            <div id={menuId} className="goals-card__menu" role="menu">
              {menuActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  className={`goals-card__menu-item goals-card__menu-item--${action.tone}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    action.onSelect();
                  }}
                >
                  <action.icon size={16} aria-hidden="true" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="goals-card__amounts">
        <strong>{formatCurrency(goal.savedAmount)} ahorrados</strong>
        <span>de {formatCurrency(goal.targetAmount)}</span>
      </div>

      <div className="goals-card__progress-row">
        <span>Progreso</span>
        <strong>{progress}%</strong>
      </div>

      <div
        className="goals-card__progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`Progreso de la meta ${goal.name}`}
      >
        <span
          className={`goals-card__progress-fill ${category.progressClassName}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="goals-card__footer">
        <div className="goals-card__meta">
          <span>Fecha objetivo</span>
          <strong>{getGoalTargetDateLabel(goal.targetDate)}</strong>
        </div>
        <div className="goals-card__meta">
          <span>Aporte sugerido</span>
          <strong>{formatCurrency(goal.suggestedMonthlyContribution)}/mes</strong>
        </div>
        <div
          className={`goals-card__meta${
            goal.status === "PAUSED" ? " goals-card__meta--paused" : " goals-card__meta--positive"
          }`}
        >
          <span>{goal.status === "PAUSED" ? "Estado actual" : "Estás al día"}</span>
          <strong>{goal.status === "PAUSED" ? "En pausa" : "Sí"}</strong>
        </div>
      </div>
    </Card>
  );
}

export default GoalCard;
