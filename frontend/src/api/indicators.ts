import { env } from "./env";
import { authenticatedFetch } from "./auth";
import type { FinancialIndicators } from "./types";

const MOCK_INDICATORS: FinancialIndicators = {
  ratio_endeudamiento_dti: 0.45,
  ratio_ahorro_neto: 0.05,
  meses_supervivencia: 1.2,
  gastos_esenciales_ratio: 0.5,
  gastos_estilo_vida_ratio: 0.45,
};

/**
 * Obtiene los 5 indicadores financieros desde el backend Java.
 * Los extrae del endpoint de dashboard (campo metrics).
 * Si el servidor no responde, devuelve datos mock de respaldo.
 */
export async function fetchFinancialIndicators(
  userId = "1",
): Promise<FinancialIndicators> {
  const url = `${env.apiBaseUrl}/dashboard/${userId}`;

  try {
    const response = await authenticatedFetch(url);

    if (!response.ok) {
      throw new Error(`Error del servidor Java: ${response.status}`);
    }

    const dashboard = await response.json();
    const metrics = dashboard.metrics ?? {};

    const indicators: FinancialIndicators = {
      ratio_endeudamiento_dti: metrics.ratio_endeudamiento_dti ?? 0,
      ratio_ahorro_neto: metrics.ratio_ahorro_neto ?? 0,
      meses_supervivencia: metrics.meses_supervivencia ?? 0,
      gastos_esenciales_ratio: metrics.gastos_esenciales_ratio ?? 0,
      gastos_estilo_vida_ratio: metrics.gastos_estilo_vida_ratio ?? 0,
    };

    console.info("Indicadores recibidos exitosamente desde Java");
    return indicators;
  } catch (error) {
    console.warn(
      "No se pudo conectar a Java. Usando datos de respaldo (Mock).",
      error,
    );
    return MOCK_INDICATORS;
  }
}
