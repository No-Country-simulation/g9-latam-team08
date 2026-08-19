import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import type { Goal } from "../../types/goal";
import GoalDialogShell from "./GoalDialogShell";

interface PauseGoalDialogProps {
  open: boolean;
  goal: Goal | null;
  mode: "pause" | "resume";
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason?: string) => void;
}

function PauseGoalDialog({
  open,
  goal,
  mode,
  onOpenChange,
  onConfirm,
}: PauseGoalDialogProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) {
      setReason("");
    }
  }, [open]);

  if (!goal) {
    return null;
  }

  const isPauseMode = mode === "pause";

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={isPauseMode ? "Pausar meta" : "Reactivar meta"}
      description={
        isPauseMode
          ? "Podés pausar esta meta sin perder el progreso acumulado."
          : "Volvé a activar esta meta para retomar su seguimiento."
      }
      closeLabel={isPauseMode ? "Cerrar modal de pausa" : "Cerrar modal de reactivación"}
    >
      <div className="goals-dialog__summary">
        <span>{goal.name}</span>
        <strong>
          {isPauseMode
            ? "El progreso guardado se mantiene intacto."
            : "La meta volverá a contarse como activa."}
        </strong>
      </div>

      {isPauseMode ? (
        <div className="analysis-form-field">
          <div className="analysis-form-field__label-row">
            <label className="analysis-form-field__label" htmlFor="goal-pause-reason">
              Motivo
            </label>
            <span className="analysis-form-field__badge">Opcional</span>
          </div>
          <textarea
            id="goal-pause-reason"
            className="analysis-form-field__input goals-dialog__textarea"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Por ejemplo: voy a priorizar otra meta durante unos meses."
          />
        </div>
      ) : null}

      <div className="analysis-dialog__actions">
        <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={isPauseMode ? "goals-dialog__pause-button" : undefined}
          onClick={() => {
            onConfirm(reason.trim() || undefined);
            onOpenChange(false);
          }}
        >
          {isPauseMode ? "Pausar meta" : "Reactivar meta"}
        </Button>
      </div>
    </GoalDialogShell>
  );
}

export default PauseGoalDialog;
