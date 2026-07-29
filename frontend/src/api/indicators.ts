import { env } from "./env";
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
 * Si el servidor no responde, devuelve datos mock de respaldo.
 */
export async function fetchFinancialIndicators(
  userId = "123",
): Promise<FinancialIndicators> {
  const url = `${env.apiBaseUrl}/api/indicadores/${userId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error del servidor Java: ${response.status}`);
    }

    const indicators = (await response.json()) as FinancialIndicators;
    console.info("Datos recibidos exitosamente desde Java");
    return indicators;
  } catch (error) {
    console.warn(
      "No se pudo conectar a Java. Usando datos de respaldo (Mock).",
      error,
    );
    return MOCK_INDICATORS;
  }
}
