import { ArrowLeft, BadgeCheck, Download, Save } from "lucide-react";
import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../types/analysis-result";
import ExpensesTab from "./expenses/ExpensesTab";
import RecommendationsTab from "./recommendations/RecommendationsTab";
import ResultTabs, { type ResultTab } from "./ResultTabs";
import SummaryTab from "./summary/SummaryTab";
import { formatAnalyzedPeriod } from "./resultFormatters";
import "./AnalysisResultView.css";

interface AnalysisResultViewProps {
  result: FinancialAnalysisResult;
  onNewAnalysis: () => void;
  onBackToReview: () => void;
}

function AnalysisResultView({
  result,
  onNewAnalysis,
  onBackToReview,
}: AnalysisResultViewProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>("summary");

  return (
    <div className="analysis-result">
      <Card className="analysis-result__hero">
        <div className="analysis-result__hero-main">
          <div className="analysis-result__hero-copy">
            <span className="analysis-result__eyebrow">Resultado</span>
            <h2>Tu análisis está listo</h2>
            <p>Revisá tus indicadores, gastos y recomendaciones.</p>
          </div>

          <div className="analysis-result__hero-meta">
            <span className="analysis-result__meta-label">Período analizado</span>
            <strong>{formatAnalyzedPeriod(result.analyzedPeriod)}</strong>
          </div>
        </div>

        <ResultTabs activeTab={activeTab} onChange={setActiveTab} />
      </Card>

      <div
        id={`analysis-result-panel-${activeTab}`}
        className="analysis-result__panel"
        role="tabpanel"
        aria-labelledby={`analysis-result-tab-${activeTab}`}
      >
        {activeTab === "summary" ? (
          <SummaryTab
            result={result}
            onViewRecommendations={() => setActiveTab("recommendations")}
          />
        ) : null}
        {activeTab === "expenses" ? <ExpensesTab result={result} /> : null}
        {activeTab === "recommendations" ? (
          <RecommendationsTab result={result} />
        ) : null}
      </div>

      <Card className="analysis-result__footer">
        <div className="analysis-result__footer-actions">
          <div className="analysis-result__footer-actions-group">
            {/* TODO-BE-CONTRACT: Guardar informe cuando exista persistencia definitiva. */}
            <Button type="button" variant="ghost" disabled>
              <Save size={16} aria-hidden="true" />
              Guardar informe
            </Button>
            {/* TODO-PDF: Conectar descarga cuando exista renderer del informe. */}
            <Button type="button" variant="ghost" disabled>
              <Download size={16} aria-hidden="true" />
              Descargar informe
            </Button>
          </div>

          <div className="analysis-result__footer-actions-group">
            <Button type="button" variant="secondary" onClick={onBackToReview}>
              <ArrowLeft size={16} aria-hidden="true" />
              Volver a revisión
            </Button>
            <Button type="button" onClick={onNewAnalysis}>
              <BadgeCheck size={16} aria-hidden="true" />
              Nuevo análisis
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AnalysisResultView;
