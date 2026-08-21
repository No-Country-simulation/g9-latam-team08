export type ResultTab = "summary" | "expenses" | "recommendations";

interface ResultTabsProps {
  activeTab: ResultTab;
  onChange: (tab: ResultTab) => void;
}

const tabs: Array<{ id: ResultTab; label: string }> = [
  { id: "summary", label: "Resumen" },
  { id: "expenses", label: "Gastos" },
  { id: "recommendations", label: "Recomendaciones" },
];

function ResultTabs({ activeTab, onChange }: ResultTabsProps) {
  return (
    <div className="analysis-result__tabs" role="tablist" aria-label="Secciones del resultado">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`analysis-result-tab-${tab.id}`}
          className={`analysis-result__tab${
            activeTab === tab.id ? " analysis-result__tab--active" : ""
          }`}
          aria-selected={activeTab === tab.id}
          aria-controls={`analysis-result-panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ResultTabs;
