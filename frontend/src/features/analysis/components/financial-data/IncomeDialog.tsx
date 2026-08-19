import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import Button from "../../../../components/ui/Button";
import MoneyInput from "../shared/MoneyInput";
import {
  incomeTypeOptions,
  type AnalysisIncomeDraftItem,
  type IncomeType,
} from "../../types/analysis-draft";

const incomeDialogSchema = z.object({
  description: z.string().trim().min(1, "La descripción es obligatoria"),
  monthlyAmount: z
    .union([z.number().finite(), z.null()])
    .refine((value) => value !== null && value > 0, "El monto debe ser mayor a 0"),
  incomeType: z.enum(incomeTypeOptions, {
    error: "Seleccioná un tipo de ingreso válido",
  }),
});

type IncomeDialogFormValues = z.infer<typeof incomeDialogSchema>;

const incomeTypeLabels = {
  SALARY: "Sueldo",
  FREELANCE: "Trabajo freelance",
  BUSINESS: "Negocio / emprendimiento",
  BENEFIT: "Beneficio / pensión",
  OTHER: "Otro ingreso",
} as const;

const createDefaultIncomeValues = (
  income?: AnalysisIncomeDraftItem | null,
): IncomeDialogFormValues => ({
  description: income?.description ?? "",
  monthlyAmount: income?.monthlyAmount ?? null,
  incomeType: income?.incomeType ?? "SALARY",
});

interface IncomeDialogProps {
  open: boolean;
  mode: "create" | "edit";
  income?: AnalysisIncomeDraftItem | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    description: string;
    monthlyAmount: number;
    incomeType: IncomeType;
  }) => void;
}

function IncomeDialog({
  open,
  mode,
  income,
  onOpenChange,
  onSubmit,
}: IncomeDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncomeDialogFormValues>({
    resolver: zodResolver(incomeDialogSchema),
    defaultValues: createDefaultIncomeValues(income),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!open) {
      reset(createDefaultIncomeValues(income));
      return;
    }

    reset(createDefaultIncomeValues(income));
  }, [income, open, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="analysis-dialog__overlay" />
        <Dialog.Content className="analysis-dialog__content">
          <div className="analysis-dialog__header">
            <div>
              <Dialog.Title className="analysis-dialog__title">
                {mode === "create" ? "Agregar ingreso" : "Editar ingreso"}
              </Dialog.Title>
              <Dialog.Description className="analysis-dialog__description">
                Completá la información de la fuente de ingreso.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="analysis-dialog__close"
                aria-label="Cerrar modal de ingreso"
              >
                <X size={20} strokeWidth={2.6} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <form
            noValidate
            className="analysis-dialog__form"
            onSubmit={handleSubmit((values) => {
              if (values.monthlyAmount === null) {
                return;
              }

              onSubmit({
                ...values,
                monthlyAmount: values.monthlyAmount,
              });
              onOpenChange(false);
            })}
          >
            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="income-description">
                Descripción
              </label>
              <input
                id="income-description"
                className={`analysis-form-field__input${
                  errors.description ? " analysis-form-field__input--error" : ""
                }`}
                placeholder="Sueldo principal"
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={errors.description ? "income-description-error" : undefined}
                {...register("description")}
              />
              {errors.description ? (
                <p
                  id="income-description-error"
                  className="analysis-form-field__error"
                  role="alert"
                >
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <Controller
              control={control}
              name="monthlyAmount"
              render={({ field }) => (
                <MoneyInput
                  id="income-monthly-amount"
                  label="Monto mensual"
                  helperText="Ingresá el monto aproximado que recibís por mes."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  required
                  error={errors.monthlyAmount?.message}
                />
              )}
            />

            <div className="analysis-form-field">
              <label className="analysis-form-field__label" htmlFor="income-type">
                Tipo de ingreso
              </label>
              <select
                id="income-type"
                className={`analysis-form-field__input${
                  errors.incomeType ? " analysis-form-field__input--error" : ""
                }`}
                aria-invalid={errors.incomeType ? "true" : "false"}
                aria-describedby={errors.incomeType ? "income-type-error" : undefined}
                {...register("incomeType")}
              >
                {incomeTypeOptions.map((incomeType) => (
                  <option key={incomeType} value={incomeType}>
                    {incomeTypeLabels[incomeType]}
                  </option>
                ))}
              </select>
              {errors.incomeType ? (
                <p id="income-type-error" className="analysis-form-field__error" role="alert">
                  {errors.incomeType.message}
                </p>
              ) : null}
            </div>

            <div className="analysis-dialog__actions">
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {mode === "create" ? <Plus size={16} aria-hidden="true" /> : null}
                {mode === "create" ? "Agregar ingreso" : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default IncomeDialog;
