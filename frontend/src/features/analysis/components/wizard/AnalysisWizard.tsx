import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import FinancialDataStep from "../financial-data/FinancialDataStep";
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

const stepContent: Record<3, { title: string; body: string }> = {
  3: {
    title: "Revisión",
    body: "Revisión",
  },
};

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
    if (flow.currentStep === 2) {
      const areTransactionsStructurallyValid = await methods.trigger("transactions");
      const transactions = methods.getValues("transactions");

      if (transactions.length < 3) {
        methods.setError("transactions", {
          type: "manual",
          message: "Agregá al menos 3 transacciones válidas para continuar.",
        });
        return;
      }

      methods.clearErrors("transactions");

      if (!areTransactionsStructurallyValid) {
        return;
      }

      nextStep();
      return;
    }

    const isStepOneStructurallyValid = await methods.trigger(stepOneFieldNames);
    const incomes = methods.getValues("financialData.incomes");

    if (incomes.length === 0) {
      methods.setError("financialData.incomes", {
        type: "manual",
        message: "Agregá al menos una fuente de ingreso válida",
      });
      return;
    }

    methods.clearErrors("financialData.incomes");

    if (!isStepOneStructurallyValid) {
      return;
    }

    nextStep();
  };

  const handleStepClick = (step: AnalysisWizardStep) => {
    if (step <= flow.currentStep) {
      goToStep(step);
    }
  };

  const activePlaceholder = flow.currentStep === 3 ? stepContent[flow.currentStep] : null;

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

            {flow.currentStep > 2 && activePlaceholder ? (
              <Card className="analysis-wizard__panel">
                <div className="analysis-wizard__step-placeholder">
                  <span className="analysis-wizard__step-kicker">Paso {flow.currentStep}</span>
                  <h2>{activePlaceholder.title}</h2>
                  <p>{activePlaceholder.body}</p>
                </div>
              </Card>
            ) : null}

            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={handleCancelAnalysis}>
                Cancelar análisis
              </Button>

              <div className="analysis-wizard__actions-group">
                {flow.currentStep > 1 ? (
                  <Button type="button" variant="ghost" onClick={previousStep}>
                    Volver
                  </Button>
                ) : null}

                {flow.currentStep < 3 ? (
                  <Button type="button" onClick={handleContinue}>
                    Siguiente
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                ) : (
                  <Button type="button" onClick={startProcessing}>
                    Analizar mis finanzas
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
