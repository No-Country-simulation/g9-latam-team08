import { Landmark, PiggyBank, Pencil, ShieldCheck } from "lucide-react";
import type {
  AnalysisDraftFinancialData,
  AnalysisIncomeDraftItem,
  SavingsFrequency,
} from "../../types/analysis-draft";
import { formatCurrency } from "../../../../utils/formatters";

const incomeTypeLabels = {
  SALARY: "Sueldo",
  FREELANCE: "Trabajo freelance",
  BUSINESS: "Negocio / emprendimiento",
  BENEFIT: "Beneficio / pensión",
  OTHER: "Otro ingreso",
} as const;

const savingsFrequencyLabels: Record<SavingsFrequency, string> = {
  WEEKLY: "Semanal",
  BIWEEKLY: "Quincenal",
  MONTHLY: "Mensual",
  IRREGULAR: "Irregular",
  NONE: "Sin frecuencia definida",
};

const formatOptionalMoney = (value: number | null): string =>
  value === null ? "No informado" : formatCurrency(value);

const formatOptionalText = (value: SavingsFrequency | null): string =>
  value === null ? "No indicado" : savingsFrequencyLabels[value];

interface FinancialReviewProps {
  financialData: AnalysisDraftFinancialData;
  totalIncome: number;
  onEdit: () => void;
}

function FinancialReview({
  financialData,
  totalIncome,
  onEdit,
}: FinancialReviewProps) {
  return (
    <section className="analysis-card review-card">
      <div className="review-card__header">
        <div className="review-card__header-copy">
          <h3>Datos financieros</h3>
          <p>Revisá tus ingresos y la información complementaria cargada.</p>
        </div>
        <button
          type="button"
          className="review-card__edit-button"
          onClick={onEdit}
          aria-label="Editar datos financieros"
        >
          <Pencil size={16} aria-hidden="true" />
          Editar
        </button>
      </div>

      <div className="review-card__section">
        <div className="review-card__section-heading">
          <p className="review-card__eyebrow">INGRESOS</p>
          <p className="review-card__support">
            {financialData.incomes.length > 0
              ? `${financialData.incomes.length} fuente${financialData.incomes.length === 1 ? "" : "s"}`
              : "Todavía no cargaste ingresos."}
          </p>
        </div>

        {financialData.incomes.length > 0 ? (
          <ul className="review-income-list">
            {financialData.incomes.map((income: AnalysisIncomeDraftItem) => (
              <li key={income.id} className="review-income-list__item">
                <div>
                  <p className="review-income-list__title">{income.description}</p>
                  <p className="review-income-list__meta">{incomeTypeLabels[income.incomeType]}</p>
                </div>
                <strong className="review-income-list__amount">
                  {formatCurrency(income.monthlyAmount)}
                </strong>
              </li>
            ))}
          </ul>
        ) : (
          <div className="analysis-empty-state">
            <p>Todavía no cargaste ingresos.</p>
          </div>
        )}

        <div className="review-highlight">
          <p className="analysis-summary-card__label">TOTAL DE INGRESOS</p>
          <p className="analysis-summary-card__value review-highlight__value">
            {formatCurrency(totalIncome)}
          </p>
        </div>
      </div>

      <div className="review-card__section">
        <div className="review-card__section-heading">
          <p className="review-card__eyebrow">INFORMACIÓN COMPLEMENTARIA</p>
        </div>

        <dl className="review-key-values">
          <div className="review-key-values__item">
            <dt><PiggyBank size={15} aria-hidden="true" /> Ahorro mensual estimado</dt>
            <dd>{formatOptionalMoney(financialData.estimatedMonthlySavings)}</dd>
          </div>
          <div className="review-key-values__item">
            <dt><Landmark size={15} aria-hidden="true" /> Pagos mensuales de deuda</dt>
            <dd>{formatOptionalMoney(financialData.monthlyDebtPayments)}</dd>
          </div>
          <div className="review-key-values__item">
            <dt><ShieldCheck size={15} aria-hidden="true" /> Fondo de emergencia disponible</dt>
            <dd>{formatOptionalMoney(financialData.emergencyFundAmount)}</dd>
          </div>
          <div className="review-key-values__item">
            <dt>Frecuencia de ahorro</dt>
            <dd>{formatOptionalText(financialData.savingsFrequency)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default FinancialReview;
