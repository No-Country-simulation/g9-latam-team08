import Button from "../../../../components/ui/Button";
import { formatCurrency } from "../../../../utils/formatters";
import type { Goal } from "../../types/goal";
import GoalDialogShell from "./GoalDialogShell";

interface DeleteGoalDialogProps {
  open: boolean;
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

function DeleteGoalDialog({ open, goal, onOpenChange, onConfirm }: DeleteGoalDialogProps) {
  if (!goal) {
    return null;
  }

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Eliminar meta"
      description="Esta acción no se puede deshacer."
      closeLabel="Cerrar modal de eliminación"
    >
      <div className="goals-dialog__summary">
        <span>{goal.name}</span>
        <strong>{formatCurrency(goal.savedAmount)} ahorrados actualmente</strong>
      </div>

      <div className="analysis-dialog__actions">
        <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          className="goals-dialog__danger-button"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          Eliminar meta
        </Button>
      </div>
    </GoalDialogShell>
  );
}

export default DeleteGoalDialog;
