import AlertsCard from "../features/dashboard/components/AlertsCard";
import { dashboardMock } from "../features/dashboard/components/dashboardMocks";
import ExpensesByCategoryCard from "../features/dashboard/components/ExpensesByCategoryCard";
import KeyFactorsCard from "../features/dashboard/components/KeyFactorsCard";
import MonthlyEvolutionCard from "../features/dashboard/components/MonthlyEvolutionCard";
import RecommendationsCard from "../features/dashboard/components/RecommendationsCard";
import ScoreCard from "../features/dashboard/components/ScoreCard";
import StatsGrid from "../features/dashboard/components/StatsGrid";
import TransactionsTable from "../features/dashboard/components/TransactionsTable";
import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-page__grid">
      <div className="dashboard-page__main">
        <ScoreCard
          status={dashboardMock.financialProfile}
          score={dashboardMock.score ?? 0}
          monthlyIncome={dashboardMock.indicators.monthlyIncome}
          totalExpenses={dashboardMock.indicators.totalExpenses}
        />

        <StatsGrid indicators={dashboardMock.indicators} />

        <div className="dashboard-page__charts-row">
          <ExpensesByCategoryCard
            categories={dashboardMock.expensesByCategory}
            total={dashboardMock.indicators.totalExpenses}
          />
          <MonthlyEvolutionCard data={dashboardMock.monthlyEvolution} />
        </div>

        <TransactionsTable transactions={dashboardMock.classifiedTransactions} />
      </div>

      <div className="dashboard-page__side">
        <KeyFactorsCard factors={dashboardMock.keyFactors} />
        <RecommendationsCard recommendations={dashboardMock.recommendations} />
        <AlertsCard alerts={dashboardMock.alerts} />
      </div>
    </div>
  );
}

export default DashboardPage;
