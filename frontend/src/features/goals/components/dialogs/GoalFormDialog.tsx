import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import type { Goal, GoalCategory, GoalPriority } from "../../types/goal";
import { CATEGORY_META, PRIORITY_LABELS } from "../../utils/goalConstants";
import GoalDialogShell from "./GoalDialogShell";

export interface GoalFormValues {
  name: string;
  description: string;
  category: GoalCategory;
  targetAmount: number;
  savedAmount: number;
  targetDate?: string;
  priority: GoalPriority;
  suggestedMonthlyContribution: number;
}

interface GoalFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  goal?: Goal | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: GoalFormValues) => void;
}

const EMPTY_FORM: GoalFormValues = {
  name: "",
  description: "",
  category: "OTHER",
  targetAmount: 0,
  savedAmount: 0,
  targetDate: undefined,
  priority: "MEDIUM",
  suggestedMonthlyContribution: 0,
};

function goalToFormValues(goal: Goal): GoalFormValues {
  return {
    name: goal.name,
    description: goal.description,
    category: goal.category,
    targetAmount: goal.targetAmount,
    savedAmount: goal.savedAmount,
    targetDate: goal.targetDate,
    priority: goal.priority,
    suggestedMonthlyContribution: goal.suggestedMonthlyContribution,
  };
}

const CATEGORY_OPTIONS = Object.entries(CATEGORY_META) as [GoalCategory, (typeof CATEGORY_META)[GoalCategory]][];
const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS) as [GoalPriority, string][];

function GoalFormDialog({ open, mode, goal, onOpenChange, onSubmit }: GoalFormDialogProps) {
  const isEditing = mode === "edit";
  const [form, setForm] = useState<GoalFormValues>(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setForm(isEditing && goal ? goalToFormValues(goal) : EMPTY_FORM);
    }
  }, [open, goal, isEditing]);

  function handleChange(field: keyof GoalFormValues, value: string | number | undefined) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit(form);
    onOpenChange(false);
  }

  const isValid = form.name.trim().length > 0 && form.targetAmount > 0;

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Editar meta" : "Nueva meta"}
      description={
        isEditing
          ? "Modificá los datos de tu meta financiera."
          : "Definí un objetivo de ahorro y seguí tu progreso."
      }
      closeLabel={isEditing ? "Cerrar editor de meta" : "Cerrar formulario de nueva meta"}
      contentClassName="goals-dialog__content--form"
    >
      <form className="goal-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="analysis-form-field">
          <label className="analysis-form-field__label" htmlFor="goal-name">
            Nombre
          </label>
          <input
            id="goal-name"
            className="analysis-form-field__input"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej: Viaje a Europa"
            required
          />
        </div>

        {/* Description */}
        <div className="analysis-form-field">
          <div className="analysis-form-field__label-row">
            <label className="analysis-form-field__label" htmlFor="goal-description">
              Descripción
            </label>
            <span className="analysis-form-field__badge">Opcional</span>
          </div>
          <textarea
            id="goal-description"
            className="analysis-form-field__input goals-dialog__textarea"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Una breve descripción de tu meta"
          />
        </div>

        {/* Category & Priority row */}
        <div className="goal-form__row">
          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-category">
              Categoría
            </label>
            <select
              id="goal-category"
              className="analysis-form-field__input"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              {CATEGORY_OPTIONS.map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.emoji} {meta.label}
                </option>
              ))}
            </select>
          </div>

          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-priority">
              Prioridad
            </label>
            <select
              id="goal-priority"
              className="analysis-form-field__input"
              value={form.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              {PRIORITY_OPTIONS.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Amounts row */}
        <div className="goal-form__row">
          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-target">
              Monto objetivo
            </label>
            <input
              id="goal-target"
              className="analysis-form-field__input"
              type="number"
              min={1}
              value={form.targetAmount || ""}
              onChange={(e) => handleChange("targetAmount", Number(e.target.value))}
              placeholder="200000"
              required
            />
          </div>

          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-saved">
              Ya ahorrado
            </label>
            <input
              id="goal-saved"
              className="analysis-form-field__input"
              type="number"
              min={0}
              value={form.savedAmount || ""}
              onChange={(e) => handleChange("savedAmount", Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        {/* Date & Monthly contribution row */}
        <div className="goal-form__row">
          <div className="analysis-form-field">
            <div className="analysis-form-field__label-row">
              <label className="analysis-form-field__label" htmlFor="goal-date">
                Fecha límite
              </label>
              <span className="analysis-form-field__badge">Opcional</span>
            </div>
            <input
              id="goal-date"
              className="analysis-form-field__input"
              type="date"
              value={form.targetDate ?? ""}
              onChange={(e) => handleChange("targetDate", e.target.value || undefined)}
            />
          </div>

          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-monthly">
              Aporte mensual sugerido
            </label>
            <input
              id="goal-monthly"
              className="analysis-form-field__input"
              type="number"
              min={0}
              value={form.suggestedMonthlyContribution || ""}
              onChange={(e) => handleChange("suggestedMonthlyContribution", Number(e.target.value))}
              placeholder="20000"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="analysis-dialog__actions">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isValid}>
            {isEditing ? "Guardar cambios" : "Crear meta"}
          </Button>
        </div>
      </form>
    </GoalDialogShell>
  );
}

export default GoalFormDialog;
