export { env } from "./env";
export { fetchFinancialIndicators } from "./indicators";
export { fetchGeminiRecommendations } from "./recommendations";
export type {
  AiRecommendation,
  FinancialIndicators,
  RecommendationPriority,
} from "./types";

import { fetchFinancialIndicators } from "./indicators";
import { fetchGeminiRecommendations } from "./recommendations";
import type { AiRecommendation } from "./types";

/**
 * Flujo completo: obtiene indicadores del backend Java y luego
 * solicita recomendaciones personalizadas a Gemini.
 */
export async function getAiRecommendations(
  userId = "123",
): Promise<AiRecommendation[]> {
  const indicators = await fetchFinancialIndicators(userId);
  return fetchGeminiRecommendations(indicators);
}
