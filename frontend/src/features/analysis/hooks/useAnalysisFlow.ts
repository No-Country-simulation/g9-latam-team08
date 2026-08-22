import { useState } from "react";
import type {
  AnalysisFlowState,
  AnalysisWizardStep,
} from "../types/analysis-flow";

const createInitialFlowState = (): AnalysisFlowState => ({
  currentStep: 1,
  returnToReviewAfterEdit: false,
  screen: "wizard",
});

const normalizeStep = (step: number): AnalysisWizardStep => {
  if (step <= 1) {
    return 1;
  }

  if (step >= 3) {
    return 3;
  }

  return 2;
};

export function useAnalysisFlow(initialStep: AnalysisWizardStep = 1) {
  const [flow, setFlow] = useState<AnalysisFlowState>({
    ...createInitialFlowState(),
    currentStep: normalizeStep(initialStep),
  });

  const nextStep = () => {
    setFlow((current) => ({
      ...current,
      currentStep: normalizeStep(current.currentStep + 1),
      screen: "wizard",
    }));
  };

  const previousStep = () => {
    setFlow((current) => ({
      ...current,
      currentStep: normalizeStep(current.currentStep - 1),
      screen: "wizard",
    }));
  };

  const goToStep = (
    step: AnalysisWizardStep,
    options?: { returnToReviewAfterEdit?: boolean },
  ) => {
    setFlow((current) => ({
      ...current,
      currentStep: normalizeStep(step),
      returnToReviewAfterEdit: options?.returnToReviewAfterEdit ?? current.returnToReviewAfterEdit,
      screen: "wizard",
    }));
  };

  const goToReview = () => {
    setFlow((current) => ({
      ...current,
      currentStep: 3,
      returnToReviewAfterEdit: false,
      screen: "wizard",
    }));
  };

  const editStepFromReview = (step: 1 | 2) => {
    setFlow((current) => ({
      ...current,
      currentStep: normalizeStep(step),
      returnToReviewAfterEdit: true,
      screen: "wizard",
    }));
  };

  const finishReviewEdit = () => {
    setFlow((current) => ({
      ...current,
      currentStep: 3,
      returnToReviewAfterEdit: false,
      screen: "wizard",
    }));
  };

  const startProcessing = () => {
    setFlow((current) => ({
      ...current,
      screen: "processing",
    }));
  };

  const showResult = () => {
    setFlow((current) => ({
      ...current,
      screen: "result",
      returnToReviewAfterEdit: false,
    }));
  };

  const resetFlow = () => {
    setFlow(createInitialFlowState());
  };

  return {
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
  };
}
