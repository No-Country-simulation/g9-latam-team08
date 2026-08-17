import type { AnalysisWizardStep } from "../../types/analysis-flow";

const steps: Array<{ id: AnalysisWizardStep; label: string }> = [
  { id: 1, label: "Datos financieros" },
  { id: 2, label: "Transacciones" },
  { id: 3, label: "RevisiÃ³n" },
];

interface AnalysisStepperProps {
  currentStep: AnalysisWizardStep;
  onStepClick?: (step: AnalysisWizardStep) => void;
}

function AnalysisStepper({ currentStep, onStepClick }: AnalysisStepperProps) {
  return (
    <ol className="analysis-stepper" aria-label="Progreso de nuevo anÃ¡lisis">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <li
            key={step.id}
            className={`analysis-stepper__item${
              isActive ? " analysis-stepper__item--active" : ""
            }${isCompleted ? " analysis-stepper__item--completed" : ""}`}
          >
            <button
              type="button"
              className="analysis-stepper__button"
              onClick={() => onStepClick?.(step.id)}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="analysis-stepper__index">{step.id}</span>
              <span className="analysis-stepper__label">{step.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default AnalysisStepper;
