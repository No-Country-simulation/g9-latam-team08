export type AnalysisWizardStep = 1 | 2 | 3;

export type AnalysisFlowScreen = "wizard" | "processing" | "result";

export interface AnalysisFlowState {
  currentStep: AnalysisWizardStep;
  returnToReviewAfterEdit: boolean;
  screen: AnalysisFlowScreen;
}
