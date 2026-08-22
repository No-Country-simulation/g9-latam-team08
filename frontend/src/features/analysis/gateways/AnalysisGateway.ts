import type { AnalysisDraft } from "../types/analysis-draft";
import type { FinancialAnalysisResult } from "../types/analysis-result";
import { env } from "../../../api/env";

export interface AnalysisGateway {
  analyze(draft: AnalysisDraft): Promise<FinancialAnalysisResult>;
}

const ANALYSIS_ENDPOINT =
  `${env.apiBaseUrl}/api/usuarios/analisis`;

const buildBackendPayload = (draft: AnalysisDraft): AnalysisDraft => ({
  ...draft,
  financialData: {
    ...draft.financialData,
    estimatedMonthlySavings: draft.financialData.estimatedMonthlySavings ?? 0,
    monthlyDebtPayments: draft.financialData.monthlyDebtPayments ?? 0,
    emergencyFundAmount: draft.financialData.emergencyFundAmount ?? 0,
  },
});

export class HttpAnalysisGateway implements AnalysisGateway {
  async analyze(draft: AnalysisDraft): Promise<FinancialAnalysisResult> {
    const token = localStorage.getItem("jwt_token");

    const response = await fetch(ANALYSIS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(buildBackendPayload(draft)),
    });

    if (!response.ok) {
      throw new Error(`Error del endpoint de análisis: ${response.status}`);
    }

    return (await response.json()) as FinancialAnalysisResult;
  }
}
