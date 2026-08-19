import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import Button from "../../../../components/ui/Button";
import MoneyInput from "../../../analysis/components/shared/MoneyInput";
import { formatCurrency } from "../../../../utils/formatters";
import type { ContributionOrigin, Goal } from "../../types/goal";
import { getTodayIsoDate, isValidIsoDate } from "../../utils/dateUtils";
import { getRemainingAmount } from "../../utils/goalCalculations";
import GoalDialogShell from "./GoalDialogShell";

const contributionOriginOptions = ["MONTHLY_SAVINGS", "EXTRA_INCOME", "OTHER"] as const;

const contributionOriginLabels: Record<ContributionOrigin, string> = {
  MONTHLY_SAVINGS: "Ahorro mensual",
  EXTRA_INCOME: "Ingreso extra",
  OTHER: "Otro",
};

const createContributionSchema = (remainingAmount: number) =>
  z.object({
    amount: z
      .union([z.number().finite(), z.null()])
      .refine((value) => value !== null && value > 0, "El aporte debe ser mayor a 0")
      .refine(
        (value) => value !== null && value <= remainingAmount,
        `El aporte no puede superar ${formatCurrency(remainingAmount)}`,
      ),
    date: z
      .string()
      .trim()
      .min(1, "La fecha es obligatoria")
      .refine((value) => isValidIsoDate(value), "Ingresá una fecha válida"),
    origin: z.enum(contributionOriginOptions, {
      error: "Seleccioná un origen válido",
    }),
    note: z
      .string()
      .trim()
      .max(240, "La nota es demasiado larga")
      .optional()
      .transform((value) => value ?? ""),
  });

type ContributionSchema = ReturnType<typeof createContributionSchema>;
type ContributionFormValues = z.input<ContributionSchema>;
type ContributionSubmitValues = z.output<ContributionSchema>;

const createDefaultContributionValues = (): ContributionFormValues => ({
  amount: null,
  date: getTodayIsoDate(),
  origin: "MONTHLY_SAVINGS",
  note: "",
});

interface ContributionDialogProps {
  open: boolean;
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    amount: number;
    date: string;
    origin: ContributionOrigin;
    note?: string;
  }) => void;
}

function ContributionDialog({ open, goal, onOpenChange, onSubmit }: ContributionDialogProps) {
  const remainingAmount = goal ? getRemainingAmount(goal) : 0;
  const schema = createContributionSchema(remainingAmount);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContributionFormValues, undefined, ContributionSubmitValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultContributionValues(),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(createDefaultContributionValues());
  }, [goal, open, reset]);

  if (!goal) {
    return null;
  }

  const isContributionAvailable = remainingAmount > 0;

  return (
    <GoalDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Registrar aporte"
      description="Sumá un nuevo aporte y actualizá el avance de tu meta."
      closeLabel="Cerrar modal de aporte"
      contentClassName="goals-dialog__content--compact"
    >
      <form
        noValidate
        className="analysis-dialog__form"
        onSubmit={handleSubmit((values) => {
          if (values.amount === null) {
            return;
          }

          onSubmit({
            amount: values.amount,
            date: values.date,
            origin: values.origin,
            note: values.note || undefined,
          });
          onOpenChange(false);
        })}
      >
        <div className="goals-dialog__scroll-area">
          <div className="goals-dialog__summary">
            <span>{goal.name}</span>
            <strong>{formatCurrency(goal.savedAmount)} ahorrados actualmente</strong>
          </div>

          {!isContributionAvailable ? (
            <div className="goals-dialog__impact">
              <span>Meta ya cubierta</span>
              <strong>Ya alcanzaste el monto objetivo de esta meta.</strong>
            </div>
          ) : null}

          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <MoneyInput
                id="goal-contribution-amount"
                label="Monto del aporte"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="$ 0"
                required
                error={errors.amount?.message}
              />
            )}
          />

          <div className="goals-dialog__grid">
            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="goal-contribution-date">
                Fecha
              </label>
              <input
                id="goal-contribution-date"
                type="date"
                className={`analysis-form-field__input${
                  errors.date ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.date ? "true" : "false"}
                aria-describedby={errors.date ? "goal-contribution-date-error" : undefined}
                {...register("date")}
              />
              {errors.date ? (
                <p
                  id="goal-contribution-date-error"
                  className="analysis-form-field__error"
                  role="alert"
                >
                  {errors.date.message}
                </p>
              ) : null}
            </div>

            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="goal-contribution-origin">
                Origen del dinero
              </label>
              <select
                id="goal-contribution-origin"
                className={`analysis-form-field__input${
                  errors.origin ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.origin ? "true" : "false"}
                aria-describedby={errors.origin ? "goal-contribution-origin-error" : undefined}
                {...register("origin")}
              >
                {contributionOriginOptions.map((origin) => (
                  <option key={origin} value={origin}>
                    {contributionOriginLabels[origin]}
                  </option>
                ))}
              </select>
              {errors.origin ? (
                <p
                  id="goal-contribution-origin-error"
                  className="analysis-form-field__error"
                  role="alert"
                >
                  {errors.origin.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="analysis-form-field">
            <div className="analysis-form-field__label-row">
              <label className="analysis-form-field__label" htmlFor="goal-contribution-note">
                Nota
              </label>
              <span className="analysis-form-field__badge">Opcional</span>
            </div>
            <textarea
              id="goal-contribution-note"
              className={`analysis-form-field__input goals-dialog__textarea${
                errors.note ? " analysis-form-field__input--error" : ""
              }`}
              placeholder="Por ejemplo: bono, freelance, ajuste del presupuesto."
              aria-invalid={errors.note ? "true" : "false"}
              aria-describedby={errors.note ? "goal-contribution-note-error" : undefined}
              {...register("note")}
            />
            {errors.note ? (
              <p id="goal-contribution-note-error" className="analysis-form-field__error" role="alert">
                {errors.note.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="analysis-dialog__actions goals-dialog__footer">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isContributionAvailable}>
            Registrar aporte
          </Button>
        </div>
      </form>
    </GoalDialogShell>
  );
}

export default ContributionDialog;
