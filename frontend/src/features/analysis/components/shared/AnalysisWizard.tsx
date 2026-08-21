import { ArrowLeft, ArrowRight, LoaderCircle, RefreshCw } from "lucide-react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import FinancialDataStep from "../steps/FinancialDataStep";
import ReviewStep from "../review/ReviewStep";
import AnalysisResultView from "../result/AnalysisResultView";
import TransactionsStep from "../transactions/TransactionsStep";
import {
  analysisDraftSchema,
  type AnalysisDraftFormValues,
} from "../../schemas/analysis.schema";
import { useAnalysisFlow } from "../../hooks/useAnalysisFlow";
import { useAnalysisDraftPersistence } from "../../hooks/useAnalysisDraftPersistence";
import { useRunAnalysis } from "../../hooks/useRunAnalysis";
import { loadDraft } from "../../utils/draftStorage";
import { createEmptyAnalysisDraft, type AnalysisDraft } from "../../types/analysis-draft";
import type { AnalysisWizardStep } from "../../types/analysis-flow";
import { MockAnalysisGateway } from "../../gateways/MockAnalysisGateway";
import { RealAnalysisGateway } from "../../gateways/RealAnalysisGateway";
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

  const gateway = useMemo(() => new RealAnalysisGateway(), []);

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

  const {
    analysisResult,
    analysisError,
    isAnalyzing,
    runAnalysis,
    resetAnalysisState,
  } = useRunAnalysis({
    gateway,
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
    resetAnalysisState();
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

  const executeAnalysis = async (draft: AnalysisDraft): Promise<void> => {
    startProcessing();
    const result = await runAnalysis(draft);
    if (result) {
      showResult();
    }
  };

  const handleAnalyze = async () => {
    if (isAnalyzing) {
      return;
    }

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

    await executeAnalysis(methods.getValues());
  };

  const handleRetryAnalysis = async () => {
    if (isAnalyzing) {
      return;
    }
    await executeAnalysis(methods.getValues());
  };

  const handleBack = () => {
    previousStep();
  };

  const handleNewAnalysis = () => {
    resetDraftState();
    resetAnalysisState();
    methods.reset(emptyDraft);
    resetFlow();
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
                  <ArrowLeft size={16} aria-hidden="true" />
                  Volver a revisión
                </Button>
              ) : flow.currentStep === 1 ? (
                <Button type="button" variant="danger" onClick={handleCancelAnalysis}>
                  Cancelar análisis
                </Button>
              ) : (
                <Button type="button" variant="secondary" onClick={handleBack}>
                  <ArrowLeft size={16} aria-hidden="true" />
                  Volver
                </Button>
              )}

              <div className="analysis-wizard__actions-group">
                {flow.currentStep < 3 ? (
                  <Button type="button" onClick={handleContinue} className="analysis-wizard__next-button">
                    {primaryActionLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="button" onClick={handleAnalyze} disabled={isAnalyzing}>
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
              {analysisError ? (
                <p>No pudimos completar el análisis.</p>
              ) : (
                <>
                  <p>
                    Estamos preparando tus indicadores y recomendaciones a partir de la
                    información cargada.
                  </p>
                  <div
                    className="analysis-wizard__processing-state"
                    role="status"
                    aria-live="polite"
                  >
                    <LoaderCircle
                      className="analysis-wizard__spinner"
                      size={28}
                      aria-hidden="true"
                    />
                    <span>Procesando información</span>
                  </div>
                </>
              )}
            </div>

            {analysisError ? (
              <div className="analysis-wizard__actions">
                <Button type="button" onClick={handleRetryAnalysis} disabled={isAnalyzing}>
                  <RefreshCw size={16} aria-hidden="true" />
                  Reintentar
                </Button>
                <Button type="button" variant="secondary" onClick={goToReview}>
                  <ArrowLeft size={16} aria-hidden="true" />
                  Volver a revisión
                </Button>
              </div>
            ) : null}
          </Card>
        ) : null}

        {flow.screen === "result" && analysisResult ? (
          <AnalysisResultView
            result={analysisResult}
            onNewAnalysis={handleNewAnalysis}
            onBackToReview={goToReview}
          />
        ) : null}

        {flow.screen === "result" && !analysisResult ? (
          <Card className="analysis-wizard__panel">
            <div className="analysis-wizard__step-placeholder">
              <span className="analysis-wizard__step-kicker">Resultado</span>
              <h2>No hay un resultado disponible.</h2>
              <p>Volvé a revisión para ejecutar nuevamente el análisis cuando quieras.</p>
            </div>
            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={goToReview}>
                <ArrowLeft size={16} aria-hidden="true" />
                Volver a revisión
              </Button>
              <Button type="button" onClick={handleNewAnalysis}>
                Nuevo análisis
              </Button>
            </div>
          </Card>
        ) : null}
      </section>
    </FormProvider>
  );
}

export default AnalysisWizard;
