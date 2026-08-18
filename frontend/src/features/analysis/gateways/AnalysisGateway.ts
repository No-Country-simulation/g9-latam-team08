import type { AnalysisDraft } from "../types/analysis-draft";
import type { FinancialAnalysisResult } from "../types/analysis-result";

// TODO-BE-CONTRACT:
// Adaptar el gateway cuando Backend confirme
// el contrato definitivo del endpoint de análisis.
export interface AnalysisGateway {
  analyze(draft: AnalysisDraft): Promise<FinancialAnalysisResult>;
}
