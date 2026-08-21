import AnalysisWizard from "../features/analysis/components/shared/AnalysisWizard";
import "./NewAnalysisPage.css";

function NewAnalysisPage() {
  return (
    <main className="new-analysis-page">
      <div className="new-analysis-page__inner">
        <AnalysisWizard />
      </div>
    </main>
  );
}

export default NewAnalysisPage;
