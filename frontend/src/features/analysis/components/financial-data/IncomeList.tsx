import type { AnalysisIncomeDraftItem } from "../../types/analysis-draft";
import IncomeRow from "./IncomeRow";

interface IncomeListProps {
  incomes: AnalysisIncomeDraftItem[];
  error?: string;
  onEdit: (income: AnalysisIncomeDraftItem) => void;
  onRemove: (income: AnalysisIncomeDraftItem) => void;
}

function IncomeList({ incomes, error, onEdit, onRemove }: IncomeListProps) {
  return (
    <>
      {incomes.length === 0 ? (
        <div className="analysis-empty-state">
          <p>Todavia no cargaste ingresos.</p>
        </div>
      ) : (
        <ul className="income-list">
          {incomes.map((income) => (
            <IncomeRow
              key={income.id}
              income={income}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      {error ? (
        <p className="analysis-form-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

export default IncomeList;
