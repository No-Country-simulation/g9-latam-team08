import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./env";
import type { AiRecommendation, FinancialIndicators } from "./types";

const FALLBACK_RECOMMENDATIONS: AiRecommendation[] = [
  {
    recomendacion: "Revisar los gastos mensuales",
    razon: "Hubo un error de conexión con el asesor financiero de IA.",
    prioridad: "Alta",
  },
];

function buildPrompt(indicators: FinancialIndicators): string {
  return `
    Actúa como un asesor financiero experto.
    Analiza los siguientes indicadores técnicos financieros de un usuario:
    - Ratio de Endeudamiento (DTI): ${indicators.ratio_endeudamiento_dti}
    - Ratio de Ahorro Neto: ${indicators.ratio_ahorro_neto}
    - Meses de Supervivencia (Fondo de Emergencia): ${indicators.meses_supervivencia}
    - Ratio de Gastos Esenciales: ${indicators.gastos_esenciales_ratio}
    - Ratio de Gastos Estilo de Vida: ${indicators.gastos_estilo_vida_ratio}

    Por favor, dame exactamente 3 recomendaciones para mejorar su salud financiera basándote estrictamente en estos indicadores.

    REGLA ESTRICTA: Tu respuesta debe ser ÚNICAMENTE un arreglo JSON válido. No incluyas texto antes ni después del JSON. No uses bloques de código (\`\`\`).

    El formato exacto debe ser este:
    [
      {
        "recomendacion": "Título corto y accionable",
        "razon": "Explicación de por qué esto le ayuda basándose en sus ratios. (Menciona los porcentajes o meses para dar contexto)",
        "prioridad": "Alta, Media o Baja"
      }
    ]
  `;
}

/**
 * Solicita recomendaciones a Gemini usando únicamente los 5 indicadores financieros.
 */
export async function fetchGeminiRecommendations(
  indicators: FinancialIndicators,
): Promise<AiRecommendation[]> {
  if (!env.geminiApiKey) {
    console.error("VITE_GEMINI_API_KEY no está configurada.");
    return FALLBACK_RECOMMENDATIONS;
  }

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  try {
    const result = await model.generateContent(buildPrompt(indicators));
    const responseText = result.response.text();
    return JSON.parse(responseText) as AiRecommendation[];
  } catch (error) {
    console.error("Error al consultar a Gemini:", error);
    return FALLBACK_RECOMMENDATIONS;
  }
}
