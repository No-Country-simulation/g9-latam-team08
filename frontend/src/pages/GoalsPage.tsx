import {
  ArrowUpCircle,
  CalendarClock,
  CircleDollarSign,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import GoalCard from "../features/goals/components/GoalCard";
import GoalsEmptyState from "../features/goals/components/GoalsEmptyState";
import GoalsMetricCard from "../features/goals/components/GoalsMetricCard";
import GoalsSuggestions from "../features/goals/components/GoalsSuggestions";
import SavingsDistributionCard from "../features/goals/components/SavingsDistributionCard";
import CompleteGoalDialog from "../features/goals/components/dialogs/CompleteGoalDialog";
import ContributionDialog from "../features/goals/components/dialogs/ContributionDialog";
import DeleteGoalDialog from "../features/goals/components/dialogs/DeleteGoalDialog";
import GoalFormDialog from "../features/goals/components/dialogs/GoalFormDialog";
import PauseGoalDialog from "../features/goals/components/dialogs/PauseGoalDialog";
import { goalsMock } from "../features/goals/mocks/goals";
import {
  getActiveGoals,
  getAverageProgress,
  getProjectedCompletionLabel,
  getSavingsDistribution,
  getTotalSaved,
  getVisibleGoals,
} from "../features/goals/utils/goalCalculations";
import { formatCurrency } from "../utils/formatters";
import type { Contribution, Goal, GoalCategory, GoalPriority } from "../features/goals/types/goal";

import "./GoalsPage.css";

type DialogState =
  | { type: "create" }
  | { type: "edit"; goalId: string }
  | { type: "contribution"; goalId: string }
  | { type: "complete"; goalId: string }
  | { type: "pause"; goalId: string }
  | { type: "resume"; goalId: string }
  | { type: "delete"; goalId: string }
  | null;

function GoalsPage() {
  const [goals, setGoals] = useState(goalsMock);
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const visibleGoals = getVisibleGoals(goals);
  const activeGoals = getActiveGoals(visibleGoals);
  const totalSaved = getTotalSaved(visibleGoals);
  const averageProgress = Math.round(getAverageProgress(visibleGoals));
  const savingsDistribution = getSavingsDistribution(visibleGoals);
  const projectedCompletion = getProjectedCompletionLabel(visibleGoals);
  const selectedGoal =
    dialogState && "goalId" in dialogState
      ? goals.find((goal) => goal.id === dialogState.goalId) ?? null
      : null;

  const closeDialog = () => setDialogState(null);

  const createGoal = (values: {
    name: string;
    category: GoalCategory;
    targetAmount: number;
    savedAmount: number;
    targetDate?: string;
    priority: GoalPriority;
    suggestedMonthlyContribution: number;
    description: string;
  }) => {
    const id =
      typeof globalThis.crypto?.randomUUID === "function"
        ? globalThis.crypto.randomUUID()
        : `goal-${Date.now()}`;

    setGoals((currentGoals) => [
      ...currentGoals,
      {
        id,
        ...values,
        description: values.description || "Nueva meta financiera.",
        status: "ACTIVE",
      },
    ]);
  };

  const updateGoal = (
    goalId: string,
    values: {
      name: string;
      category: GoalCategory;
      targetAmount: number;
      savedAmount: number;
      targetDate?: string;
      priority: GoalPriority;
      suggestedMonthlyContribution: number;
      description: string;
    },
  ) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              ...values,
              description: values.description || "Meta actualizada.",
            }
          : goal,
      ),
    );
  };

  const addContribution = (
    goalId: string,
    contribution: Omit<Contribution, "id" | "goalId">,
  ) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              savedAmount: goal.savedAmount + contribution.amount,
            }
          : goal,
      ),
    );
  };

  const completeGoal = (goalId: string) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              status: "COMPLETED",
            }
          : goal,
      ),
    );
  };

  const pauseGoal = (goalId: string, reason?: string) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              status: "PAUSED",
              pauseReason: reason,
            }
          : goal,
      ),
    );
  };

  const resumeGoal = (goalId: string) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              status: "ACTIVE",
              pauseReason: undefined,
            }
          : goal,
      ),
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
  };

  return (
    <main className="goals-page">
      <section className="goals-page__hero">
        <div className="goals-page__hero-copy">
          <span className="goals-page__eyebrow">
            <Target size={16} aria-hidden="true" />
            Mis metas
          </span>
          <div>
            <h1>Mis metas</h1>
            <p>Planificá tus objetivos financieros y hacé seguimiento de tu progreso.</p>
          </div>
        </div>

        <div className="goals-page__hero-actions">
          <div className="goals-page__analysis-date">
            <span>Último análisis</span>
            <strong>18 de agosto de 2026</strong>
          </div>
          <div className="goals-page__buttons">
            <Button variant="secondary" disabled>
              Descargar informe
            </Button>
            <Button onClick={() => setDialogState({ type: "create" })}>
              <Plus size={18} aria-hidden="true" />
              Nueva meta
            </Button>
          </div>
        </div>
      </section>

      <section className="goals-page__metrics" aria-label="Resumen de metas">
        <GoalsMetricCard
          icon={<Target size={18} aria-hidden="true" />}
          label="Metas activas"
          value={String(activeGoals.length)}
          hint={`De ${goals.length} en total`}
          tone="teal"
        />
        <GoalsMetricCard
          icon={<CircleDollarSign size={18} aria-hidden="true" />}
          label="Ahorrado total"
          value={formatCurrency(totalSaved)}
          hint="De todas tus metas"
          tone="blue"
        />
        <GoalsMetricCard
          icon={<TrendingUp size={18} aria-hidden="true" />}
          label="Progreso promedio"
          value={`${averageProgress}%`}
          hint="De tus metas activas"
          tone="purple"
        />
        <GoalsMetricCard
          icon={<CalendarClock size={18} aria-hidden="true" />}
          label="Proyección de cumplimiento"
          value={projectedCompletion}
          hint="Con tu ritmo actual"
          tone="amber"
        />
      </section>

      <section className="goals-page__content">
        <div className="goals-page__main-column">
          <div className="goals-page__section-heading">
            <div>
              <h2>Tus metas</h2>
              <p>Seguí de cerca cuánto avanzaste y dónde conviene reforzar el ahorro.</p>
            </div>
          </div>

          {visibleGoals.length > 0 ? (
            <>
              <div className="goals-page__goals-list">
                {visibleGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={(currentGoal) => setDialogState({ type: "edit", goalId: currentGoal.id })}
                    onAddContribution={(currentGoal) =>
                      setDialogState({ type: "contribution", goalId: currentGoal.id })
                    }
                    onComplete={(currentGoal) =>
                      setDialogState({ type: "complete", goalId: currentGoal.id })
                    }
                    onPause={(currentGoal) => setDialogState({ type: "pause", goalId: currentGoal.id })}
                    onResume={(currentGoal) =>
                      setDialogState({ type: "resume", goalId: currentGoal.id })
                    }
                    onDelete={(currentGoal) =>
                      setDialogState({ type: "delete", goalId: currentGoal.id })
                    }
                  />
                ))}
              </div>

              <Button
                variant="secondary"
                fullWidth
                className="goals-page__secondary-cta"
                onClick={() => setDialogState({ type: "create" })}
              >
                <ArrowUpCircle size={18} aria-hidden="true" />+ Agregar nueva meta
              </Button>
            </>
          ) : (
            <GoalsEmptyState onCreate={() => setDialogState({ type: "create" })} />
          )}
        </div>

        <aside className="goals-page__sidebar">
          <SavingsDistributionCard items={savingsDistribution} />
          <GoalsSuggestions goals={visibleGoals} />
        </aside>
      </section>

      <GoalFormDialog
        open={dialogState?.type === "create"}
        mode="create"
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onSubmit={createGoal}
      />

      <GoalFormDialog
        open={dialogState?.type === "edit"}
        mode="edit"
        goal={selectedGoal}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onSubmit={(values) => {
          if (!selectedGoal) {
            return;
          }

          updateGoal(selectedGoal.id, values);
        }}
      />

      <ContributionDialog
        open={dialogState?.type === "contribution"}
        goal={selectedGoal}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onSubmit={(values) => {
          if (!selectedGoal) {
            return;
          }

          addContribution(selectedGoal.id, values);
        }}
      />

      <CompleteGoalDialog
        open={dialogState?.type === "complete"}
        goal={selectedGoal}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onConfirm={() => {
          if (!selectedGoal) {
            return;
          }

          completeGoal(selectedGoal.id);
        }}
      />

      <PauseGoalDialog
        open={dialogState?.type === "pause"}
        goal={selectedGoal}
        mode="pause"
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onConfirm={(reason) => {
          if (!selectedGoal) {
            return;
          }

          pauseGoal(selectedGoal.id, reason);
        }}
      />

      <PauseGoalDialog
        open={dialogState?.type === "resume"}
        goal={selectedGoal}
        mode="resume"
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onConfirm={() => {
          if (!selectedGoal) {
            return;
          }

          resumeGoal(selectedGoal.id);
        }}
      />

      <DeleteGoalDialog
        open={dialogState?.type === "delete"}
        goal={selectedGoal}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        onConfirm={() => {
          if (!selectedGoal) {
            return;
          }

          deleteGoal(selectedGoal.id);
        }}
      />
    </main>
  );
}

export default GoalsPage;
