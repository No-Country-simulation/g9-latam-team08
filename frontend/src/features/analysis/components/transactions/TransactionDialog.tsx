import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import Button from "../../../../components/ui/Button";
import MoneyInput from "../shared/MoneyInput";
import {
  movementTypeOptions,
  paymentMethodOptions,
  purchaseModeOptions,
  type AnalysisTransactionDraftItem,
  type MovementType,
  type PaymentMethod,
  type PurchaseMode,
} from "../../types/analysis-draft";
import {
  movementTypeLabels,
  paymentMethodLabels,
  purchaseModeLabels,
} from "./transactionUtils";

const isValidIsoDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const candidate = new Date(year, month - 1, day);

  return (
    candidate.getFullYear() === year &&
    candidate.getMonth() === month - 1 &&
    candidate.getDate() === day
  );
};

const enumField = <T extends readonly string[]>(options: T, message: string) =>
  z
    .string()
    .refine(
      (value) => options.includes(value),
      message,
    )
    .transform((value) => value as T[number]);

const transactionDialogSchema = z.object({
  description: z.string().trim().min(1, "La descripción es obligatoria"),
  amount: z
    .union([z.number().finite(), z.null()])
    .refine((value) => value !== null && value > 0, "El monto debe ser mayor a 0"),
  date: z
    .string()
    .trim()
    .min(1, "La fecha es obligatoria")
    .refine((value) => isValidIsoDate(value), "Ingresá una fecha válida"),
  paymentMethod: enumField(paymentMethodOptions, "Seleccioná un medio de pago válido"),
  purchaseMode: enumField(purchaseModeOptions, "Seleccioná una modalidad válida"),
  movementType: enumField(movementTypeOptions, "Seleccioná un tipo de movimiento válido"),
});

type TransactionDialogFormValues = z.input<typeof transactionDialogSchema>;
type TransactionDialogSubmitValues = z.output<typeof transactionDialogSchema>;

const createDefaultTransactionValues = (
  transaction?: AnalysisTransactionDraftItem | null,
): TransactionDialogFormValues => ({
  description: transaction?.description ?? "",
  amount: transaction?.amount ?? null,
  date: transaction?.date ?? "",
  paymentMethod: transaction?.paymentMethod ?? "",
  purchaseMode: transaction?.purchaseMode ?? "",
  movementType: transaction?.movementType ?? "",
});

interface TransactionDialogProps {
  open: boolean;
  mode: "create" | "edit";
  transaction?: AnalysisTransactionDraftItem | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    description: string;
    amount: number;
    date: string;
    paymentMethod: PaymentMethod;
    purchaseMode: PurchaseMode;
    movementType: MovementType;
  }) => void;
}

function TransactionDialog({
  open,
  mode,
  transaction,
  onOpenChange,
  onSubmit,
}: TransactionDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionDialogFormValues, undefined, TransactionDialogSubmitValues>({
    resolver: zodResolver(transactionDialogSchema),
    defaultValues: createDefaultTransactionValues(transaction),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(createDefaultTransactionValues(transaction));
  }, [open, reset, transaction]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="analysis-dialog__overlay" />
        <Dialog.Content className="analysis-dialog__content analysis-transaction-dialog">
          <div className="analysis-dialog__layout">
            <div className="analysis-dialog__header">
              <div>
              <Dialog.Title className="analysis-dialog__title">
                {mode === "create" ? "Nueva transacción" : "Editar transacción"}
              </Dialog.Title>
              <Dialog.Description className="analysis-dialog__description">
                Completá la información principal de la transacción.
              </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="analysis-dialog__close"
                  aria-label="Cerrar modal de transacción"
                >
                  <X size={20} strokeWidth={2.6} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            <form
              noValidate
              className="analysis-dialog__form"
              onSubmit={handleSubmit((values) => {
                if (values.amount === null) {
                  return;
                }

                onSubmit({
                  description: values.description.trim(),
                  amount: values.amount,
                  date: values.date,
                  paymentMethod: values.paymentMethod as PaymentMethod,
                  purchaseMode: values.purchaseMode as PurchaseMode,
                  movementType: values.movementType as MovementType,
                });
                onOpenChange(false);
              })}
            >
              <div className="analysis-dialog__scroll-area">
                <div className="analysis-form-field">
                  <label className="analysis-form-field__label" htmlFor="transaction-description">
                    Descripción
                  </label>
                  <input
                    id="transaction-description"
                    className={`analysis-form-field__input${
                      errors.description ? " analysis-form-field__input--error" : ""
                    }`}
                    placeholder="Carrefour"
                    aria-invalid={errors.description ? "true" : "false"}
                    aria-describedby={errors.description ? "transaction-description-error" : undefined}
                    {...register("description")}
                  />
                  {errors.description ? (
                    <p
                      id="transaction-description-error"
                      className="analysis-form-field__error"
                      role="alert"
                    >
                      {errors.description.message}
                    </p>
                  ) : null}
                </div>

                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <MoneyInput
                      id="transaction-amount"
                      label="Monto"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="$ 0"
                      required
                      error={errors.amount?.message}
                    />
                  )}
                />

                <div className="transactions-dialog__grid">
                  <div className="analysis-form-field">
                    <label className="analysis-form-field__label" htmlFor="transaction-date">
                      Fecha
                    </label>
                    <input
                      id="transaction-date"
                      type="date"
                      className={`analysis-form-field__input${
                        errors.date ? " analysis-form-field__input--error" : ""
                      }`}
                      aria-invalid={errors.date ? "true" : "false"}
                      aria-describedby={errors.date ? "transaction-date-error" : undefined}
                      {...register("date")}
                    />
                    {errors.date ? (
                      <p id="transaction-date-error" className="analysis-form-field__error" role="alert">
                        {errors.date.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="analysis-form-field">
                    <label className="analysis-form-field__label" htmlFor="transaction-payment-method">
                      Medio de pago
                    </label>
                    <select
                      id="transaction-payment-method"
                      className={`analysis-form-field__input${
                        errors.paymentMethod ? " analysis-form-field__input--error" : ""
                      }`}
                      aria-invalid={errors.paymentMethod ? "true" : "false"}
                      aria-describedby={
                        errors.paymentMethod ? "transaction-payment-method-error" : undefined
                      }
                      {...register("paymentMethod")}
                    >
                      <option value="">Seleccioná una opción</option>
                      {paymentMethodOptions.map((paymentMethod) => (
                        <option key={paymentMethod} value={paymentMethod}>
                          {paymentMethodLabels[paymentMethod]}
                        </option>
                      ))}
                    </select>
                    {errors.paymentMethod ? (
                      <p
                        id="transaction-payment-method-error"
                        className="analysis-form-field__error"
                        role="alert"
                      >
                        {errors.paymentMethod.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="transactions-dialog__grid">
                  <div className="analysis-form-field">
                    <label className="analysis-form-field__label" htmlFor="transaction-purchase-mode">
                      Modalidad
                    </label>
                    <select
                      id="transaction-purchase-mode"
                      className={`analysis-form-field__input${
                        errors.purchaseMode ? " analysis-form-field__input--error" : ""
                      }`}
                      aria-invalid={errors.purchaseMode ? "true" : "false"}
                      aria-describedby={
                        errors.purchaseMode ? "transaction-purchase-mode-error" : undefined
                      }
                      {...register("purchaseMode")}
                    >
                      <option value="">Seleccioná una opción</option>
                      {purchaseModeOptions.map((purchaseMode) => (
                        <option key={purchaseMode} value={purchaseMode}>
                          {purchaseModeLabels[purchaseMode]}
                        </option>
                      ))}
                    </select>
                    {errors.purchaseMode ? (
                      <p
                        id="transaction-purchase-mode-error"
                        className="analysis-form-field__error"
                        role="alert"
                      >
                        {errors.purchaseMode.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="analysis-form-field">
                    <label className="analysis-form-field__label" htmlFor="transaction-movement-type">
                      Tipo de movimiento
                    </label>
                    <select
                      id="transaction-movement-type"
                      className={`analysis-form-field__input${
                        errors.movementType ? " analysis-form-field__input--error" : ""
                      }`}
                      aria-invalid={errors.movementType ? "true" : "false"}
                      aria-describedby={
                        errors.movementType ? "transaction-movement-type-error" : undefined
                      }
                      {...register("movementType")}
                    >
                      <option value="">Seleccioná una opción</option>
                      {movementTypeOptions.map((movementType) => (
                        <option key={movementType} value={movementType}>
                          {movementTypeLabels[movementType]}
                        </option>
                      ))}
                    </select>
                    {errors.movementType ? (
                      <p
                        id="transaction-movement-type-error"
                        className="analysis-form-field__error"
                        role="alert"
                      >
                        {errors.movementType.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <p className="transactions-dialog__note">
                  {/* TODO-DATA-CONTRACT: La categoría definitiva será provista por el análisis. */}
                  La categoría se asignará automáticamente durante el análisis.
                </p>
              </div>

              <div className="analysis-dialog__actions analysis-dialog__footer">
                <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {mode === "create" ? <Plus size={16} aria-hidden="true" /> : null}
                  {mode === "create" ? "Agregar transacción" : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default TransactionDialog;
