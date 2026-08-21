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

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Completar meta"
      description="Marcá esta meta como completada."
      closeLabel="Cerrar modal de completar"
    >
      <div className="goals-dialog__summary">
        <span>{goal.name}</span>
        <strong>{formatCurrency(goal.savedAmount)} de {formatCurrency(goal.targetAmount)}</strong>
      </div>
      <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
        Al completar esta meta, dejará de aparecer en tu lista activa. El progreso se conserva.
      </p>
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
          Completar meta
        </Button>
      </div>
    </GoalDialogShell>
  );
}

export default CompleteGoalDialog;
