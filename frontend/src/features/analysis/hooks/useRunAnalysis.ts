import { useCallback, useRef, useState } from "react";
import type { AnalysisDraft } from "../types/analysis-draft";
import type { FinancialAnalysisResult } from "../types/analysis-result";
import type { AnalysisGateway } from "../gateways/AnalysisGateway";

interface UseRunAnalysisOptions {
  gateway: AnalysisGateway;
}

export function useRunAnalysis({ gateway }: UseRunAnalysisOptions) {
  const [analysisResult, setAnalysisResult] = useState<FinancialAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isAnalyzingRef = useRef(false);

  const runAnalysis = useCallback(
    async (draft: AnalysisDraft): Promise<FinancialAnalysisResult | null> => {
      if (isAnalyzingRef.current) {
        return null;
      }

      isAnalyzingRef.current = true;
      setIsAnalyzing(true);
      setAnalysisError(null);

      try {
        const result = await gateway.analyze(draft);
        setAnalysisResult(result);
        return result;
      } catch (error) {
        setAnalysisError("No pudimos completar el análisis.");
        return null;
      } finally {
        isAnalyzingRef.current = false;
        setIsAnalyzing(false);
      }
    },
    [gateway],
  );

  const resetAnalysisState = useCallback(() => {
    isAnalyzingRef.current = false;
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsAnalyzing(false);
  }, []);

  return {
    analysisResult,
    analysisError,
    isAnalyzing,
    runAnalysis,
    resetAnalysisState,
  };
}
