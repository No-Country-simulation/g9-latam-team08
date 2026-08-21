import type { AnalysisDraft } from "../types/analysis-draft";
import type { FinancialAnalysisResult } from "../types/analysis-result";
import type { AnalysisGateway } from "./AnalysisGateway";
import { buildMockAnalysisResult } from "../mocks/mockAnalysisResult";
import { createTransaction } from "../../../api/transactions";
import { authenticatedFetch, getStoredUserId } from "../../../api/auth";
import { env } from "../../../api/env";

/**
 * Gateway real que:
 * 1. Envía las transacciones al backend (las persiste en BD)
 * 2. Actualiza datos financieros del usuario
 * 3. Obtiene el perfil real del backend (ML) para el resultado
 */
export class RealAnalysisGateway implements AnalysisGateway {
  async analyze(draft: AnalysisDraft): Promise<FinancialAnalysisResult> {
    const userId = getStoredUserId();

    if (userId) {
      // 1. Actualizar datos financieros del usuario
      const totalIncome = draft.financialData.incomes.reduce(
        (sum, inc) => sum + inc.monthlyAmount, 0
      );
      const params = new URLSearchParams();
      if (totalIncome > 0) params.set("ingresoMensual", String(totalIncome));
      if (draft.financialData.monthlyDebtPayments != null) {
        params.set("cuotasMensualesDeuda", String(draft.financialData.monthlyDebtPayments));
      }
      if (draft.financialData.emergencyFundAmount != null) {
        params.set("ahorroPrevio", String(draft.financialData.emergencyFundAmount));
      }

      try {
        await authenticatedFetch(`${env.apiBaseUrl}/users/${userId}/financial?${params.toString()}`, {
          method: "PUT",
        });
      } catch (e) {
        console.warn("[Analysis] No se pudo actualizar datos financieros:", e);
      }

      // 2. Enviar transacciones al backend
      for (const transaction of draft.transactions) {
        try {
          await createTransaction({
            nombre_tienda: transaction.description,
            monto: transaction.amount,
            categoria_principal: transaction.categoryLabel || "Otras",
            fecha: `${transaction.date}T00:00:00`,
            type: transaction.movementType === "INCOME" ? "INCOME" : "EXPENSE",
            metodo_pago: transaction.paymentMethod?.toLowerCase(),
            esencial: undefined,
          });
        } catch (e) {
          console.warn("[Analysis] Error al enviar transacción:", transaction.description, e);
        }
      }

      // 3. Obtener el dashboard real del backend (con ML)
      try {
        const dashResponse = await authenticatedFetch(`${env.apiBaseUrl}/dashboard/${userId}`);
        if (dashResponse.ok) {
          const dashData = await dashResponse.json();
          const metrics = dashData.metrics ?? {};

          // Construir resultado usando datos reales del backend
          const mockResult = buildMockAnalysisResult(draft);

          // Sobrescribir el perfil con el real del ML
          const perfilRaw = (metrics.perfil_financiero ?? "").toLowerCase();
          let realProfile: "HEALTHY" | "OBSERVATION" | "RISK" = "OBSERVATION";
          if (perfilRaw.includes("saludable")) realProfile = "HEALTHY";
          else if (perfilRaw.includes("riesgo")) realProfile = "RISK";

          mockResult.summary.financialProfile = realProfile;
          mockResult.summary.debtLevel = (metrics.ratio_endeudamiento_dti ?? 0) * 100;
          mockResult.summary.monthlyMargin = metrics.ahorro_mensual ?? null;
          mockResult.summary.emergencyCoverageMonths = metrics.meses_supervivencia ?? null;

          return mockResult;
        }
      } catch (e) {
        console.warn("[Analysis] No se pudo obtener dashboard real:", e);
      }
    }

    // Fallback: resultado local
    return buildMockAnalysisResult(draft);
  }
}
