import type { AnalysisDraft } from "../types/analysis-draft";
import type { FinancialAnalysisResult } from "../types/analysis-result";
import type { AnalysisGateway } from "./AnalysisGateway";
import { buildMockAnalysisResult } from "../mocks/mockAnalysisResult";

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
};

export class MockAnalysisGateway implements AnalysisGateway {
  async analyze(draft: AnalysisDraft): Promise<FinancialAnalysisResult> {
    await delay(500 + Math.floor(Math.random() * 701));
    return buildMockAnalysisResult(draft);
  }
}
