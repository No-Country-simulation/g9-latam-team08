import Card from "../../../../components/ui/Card";
import { formatCurrency } from "../../../../utils/formatters";

interface IncomeSummaryProps {
  totalIncome: number;
}

function IncomeSummary({ totalIncome }: IncomeSummaryProps) {
  return (
    <Card className="analysis-summary-card">
      <p className="analysis-summary-card__label">INGRESO MENSUAL TOTAL</p>
      <p className="analysis-summary-card__value">{formatCurrency(totalIncome)}</p>
      <p className="analysis-summary-card__description">
        Este sera el ingreso utilizado para el analisis.
      </p>
    </Card>
  );
}

export default IncomeSummary;
