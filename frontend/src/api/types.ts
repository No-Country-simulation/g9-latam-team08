export interface FinancialIndicators {
  ratio_endeudamiento_dti: number;
  ratio_ahorro_neto: number;
  meses_supervivencia: number;
  gastos_esenciales_ratio: number;
  gastos_estilo_vida_ratio: number;
}

export type RecommendationPriority = "Alta" | "Media" | "Baja";

export interface AiRecommendation {
  recomendacion: string;
  razon: string;
  prioridad: RecommendationPriority;
}
