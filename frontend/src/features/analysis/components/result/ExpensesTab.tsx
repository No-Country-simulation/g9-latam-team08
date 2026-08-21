import type { FinancialAnalysisResult } from "../../types/analysis-result";
import InsightsList from "../summary/InsightsList";
import CategoryDistribution from "./CategoryDistribution";
import ClassifiedTransactionsTable from "./ClassifiedTransactionsTable";
import ExpensesMetrics from "./ExpensesMetrics";

interface ExpensesTabProps {
  result: FinancialAnalysisResult;
}

function ExpensesTab({ result }: ExpensesTabProps) {
  return (
    <div className="analysis-result__tab-content">
      <ExpensesMetrics expenses={result.expenses} />
      <CategoryDistribution categories={result.expenses.byCategory} />
      <ClassifiedTransactionsTable transactions={result.expenses.classifiedTransactions} />
      <InsightsList
        title="Insights de gastos"
        description="Observaciones específicas sobre tus consumos clasificados."
        insights={result.expenses.insights}
        emptyMessage="No hay insights de gastos disponibles."
      />
    </div>
  );
}

export default ExpensesTab;
