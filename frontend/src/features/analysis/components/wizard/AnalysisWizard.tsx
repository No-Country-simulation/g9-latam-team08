import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import FinancialDataStep from "../financial-data/FinancialDataStep";
import ReviewStep from "../review/ReviewStep";
import TransactionsStep from "../transactions/TransactionsStep";
import {
  analysisDraftSchema,
  type AnalysisDraftFormValues,
} from "../../schemas/analysis.schema";
import { useAnalysisFlow } from "../../hooks/useAnalysisFlow";
import { useAnalysisDraftPersistence } from "../../hooks/useAnalysisDraftPersistence";
import { loadDraft } from "../../utils/draftStorage";
import { createEmptyAnalysisDraft } from "../../types/analysis-draft";
import type { AnalysisWizardStep } from "../../types/analysis-flow";
import AnalysisStepper from "./AnalysisStepper";
import "./AnalysisWizard.css";

const stepOneFieldNames = [
  "financialData.incomes",
  "financialData.estimatedMonthlySavings",
  "financialData.monthlyDebtPayments",
  "financialData.emergencyFundAmount",
  "financialData.savingsFrequency",
] as const satisfies ReadonlyArray<
  | "financialData.incomes"
  | "financialData.estimatedMonthlySavings"
  | "financialData.monthlyDebtPayments"
  | "financialData.emergencyFundAmount"
  | "financialData.savingsFrequency"
>;

const getCurrentUserId = (): string => {
  if (typeof window === "undefined") {
    return "anonymous";
  }

  return window.localStorage.getItem("userId") ?? "anonymous";
};

const hasDraftContent = (draft: AnalysisDraftFormValues): boolean =>
  draft.financialData.incomes.length > 0 ||
  draft.transactions.length > 0 ||
  draft.financialData.estimatedMonthlySavings !== null ||
  draft.financialData.monthlyDebtPayments !== null ||
  draft.financialData.emergencyFundAmount !== null ||
  draft.financialData.savingsFrequency !== null;

function AnalysisWizard() {
  const userId = useMemo(() => getCurrentUserId(), []);
  const emptyDraft = useMemo(() => createEmptyAnalysisDraft(), []);
  const defaultValues = useMemo<AnalysisDraftFormValues>(() => {
    return loadDraft(userId) ?? emptyDraft;
  }, [emptyDraft, userId]);

  const methods = useForm<AnalysisDraftFormValues>({
    resolver: zodResolver(analysisDraftSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const {
    flow,
    nextStep,
    previousStep,
    goToStep,
    goToReview,
    editStepFromReview,
    finishReviewEdit,
    startProcessing,
    showResult,
    resetFlow,
  } = useAnalysisFlow();
  const { resetDraftState } = useAnalysisDraftPersistence({
    control: methods.control,
    reset: methods.reset,
    userId,
    emptyDraft,
    defaultValues,
  });

  const validateStepOne = async (): Promise<boolean> => {
    const isStepOneStructurallyValid = await methods.trigger(stepOneFieldNames);
    const incomes = methods.getValues("financialData.incomes");

    if (incomes.length === 0) {
      methods.setError("financialData.incomes", {
        type: "manual",
        message: "Agregá al menos una fuente de ingreso válida",
      });
      return false;
    }

    methods.clearErrors("financialData.incomes");
    return isStepOneStructurallyValid;
  };

  const validateStepTwo = async (): Promise<boolean> => {
    const areTransactionsStructurallyValid = await methods.trigger("transactions");
    const transactions = methods.getValues("transactions");

    if (transactions.length < 3) {
      methods.setError("transactions", {
        type: "manual",
        message: "Agregá al menos 3 transacciones válidas para continuar.",
      });
      return false;
    }

    methods.clearErrors("transactions");
    return areTransactionsStructurallyValid;
  };

  const handleCancelAnalysis = () => {
    const currentDraft = methods.getValues();

    if (
      hasDraftContent(currentDraft) &&
      !window.confirm("Se borrará el borrador actual. ¿Querés cancelar el análisis?")
    ) {
      return;
    }

    resetDraftState();
    methods.reset(emptyDraft);
    resetFlow();
  };

  const handleContinue = async () => {
    if (flow.currentStep === 1) {
      const isStepOneValid = await validateStepOne();

      if (!isStepOneValid) {
        return;
      }

      if (flow.returnToReviewAfterEdit) {
        finishReviewEdit();
        return;
      }

      nextStep();
      return;
    }

    if (flow.currentStep === 2) {
      const isStepTwoValid = await validateStepTwo();

      if (!isStepTwoValid) {
        return;
      }

      if (flow.returnToReviewAfterEdit) {
        finishReviewEdit();
        return;
      }

      nextStep();
    }
  };

  const handleReturnToReview = async () => {
    if (flow.currentStep === 1) {
      const isStepOneValid = await validateStepOne();

      if (!isStepOneValid) {
        return;
      }

      finishReviewEdit();
      return;
    }

    if (flow.currentStep === 2) {
      const isStepTwoValid = await validateStepTwo();

      if (!isStepTwoValid) {
        return;
      }

      finishReviewEdit();
    }
  };

  const handleAnalyze = async () => {
    const isStepOneValid = await validateStepOne();

    if (!isStepOneValid) {
      goToStep(1);
      return;
    }

    const isStepTwoValid = await validateStepTwo();

    if (!isStepTwoValid) {
      goToStep(2);
      return;
    }

    const isDraftValid = await methods.trigger();

    if (!isDraftValid) {
      if (methods.formState.errors.financialData) {
        goToStep(1);
        return;
      }

      if (methods.formState.errors.transactions) {
        goToStep(2);
      }

      return;
    }

    startProcessing();
  };

  const handleBack = () => {
    previousStep();
  };

  const handleStepClick = (step: AnalysisWizardStep) => {
    if (step <= flow.currentStep) {
      goToStep(step);
    }
  };

  const primaryActionLabel =
    flow.returnToReviewAfterEdit && flow.currentStep < 3
      ? "Guardar y volver a revisión"
      : flow.currentStep === 3
        ? "Analizar mis finanzas"
        : "Siguiente";

  return (
    <FormProvider {...methods}>
      <section className="analysis-wizard" aria-labelledby="analysis-wizard-title">
        <header className="analysis-wizard__header">
          <div>
            <h1 id="analysis-wizard-title">Nuevo análisis</h1>
            <p className="analysis-wizard__description">
              Ingresá información aproximada sobre tu situación actual.
              Los indicadores financieros se calcularán durante el análisis.
            </p>
          </div>
        </header>

        {flow.screen === "wizard" ? (
          <div className="analysis-wizard__shell">
            <AnalysisStepper currentStep={flow.currentStep} onStepClick={handleStepClick} />

            {flow.currentStep === 1 ? <FinancialDataStep /> : null}
            {flow.currentStep === 2 ? <TransactionsStep /> : null}
            {flow.currentStep === 3 ? (
              <ReviewStep
                onEditFinancialData={() => editStepFromReview(1)}
                onEditTransactions={() => editStepFromReview(2)}
              />
            ) : null}

            <div className="analysis-wizard__actions">
              {flow.returnToReviewAfterEdit && flow.currentStep < 3 ? (
                <Button type="button" variant="ghost" onClick={handleReturnToReview}>
                  Volver a revisión
                </Button>
              ) : flow.currentStep === 1 ? (
                <Button type="button" variant="ghost" onClick={handleCancelAnalysis}>
                  Cancelar análisis
                </Button>
              ) : (
                <Button type="button" variant="ghost" onClick={handleBack}>
                  Volver
                </Button>
              )}

              <div className="analysis-wizard__actions-group">
                {flow.currentStep < 3 ? (
                  <Button type="button" onClick={handleContinue}>
                    {primaryActionLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="button" onClick={handleAnalyze}>
                    {primaryActionLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {flow.screen === "processing" ? (
          <Card className="analysis-wizard__panel">
            <div className="analysis-wizard__step-placeholder">
              <span className="analysis-wizard__step-kicker">Procesando</span>
              <h2>Analizando tus finanzas</h2>
              <p>
                TEMP-FE: esta pantalla representa únicamente un estado visual base.
                Todavía no refleja progreso real de Backend ni de Data Science.
              </p>
            </div>

            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={goToReview}>
                Volver a revisión
              </Button>
              <Button type="button" onClick={showResult}>
                Ver resultado placeholder
              </Button>
            </div>
          </Card>
        ) : null}

        {flow.screen === "result" ? (
          <Card className="analysis-wizard__panel">
            <div className="analysis-wizard__step-placeholder">
              <span className="analysis-wizard__step-kicker">Resultado</span>
              <h2>Resultado disponible próximamente</h2>
              <p>
                TODO-BE-CONTRACT: la carga de resultados definitivos dependerá del contrato
                final con Backend.
              </p>
            </div>

            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={goToReview}>
                Volver a revisión
              </Button>
              <Button type="button" onClick={resetFlow}>
                Reiniciar flujo
              </Button>
            </div>
          </Card>
        ) : null}
      </section>
    </FormProvider>
  );
}

export default AnalysisWizard;
