import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import {
  analysisDraftSchema,
  type AnalysisDraftFormValues,
} from "../../schemas/analysis.schema";
import { useAnalysisFlow } from "../../hooks/useAnalysisFlow";
import { createEmptyAnalysisDraft } from "../../types/analysis-draft";
import { loadDraft } from "../../utils/draftStorage";
import AnalysisStepper from "./AnalysisStepper";
import "./AnalysisWizard.css";

const stepContent: Record<1 | 2 | 3, { title: string; body: string }> = {
  1: {
    title: "Datos financieros",
    body: "Datos financieros",
  },
  2: {
    title: "Transacciones",
    body: "Transacciones",
  },
  3: {
    title: "RevisiÃ³n",
    body: "RevisiÃ³n",
  },
};

const getCurrentUserId = (): string => {
  if (typeof window === "undefined") {
    return "anonymous";
  }

  return window.localStorage.getItem("userId") ?? "anonymous";
};

function AnalysisWizard() {
  const userId = useMemo(() => getCurrentUserId(), []);
  const defaultValues = useMemo<AnalysisDraftFormValues>(() => {
    return loadDraft(userId) ?? createEmptyAnalysisDraft();
  }, [userId]);

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

  const activeStep = stepContent[flow.currentStep];

  return (
    <FormProvider {...methods}>
      <section className="analysis-wizard" aria-labelledby="analysis-wizard-title">
        <header className="analysis-wizard__header">
          <div>
            <p className="analysis-wizard__eyebrow">Nuevo anÃ¡lisis</p>
            <h1 id="analysis-wizard-title">Construimos la base del flujo guiado</h1>
            <p className="analysis-wizard__description">
              Esta etapa deja preparado el wizard privado dentro del layout autenticado
              de FinanceAI.
            </p>
          </div>
        </header>

        {flow.screen === "wizard" ? (
          <div className="analysis-wizard__shell">
            <AnalysisStepper currentStep={flow.currentStep} onStepClick={goToStep} />

            <Card className="analysis-wizard__panel">
              <div className="analysis-wizard__step-placeholder">
                <span className="analysis-wizard__step-kicker">Paso {flow.currentStep}</span>
                <h2>{activeStep.title}</h2>
                <p>{activeStep.body}</p>
              </div>

              <div className="analysis-wizard__actions">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={previousStep}
                  disabled={flow.currentStep === 1}
                >
                  Volver
                </Button>

                {flow.currentStep < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Continuar
                  </Button>
                ) : (
                  <Button type="button" onClick={startProcessing}>
                    Analizar mis finanzas
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ) : null}

        {flow.screen === "processing" ? (
          <Card className="analysis-wizard__panel">
            <div className="analysis-wizard__step-placeholder">
              <span className="analysis-wizard__step-kicker">Procesando</span>
              <h2>Analizando tus finanzas</h2>
              <p>
                TEMP-FE: esta pantalla representa Ãºnicamente un estado visual base.
                TodavÃ­a no refleja progreso real de Backend ni de Data Science.
              </p>
            </div>

            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={goToReview}>
                Volver a revisiÃ³n
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
              <h2>Resultado disponible prÃ³ximamente</h2>
              <p>
                TODO-BE-CONTRACT: la carga de resultados definitivos dependerÃ¡ del contrato
                final con Backend.
              </p>
            </div>

            <div className="analysis-wizard__actions">
              <Button type="button" variant="ghost" onClick={goToReview}>
                Volver a revisiÃ³n
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
