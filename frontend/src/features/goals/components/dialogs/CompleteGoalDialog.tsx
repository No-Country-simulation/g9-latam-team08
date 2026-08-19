import Button from "../../../../components/ui/Button";
import { formatCurrency } from "../../../../utils/formatters";
import type { Goal } from "../../types/goal";
import GoalDialogShell from "./GoalDialogShell";

interface CompleteGoalDialogProps {
  open: boolean;
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function CompleteGoalDialog({ open, goal, onOpenChange, onConfirm }: CompleteGoalDialogProps) {
  if (!goal) {
    return null;
  }

  const reachedTarget = goal.savedAmount >= goal.targetAmount;

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Completar meta"
      description="Confirmá si querés marcar esta meta como completada."
      closeLabel="Cerrar modal de completar meta"
    >
      <div className="goals-dialog__summary">
        <span>{goal.name}</span>
        <strong>
          {formatCurrency(goal.savedAmount)} de {formatCurrency(goal.targetAmount)}
        </strong>
      </div>

      <div className={reachedTarget ? "goals-dialog__impact" : "goals-dialog__warning"}>
        {reachedTarget ? (
          <>
            <span>Estado actual</span>
            <strong>Objetivo alcanzado</strong>
          </>
        ) : (
          <p>
            La meta todavía no llegó a su monto objetivo, pero podés marcarla como completada si ya
            querés cerrarla manualmente.
          </p>
        )}
      </div>

      <div className="analysis-dialog__actions">
        <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          Marcar meta como completada
        </Button>
      </div>
    </GoalDialogShell>
  );
}

export default CompleteGoalDialog;
