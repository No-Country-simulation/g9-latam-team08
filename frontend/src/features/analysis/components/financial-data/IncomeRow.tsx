import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "../../../../utils/formatters";
import type { AnalysisIncomeDraftItem } from "../../types/analysis-draft";

const incomeTypeLabels = {
  SALARY: "Sueldo",
  FREELANCE: "Trabajo freelance",
  BUSINESS: "Negocio / emprendimiento",
  BENEFIT: "Beneficio / pension",
  OTHER: "Otro ingreso",
} as const;

interface IncomeRowProps {
  income: AnalysisIncomeDraftItem;
  onEdit: (income: AnalysisIncomeDraftItem) => void;
  onRemove: (income: AnalysisIncomeDraftItem) => void;
}

function IncomeRow({ income, onEdit, onRemove }: IncomeRowProps) {
  return (
    <li className="income-row">
      <div className="income-row__content">
        <div>
          <p className="income-row__title">{income.description}</p>
          <p className="income-row__meta">{incomeTypeLabels[income.incomeType]}</p>
        </div>

        <strong className="income-row__amount">{formatCurrency(income.monthlyAmount)}</strong>
      </div>

      <div className="income-row__actions">
        <button
          type="button"
          className="income-row__icon-button"
          onClick={() => onEdit(income)}
          aria-label={`Editar ingreso ${income.description}`}
        >
          <Pencil size={16} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="income-row__icon-button income-row__icon-button--danger"
          onClick={() => onRemove(income)}
          aria-label={`Eliminar ingreso ${income.description}`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export default IncomeRow;
