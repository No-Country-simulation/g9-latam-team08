import { env } from "./env";
import { dashboardMock, type DashboardData } from "../features/dashboard/components/dashboardMocks";
import type { FinancialStatus } from "../types/financial-analysis";
import { authenticatedFetch } from "./auth";

interface DashboardMetricsDTO {
  ingreso_mensual_fijo?: number;
  ingreso_mensual_variable?: number;
  ingreso_mensual?: number;
  gastos_esenciales_mensuales?: number;
  gastos_no_esenciales_mensuales?: number;
  gastos_totales_del_mes?: number;
  cuotas_mensuales_deuda?: number;
  modalidad_pago_tarjeta?: string;
  ahorro_mensual?: number;
  ahorro_previo?: number;
  ahorro_total?: number;
  ratio_ahorro_neto?: number;
  ratio_endeudamiento_dti?: number;
  gastos_esenciales_ratio?: number;
  gastos_estilo_vida_ratio?: number;
  meses_supervivencia?: number;
  frecuencia_transacciones_ocio?: number;
  perfil_financiero?: string;
}

interface ExpenseByCategoryDTO {
  categoria_principal?: string;
  monto?: number;
  porcentaje?: number;
}

interface MonthlyEvolutionDTO {
  month?: string;
  ingresos?: number;
  gastos?: number;
}

interface TransactionDTO {
  id?: number | string;
  nombre_tienda?: string;
  subcategoria?: string;
  monto?: number;
  metodo_pago?: string;
  esencial?: boolean;
  categoria_principal?: string;
  confidence?: number;
  fecha?: string;
  type?: string;
}

interface AlertDTO {
  id?: number | string;
  title?: string;
  message?: string;
  type?: string;
}

interface RecommendationDTO {
  id?: number | string;
  title?: string;
  description?: string;
  priority?: string;
}

interface DashboardDTO {
  metrics?: DashboardMetricsDTO;
  expensesByCategory?: ExpenseByCategoryDTO[];
  monthlyEvolution?: MonthlyEvolutionDTO[];
  recentTransactions?: TransactionDTO[];
  alerts?: AlertDTO[];
  recommendations?: RecommendationDTO[];
}

function mapPerfilToStatus(perfil?: string): FinancialStatus {
  if (perfil == null) {
    return "OBSERVATION";
  }

  const perfilLower = perfil.toLowerCase();
  if (perfilLower.includes("saludable")) {
    return "HEALTHY";
  }
  if (perfilLower.includes("riesgo")) {
    return "RISK";
  }
  return "OBSERVATION";
}

function mapPerfilToScore(metrics: DashboardMetricsDTO): number {
  let score = 50;

  const ratioAhorro = metrics.ratio_ahorro_neto ?? 0;
  const ratioDti = metrics.ratio_endeudamiento_dti ?? 0;
  const mesesSup = metrics.meses_supervivencia ?? 0;

  if (ratioAhorro >= 0.20) score += 20;
  else if (ratioAhorro >= 0.10) score += 10;
  else if (ratioAhorro < 0) score -= 15;

  if (ratioDti <= 0.20) score += 15;
  else if (ratioDti > 0.37) score -= 20;

  if (mesesSup >= 3) score += 15;
  else if (mesesSup >= 1) score += 5;
  else score -= 10;

  return Math.max(0, Math.min(100, score));
}

function normalizeConfidence(confidence?: number): number | undefined {
  if (confidence == null) {
    return undefined;
  }

  if (confidence > 1) {
    return Math.min(Math.max(confidence / 100, 0), 1);
  }

  return Math.min(Math.max(confidence, 0), 1);
}

function getAlertSeverity(alertType?: string) {
  switch (alertType?.toUpperCase()) {
    case "CRITICAL":
      return "CRITICAL";
    case "WARNING":
      return "WARNING";
    default:
      return "INFO";
  }
}

function mapDashboard(dto: DashboardDTO): DashboardData {
  const metrics = dto.metrics ?? {};
  const ingreso_mensual = metrics.ingreso_mensual ?? 0;
  const gastos_totales_del_mes = metrics.gastos_totales_del_mes ?? 0;
  const gastos_esenciales_ratio = metrics.gastos_esenciales_ratio ?? 0;
  const gastos_estilo_vida_ratio = metrics.gastos_estilo_vida_ratio ?? 0;
  const score = mapPerfilToScore(metrics);

  const indicators = {
    monthlyIncome: ingreso_mensual,
    totalExpenses: gastos_totales_del_mes,
    estimatedBalance: metrics.ahorro_mensual ?? 0,
    monthlySavings: Math.max(metrics.ahorro_mensual ?? 0, 0),
    debtRatio: metrics.ratio_endeudamiento_dti ?? 0,
    emergencyFundMonths: metrics.meses_supervivencia ?? 0,
  };

  return {
    financialProfile: mapPerfilToStatus(metrics.perfil_financiero),
    score,
    lastAnalysisDate: new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    indicators,
    expensesByCategory:
      dto.expensesByCategory?.map((item) => ({
        category: item.categoria_principal ?? "Otros",
        amount: item.monto ?? 0,
        percentage: item.porcentaje != null ? (item.porcentaje > 1 ? item.porcentaje / 100 : item.porcentaje) : 0,
      })) ?? [],
    monthlyEvolution:
      dto.monthlyEvolution?.map((item) => ({
        month: item.month ?? "",
        income: item.ingresos ?? 0,
        expenses: item.gastos ?? 0,
      })) ?? [],
    classifiedTransactions:
      dto.recentTransactions?.map((transaction) => ({
        id: String(transaction.id ?? ""),
        description: transaction.nombre_tienda ?? "",
        amount: transaction.monto ?? 0,
        mainCategory: transaction.categoria_principal ?? "Otros",
        confidence: normalizeConfidence(transaction.confidence),
      })) ?? [],
    recommendations:
      dto.recommendations?.map((recommendation) => ({
        id: String(recommendation.id ?? ""),
        priority: (recommendation.priority as "LOW" | "MEDIUM" | "HIGH") ?? "LOW",
        message: recommendation.description ?? recommendation.title ?? "",
      })) ?? [],
    alerts:
      dto.alerts?.map((alert) => ({
        id: String(alert.id ?? ""),
        severity: getAlertSeverity(alert.type),
        message: alert.title ? `${alert.title}: ${alert.message ?? ""}` : alert.message ?? "",
      })) ?? [],
    keyFactors: [
      `Tus gastos esenciales representan el ${Math.round(gastos_esenciales_ratio * 100)}% de tus ingresos`,
      `Tu ratio de endeudamiento (DTI) es de ${Math.round((metrics.ratio_endeudamiento_dti ?? 0) * 100)}%`,
      `Tus meses de supervivencia: ${(metrics.meses_supervivencia ?? 0).toLocaleString("es-AR", {
        maximumFractionDigits: 1,
      })}`,
      `Gastos estilo de vida: ${Math.round(gastos_estilo_vida_ratio * 100)}% de tus ingresos`,
    ],
  };
}

export async function fetchDashboardData(userId = "1"): Promise<DashboardData> {
  const url = `${env.apiBaseUrl}/dashboard/${userId}`;
  console.info(`[Dashboard] Fetching: ${url}`);

  try {
    const response = await authenticatedFetch(url);

    if (!response.ok) {
      const body = await response.text();
      console.error(`[Dashboard] Error del backend: ${response.status} ${response.statusText}`, body);
      throw new Error(`Error del backend: ${response.status}`);
    }

    const dto = (await response.json()) as DashboardDTO;
    console.info("[Dashboard] Datos cargados desde el backend correctamente:", dto);
    return mapDashboard(dto);
  } catch (error) {
    console.error("[Dashboard] No se pudo cargar el dashboard desde el backend. Usando datos mock.", error);
    return dashboardMock;
  }
}
