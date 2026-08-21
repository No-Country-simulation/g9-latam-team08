import { ArrowLeft, BadgeCheck, Download, Save } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import type { FinancialAnalysisResult } from "../../types/analysis-result";
import ExpensesTab from "./ExpensesTab";
import RecommendationsTab from "./RecommendationsTab";
import ResultTabs, { type ResultTab } from "./ResultTabs";
import SummaryTab from "../summary/SummaryTab";
import { formatAnalyzedPeriod, formatCurrency, getProfileLabel } from "../resultFormatters";
import "../AnalysisResult.css";

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

  const generatePDF = () => {
    const doc = new jsPDF();
    const userName = localStorage.getItem("userName") || "Usuario";

    // Título
    doc.setFontSize(18);
    doc.text("FinanceAI - Informe Financiero", 14, 20);

    doc.setFontSize(11);
    doc.text(`Usuario: ${userName}`, 14, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-AR")}`, 14, 37);
    doc.text(`Período: ${formatAnalyzedPeriod(result.analyzedPeriod)}`, 14, 44);
    doc.text(`Perfil: ${getProfileLabel(result.summary.financialProfile)}`, 14, 51);

    // Métricas
    doc.setFontSize(14);
    doc.text("Resumen", 14, 64);
    doc.setFontSize(10);
    doc.text(`Total gastos: ${formatCurrency(result.expenses.totalExpenses)}`, 14, 72);
    doc.text(`Transacciones: ${result.expenses.transactionsCount}`, 14, 79);
    if (result.summary.monthlyMargin != null) {
      doc.text(`Margen mensual: ${formatCurrency(result.summary.monthlyMargin)}`, 14, 86);
    }

    // Tabla de categorías
    if (result.expenses.byCategory.length > 0) {
      doc.setFontSize(14);
      doc.text("Gastos por categoría", 14, 100);

      autoTable(doc, {
        startY: 105,
        head: [["Categoría", "Monto", "%", "Transacciones"]],
        body: result.expenses.byCategory.map((cat) => [
          cat.category,
          formatCurrency(cat.amount),
          `${cat.percentage}%`,
          String(cat.transactionsCount),
        ]),
      });
    }

    // Recomendaciones
    const finalY = (doc as any).lastAutoTable?.finalY ?? 140;
    if (result.recommendations.length > 0) {
      doc.setFontSize(14);
      doc.text("Recomendaciones", 14, finalY + 15);

      autoTable(doc, {
        startY: finalY + 20,
        head: [["Prioridad", "Título", "Resumen"]],
        body: result.recommendations.map((rec) => [
          rec.priority,
          rec.title,
          rec.summary,
        ]),
      });
    }

    return doc;
  };

  const handleDownloadPDF = () => {
    const doc = generatePDF();
    doc.save(`FinanceAI_Informe_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleSaveReport = () => {
    // Guardar en localStorage como historial de informes
    const reports = JSON.parse(localStorage.getItem("financeai_reports") || "[]");
    reports.push({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      profile: result.summary.financialProfile,
      totalExpenses: result.expenses.totalExpenses,
      transactionsCount: result.expenses.transactionsCount,
      recommendationsCount: result.recommendations.length,
    });
    localStorage.setItem("financeai_reports", JSON.stringify(reports));
    alert("Informe guardado correctamente.");
  };

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
            <Button type="button" variant="ghost" onClick={handleSaveReport}>
              <Save size={16} aria-hidden="true" />
              Guardar informe
            </Button>
            <Button type="button" variant="ghost" onClick={handleDownloadPDF}>
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
