import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import { formatCurrency } from "../../../../utils/formatters";
import type { Goal, ContributionOrigin } from "../../types/goal";
import { getRemainingAmount } from "../../utils/goalCalculations";
import GoalDialogShell from "./GoalDialogShell";

interface ContributionFormValues {
  amount: number;
  date: string;
  origin: ContributionOrigin;
  note?: string;
}

interface ContributionDialogProps {
  open: boolean;
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContributionFormValues) => void;
}

function getTodayIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const ORIGIN_OPTIONS: Array<{ value: ContributionOrigin; label: string }> = [
  { value: "MONTHLY_SAVINGS", label: "Ahorro mensual" },
  { value: "EXTRA_INCOME", label: "Ingreso extra" },
  { value: "OTHER", label: "Otro" },
];

function ContributionDialog({ open, goal, onOpenChange, onSubmit }: ContributionDialogProps) {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(getTodayIsoDate());
  const [origin, setOrigin] = useState<ContributionOrigin>("MONTHLY_SAVINGS");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setAmount(0);
      setDate(getTodayIsoDate());
      setOrigin("MONTHLY_SAVINGS");
      setNote("");
    }
  }, [open]);

  if (!goal) {
    return null;
  }

  const remaining = getRemainingAmount(goal);
  const isValid = amount > 0;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ amount, date, origin, note: note.trim() || undefined });
    onOpenChange(false);
  }

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Registrar aporte"
      description={`Sumá un aporte a "${goal.name}"`}
      closeLabel="Cerrar modal de aporte"
      contentClassName="goals-dialog__content--form"
    >
      <div className="goals-dialog__summary">
        <span>Restante: {formatCurrency(remaining)}</span>
        <strong>Sugerido: {formatCurrency(goal.suggestedMonthlyContribution)}/mes</strong>
      </div>

      <form className="goal-form" onSubmit={handleSubmit}>
        <div className="goal-form__row">
          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="contribution-amount">
              Monto
            </label>
            <input
              id="contribution-amount"
              className="analysis-form-field__input"
              type="number"
              min={1}
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="20000"
              required
            />
          </div>

          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="contribution-date">
              Fecha
            </label>
            <input
              id="contribution-date"
              className="analysis-form-field__input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="analysis-form-field">
          <label className="analysis-form-field__label" htmlFor="contribution-origin">
            Origen
          </label>
          <select
            id="contribution-origin"
            className="analysis-form-field__input"
            value={origin}
            onChange={(e) => setOrigin(e.target.value as ContributionOrigin)}
          >
            {ORIGIN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="analysis-form-field">
          <div className="analysis-form-field__label-row">
            <label className="analysis-form-field__label" htmlFor="contribution-note">
              Nota
            </label>
            <span className="analysis-form-field__badge">Opcional</span>
          </div>
          <input
            id="contribution-note"
            className="analysis-form-field__input"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej: Bono de fin de mes"
          />
        </div>

        <div className="analysis-dialog__actions">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isValid}>
            Registrar aporte
          </Button>
        </div>
      </form>
    </GoalDialogShell>
  );
}

export default ContributionDialog;
