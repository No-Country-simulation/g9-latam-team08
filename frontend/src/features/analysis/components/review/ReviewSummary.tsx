import Card from "../../../../components/ui/Card";

interface ReviewSummaryProps {
  totalIncome: number;
  transactionCount: number;
  totalTransactionsAmount: number;
  periodLabel: string;
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

function ReviewSummary({
  totalIncome,
  transactionCount,
  totalTransactionsAmount,
  periodLabel,
}: ReviewSummaryProps) {
  return (
    <Card className="analysis-summary-card review-summary-card">
      <div className="review-summary-card__item">
        <p className="analysis-summary-card__label">INGRESO MENSUAL TOTAL</p>
        <p className="analysis-summary-card__description">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="review-summary-card__item">
        <p className="analysis-summary-card__label">TRANSACCIONES CARGADAS</p>
        <p className="analysis-summary-card__description">
          {transactionCount} transacción{transactionCount === 1 ? "" : "es"}
        </p>
      </div>
      <div className="review-summary-card__item">
        <p className="analysis-summary-card__label">TOTAL CARGADO</p>
        <p className="analysis-summary-card__description">
          {formatCurrency(totalTransactionsAmount)}
        </p>
      </div>
      <div className="review-summary-card__item">
        <p className="analysis-summary-card__label">PERÍODO ANALIZADO</p>
        <p className="analysis-summary-card__description">{periodLabel}</p>
      </div>
    </Card>
  );
}

export default ReviewSummary;
