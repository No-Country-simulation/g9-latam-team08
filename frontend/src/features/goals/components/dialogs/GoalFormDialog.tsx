import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import Button from "../../../../components/ui/Button";
import MoneyInput from "../../../analysis/components/shared/MoneyInput";
import type { Goal, GoalCategory, GoalPriority } from "../../types/goal";
import { getTodayIsoDate, isValidIsoDate } from "../../utils/dateUtils";
import GoalDialogShell from "./GoalDialogShell";

const goalCategoryOptions = ["TRAVEL", "EMERGENCY", "TECHNOLOGY", "OTHER"] as const;
const goalPriorityOptions = ["LOW", "MEDIUM", "HIGH"] as const;

const categoryLabels: Record<GoalCategory, string> = {
  TRAVEL: "Viaje",
  EMERGENCY: "Fondo de emergencia",
  TECHNOLOGY: "Tecnología",
  OTHER: "Otros",
};

const priorityLabels: Record<GoalPriority, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

const createGoalFormSchema = () =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(80, "Usá un nombre más corto"),
      category: z.enum(goalCategoryOptions, {
        error: "Seleccioná una categoría válida",
      }),
      targetAmount: z
        .union([z.number().finite(), z.null()])
        .refine((value) => value !== null && value > 0, "El monto objetivo debe ser mayor a 0"),
      savedAmount: z
        .union([z.number().finite(), z.null()])
        .transform((value) => value ?? 0)
        .refine((value) => value >= 0, "El ahorro inicial no puede ser negativo"),
      targetDate: z
        .string()
        .trim()
        .optional()
        .transform((value) => value ?? "")
        .refine(
          (value) => value.length === 0 || isValidIsoDate(value),
          "Ingresá una fecha válida",
        )
        .refine(
          (value) => value.length === 0 || value >= getTodayIsoDate(),
          "La fecha objetivo no puede ser anterior a hoy",
        ),
      priority: z.enum(goalPriorityOptions, {
        error: "Seleccioná una prioridad válida",
      }),
      suggestedMonthlyContribution: z
        .union([z.number().finite(), z.null()])
        .transform((value) => value ?? 0)
        .refine((value) => value >= 0, "El aporte mensual estimado no puede ser negativo"),
      description: z
        .string()
        .trim()
        .max(240, "La descripción es demasiado larga")
        .optional()
        .transform((value) => value ?? ""),
    })
    .refine((values) => values.savedAmount <= (values.targetAmount ?? 0), {
      message: "El ahorro inicial no puede superar el monto objetivo",
      path: ["savedAmount"],
    });

type GoalFormSchema = ReturnType<typeof createGoalFormSchema>;
type GoalFormValues = z.input<GoalFormSchema>;
type GoalFormSubmitValues = z.output<GoalFormSchema>;

const createDefaultGoalValues = (goal?: Goal | null): GoalFormValues => ({
  name: goal?.name ?? "",
  category: goal?.category ?? "TRAVEL",
  targetAmount: goal?.targetAmount ?? null,
  savedAmount: goal?.savedAmount ?? 0,
  targetDate: goal?.targetDate ?? "",
  priority: goal?.priority ?? "MEDIUM",
  suggestedMonthlyContribution: goal?.suggestedMonthlyContribution ?? 0,
  description: goal?.description ?? "",
});

interface GoalFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  goal?: Goal | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    name: string;
    category: GoalCategory;
    targetAmount: number;
    savedAmount: number;
    targetDate?: string;
    priority: GoalPriority;
    suggestedMonthlyContribution: number;
    description: string;
  }) => void;
}

function GoalFormDialog({ open, mode, goal, onOpenChange, onSubmit }: GoalFormDialogProps) {
  const schema = createGoalFormSchema();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalFormValues, undefined, GoalFormSubmitValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultGoalValues(goal),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(createDefaultGoalValues(goal));
  }, [goal, open, reset]);

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "create" ? "Nueva meta" : "Editar meta"}
      description="Definí los datos principales de tu objetivo financiero."
      closeLabel="Cerrar modal de meta"
    >
      <form
        noValidate
        className="analysis-dialog__form"
        onSubmit={handleSubmit((values) => {
          if (values.targetAmount === null) {
            return;
          }

          onSubmit({
            name: values.name.trim(),
            category: values.category,
            targetAmount: values.targetAmount,
            savedAmount: values.savedAmount,
            targetDate: values.targetDate || undefined,
            priority: values.priority,
            suggestedMonthlyContribution: values.suggestedMonthlyContribution,
            description: values.description,
          });
          onOpenChange(false);
        })}
      >
        <div className="goals-dialog__scroll-area">
          <div className="analysis-form-field">
            <label className="analysis-form-field__label" htmlFor="goal-name">
              Nombre de la meta
            </label>
            <input
              id="goal-name"
              className={`analysis-form-field__input${errors.name ? " analysis-form-field__input--error" : ""}`}
              placeholder="Viaje a Europa"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "goal-name-error" : undefined}
              {...register("name")}
            />
            {errors.name ? (
              <p id="goal-name-error" className="analysis-form-field__error" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="goals-dialog__grid">
            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="goal-category">
                Categoría
              </label>
              <select
                id="goal-category"
                className={`analysis-form-field__input${
                  errors.category ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.category ? "true" : "false"}
                aria-describedby={errors.category ? "goal-category-error" : undefined}
                {...register("category")}
              >
                {goalCategoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <p id="goal-category-error" className="analysis-form-field__error" role="alert">
                  {errors.category.message}
                </p>
              ) : null}
            </div>

            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="goal-priority">
                Prioridad
              </label>
              <select
                id="goal-priority"
                className={`analysis-form-field__input${
                  errors.priority ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.priority ? "true" : "false"}
                aria-describedby={errors.priority ? "goal-priority-error" : undefined}
                {...register("priority")}
              >
                {goalPriorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priorityLabels[priority]}
                  </option>
                ))}
              </select>
              {errors.priority ? (
                <p id="goal-priority-error" className="analysis-form-field__error" role="alert">
                  {errors.priority.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="goals-dialog__grid">
            <Controller
              control={control}
              name="targetAmount"
              render={({ field }) => (
                <MoneyInput
                  id="goal-target-amount"
                  label="Monto objetivo"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  required
                  error={errors.targetAmount?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="savedAmount"
              render={({ field }) => (
                <MoneyInput
                  id="goal-saved-amount"
                  label="Monto inicial ahorrado"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  error={errors.savedAmount?.message}
                  optionalBadge
                />
              )}
            />
          </div>

          <div className="goals-dialog__grid">
            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="goal-target-date">
                Fecha objetivo
              </label>
              <input
                id="goal-target-date"
                type="date"
                min={getTodayIsoDate()}
                className={`analysis-form-field__input${
                  errors.targetDate ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.targetDate ? "true" : "false"}
                aria-describedby={errors.targetDate ? "goal-target-date-error" : undefined}
                {...register("targetDate")}
              />
              {errors.targetDate ? (
                <p id="goal-target-date-error" className="analysis-form-field__error" role="alert">
                  {errors.targetDate.message}
                </p>
              ) : null}
            </div>

            <Controller
              control={control}
              name="suggestedMonthlyContribution"
              render={({ field }) => (
                <MoneyInput
                  id="goal-suggested-monthly"
                  label="Aporte mensual estimado"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  error={errors.suggestedMonthlyContribution?.message}
                  optionalBadge
                />
              )}
            />
          </div>

          <div className="analysis-form-field">
            <div className="analysis-form-field__label-row">
              <label className="analysis-form-field__label" htmlFor="goal-description">
                Descripción
              </label>
              <span className="analysis-form-field__badge">Opcional</span>
            </div>
            <textarea
              id="goal-description"
              className={`analysis-form-field__input goals-dialog__textarea${
                errors.description ? " analysis-form-field__input--error" : ""
              }`}
              placeholder="Contá brevemente para qué querés alcanzar esta meta."
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "goal-description-error" : undefined}
              {...register("description")}
            />
            {errors.description ? (
              <p id="goal-description-error" className="analysis-form-field__error" role="alert">
                {errors.description.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="analysis-dialog__actions goals-dialog__footer">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit">
            {mode === "create" ? <Plus size={16} aria-hidden="true" /> : null}
            {mode === "create" ? "Crear meta" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </GoalDialogShell>
  );
}

export default GoalFormDialog;
