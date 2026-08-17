import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useMemo, useState } from "react";
import Button from "../../../../components/ui/Button";
import type { AnalysisDraftFormValues } from "../../schemas/analysis.schema";
import type { AnalysisIncomeDraftItem } from "../../types/analysis-draft";
import IncomeDialog from "./IncomeDialog";
import IncomeList from "./IncomeList";
import IncomeSummary from "./IncomeSummary";
import MoneyInput from "../shared/MoneyInput";
import "./FinancialDataStep.css";

const createIncomeId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `income-${Date.now()}-${Math.round(Math.random() * 100000)}`;
};

function FinancialDataStep() {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext<AnalysisDraftFormValues>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<AnalysisIncomeDraftItem | null>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "financialData.incomes",
  });

  const incomes = useWatch({
    control,
    name: "financialData.incomes",
  }) ?? [];

  const totalIncome = useMemo(
    () => incomes.reduce((total, income) => total + (income.monthlyAmount || 0), 0),
    [incomes],
  );

  const incomeArrayError =
    errors.financialData?.incomes && !Array.isArray(errors.financialData.incomes)
      ? errors.financialData.incomes.message
      : undefined;

  const openCreateDialog = () => {
    setEditingIncome(null);
    setDialogOpen(true);
  };

  const openEditDialog = (income: AnalysisIncomeDraftItem) => {
    setEditingIncome(income);
    setDialogOpen(true);
  };

  const handleSubmitIncome = (incomeValues: Omit<AnalysisIncomeDraftItem, "id">) => {
    if (editingIncome) {
      const index = fields.findIndex((field) => field.id === editingIncome.id);
      if (index >= 0) {
        update(index, {
          ...editingIncome,
          ...incomeValues,
        });
      }
    } else {
      append({
        id: createIncomeId(),
        ...incomeValues,
      });
    }

    clearErrors("financialData.incomes");
    setEditingIncome(null);
  };

  const handleRemoveIncome = (income: AnalysisIncomeDraftItem) => {
    const index = fields.findIndex((field) => field.id === income.id);
    if (index >= 0) {
      remove(index);
    }
  };

  return (
    <div className="financial-data-step">
      <section className="analysis-card analysis-card--financial">
        <div className="analysis-card__section-header">
          <p className="analysis-card__eyebrow">DATOS FINANCIEROS</p>
          <h2>Empecemos con una foto general de tus ingresos y capacidad de ahorro.</h2>
          <p>
            No hace falta que los montos sean exactos. Con una aproximacion alcanza
            para calcular los indicadores iniciales del analisis.
          </p>
        </div>

        <div className="analysis-card__section">
          <div className="analysis-card__header analysis-card__header--stacked">
            <div>
              <h3>1. Ingresos mensuales *</h3>
              <p>Registra las fuentes que forman parte de tu ingreso habitual hoy.</p>
            </div>
          </div>

          <div className="financial-data-step__income-layout">
            <div className="financial-data-step__income-column">
              <IncomeList
                incomes={incomes}
                error={typeof incomeArrayError === "string" ? incomeArrayError : undefined}
                onEdit={openEditDialog}
                onRemove={handleRemoveIncome}
              />

              <div className="financial-data-step__add-income">
                <Button type="button" variant="secondary" fullWidth onClick={openCreateDialog}>
                  Agregar ingreso
                </Button>
              </div>
            </div>

            <aside className="financial-data-step__sidebar">
              <IncomeSummary totalIncome={totalIncome} />
            </aside>
          </div>
        </div>

        <div className="analysis-card__divider" aria-hidden="true" />

        <div className="analysis-card__section">
          <div className="analysis-card__header analysis-card__header--stacked">
            <div>
              <h3>2. Informacion complementaria</h3>
              <p>Estos datos ayudan a contextualizar tu situacion financiera actual.</p>
            </div>
          </div>

          <div className="financial-data-step__grid">
            <Controller
              control={control}
              name="financialData.estimatedMonthlySavings"
              render={({ field }) => (
                <MoneyInput
                  id="estimated-monthly-savings"
                  label="Ahorro mensual estimado"
                  helperText="Cuanto estimas que ahorras normalmente durante un mes?"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  error={errors.financialData?.estimatedMonthlySavings?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="financialData.monthlyDebtPayments"
              render={({ field }) => (
                <MoneyInput
                  id="monthly-debt-payments"
                  label="Pagos mensuales de deuda"
                  helperText="Inclui prestamos, cuotas y otros compromisos financieros."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  error={errors.financialData?.monthlyDebtPayments?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="financialData.emergencyFundAmount"
              render={({ field }) => (
                <MoneyInput
                  id="emergency-fund-amount"
                  label="Fondo de emergencia disponible"
                  helperText="Dinero que ya tenes reservado actualmente para afrontar imprevistos."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="$ 0"
                  error={errors.financialData?.emergencyFundAmount?.message}
                />
              )}
            />

            <div className="analysis-form-field">
              <div className="analysis-form-field__label-row">
                <label className="analysis-form-field__label" htmlFor="savings-frequency">
                  Frecuencia de ahorro
                </label>
                <span className="analysis-form-field__badge">Opcional</span>
              </div>
              <p className="analysis-form-field__helper">
                Selecciona la frecuencia que mejor describa tu habito actual.
              </p>
              <Controller
                control={control}
                name="financialData.savingsFrequency"
                render={({ field }) => (
                  <select
                    id="savings-frequency"
                    className={`analysis-form-field__input${
                      errors.financialData?.savingsFrequency
                        ? " analysis-form-field__input--error"
                        : ""
                    }`}
                    value={field.value ?? ""}
                    onChange={(event) =>
                      field.onChange(event.target.value ? event.target.value : null)
                    }
                    onBlur={field.onBlur}
                    aria-invalid={errors.financialData?.savingsFrequency ? "true" : "false"}
                    aria-describedby={
                      errors.financialData?.savingsFrequency
                        ? "savings-frequency-error"
                        : undefined
                    }
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="WEEKLY">Semanal</option>
                    <option value="BIWEEKLY">Quincenal</option>
                    <option value="MONTHLY">Mensual</option>
                    <option value="IRREGULAR">Irregular</option>
                    <option value="NONE">Sin frecuencia definida</option>
                  </select>
                )}
              />
              {errors.financialData?.savingsFrequency ? (
                <p id="savings-frequency-error" className="analysis-form-field__error" role="alert">
                  {errors.financialData.savingsFrequency.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <section className="analysis-banner" aria-label="Informacion del analisis">
          <p>
            Esta informacion se combinara mas adelante con tus transacciones para
            calcular indicadores y generar recomendaciones personalizadas.
          </p>
        </section>
      </section>

      <IncomeDialog
        open={dialogOpen}
        mode={editingIncome ? "edit" : "create"}
        income={editingIncome}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingIncome(null);
          }
        }}
        onSubmit={handleSubmitIncome}
      />
    </div>
  );
}

export default FinancialDataStep;
