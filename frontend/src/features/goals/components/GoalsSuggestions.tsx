import { ChevronDown } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useState } from "react";
import { formatCurrency } from "../../../utils/formatters";
import type { Goal } from "../types/goal";
import { getActiveGoals, getRemainingAmount } from "../utils/goalCalculations";

import "./GoalsSuggestions.css";

interface SuggestionItem {
  id: string;
  title: string;
  subtitle: string;
  reason: string;
  actions: string[];
  impact: string;
}

interface GoalsSuggestionsProps {
  goals: Goal[];
}

function GoalsSuggestions({ goals }: GoalsSuggestionsProps) {
  const activeGoals = getActiveGoals(goals);
  const priorityGoal =
    activeGoals.find((goal) => goal.priority === "HIGH") ??
    activeGoals[0] ??
    goals.find((goal) => goal.status === "PAUSED");
  const emergencyGoal = goals.find((goal) => goal.category === "EMERGENCY");
  const pausedGoalsCount = goals.filter((goal) => goal.status === "PAUSED").length;
  const suggestionItems: SuggestionItem[] = [
    {
      id: "increase-savings",
      title: "Aumentá tu ahorro mensual",
      subtitle:
        activeGoals.length > 0
          ? `${activeGoals.length} metas activas pueden beneficiarse de aportes más regulares.`
          : "Cuando reactivás una meta, un aporte sostenido ayuda a recuperar ritmo.",
      reason: priorityGoal
        ? `${priorityGoal.name} todavía necesita ${formatCurrency(getRemainingAmount(priorityGoal))} para completarse y mantener un aporte constante puede distribuir mejor el esfuerzo.`
        : "Un ahorro periódico reduce la fricción y hace más previsible el avance de tus objetivos.",
      actions: [
        "Reservá un monto fijo apenas cobrás para darle prioridad a tu meta principal.",
        "Separá parte de ingresos extra para reforzar el objetivo con mayor urgencia.",
        "Revisá una vez por semana tus gastos variables y reasigná pequeños excedentes.",
      ],
      impact:
        "Un ajuste mensual moderado puede acercarte a tus fechas objetivo sin exigir cambios bruscos.",
    },
    {
      id: "review-emergency-fund",
      title: "Revisá tu fondo de emergencia",
      subtitle: emergencyGoal
        ? "Un respaldo sólido ayuda a cuidar el progreso del resto de tus metas."
        : "Contar con una meta de respaldo puede darte más estabilidad ante imprevistos.",
      reason: emergencyGoal
        ? `Tu fondo de emergencia ya acumula ${formatCurrency(emergencyGoal.savedAmount)} y puede seguir creciendo sin frenar otras prioridades.`
        : "Un fondo separado para imprevistos reduce la probabilidad de usar ahorro destinado a objetivos importantes.",
      actions: [
        "Definí un piso inicial que cubra gastos esenciales de corto plazo.",
        "Automatizá aportes pequeños para construir respaldo sin perder flexibilidad.",
        "Revisá el objetivo cada vez que cambien tus gastos fijos o tus ingresos.",
      ],
      impact:
        "Un respaldo mejor definido puede ayudarte a sostener tus metas incluso cuando aparezcan gastos inesperados.",
    },
    {
      id: "small-contributions",
      title: "Pequeños aportes, grandes logros",
      subtitle:
        pausedGoalsCount > 0
          ? `Tenés ${pausedGoalsCount} meta${pausedGoalsCount > 1 ? "s" : ""} en pausa que podés retomar con pasos chicos.`
          : "La constancia suele tener más impacto que los esfuerzos aislados.",
      reason:
        "Convertir el ahorro en hábito hace que incluso metas aspiracionales se sientan más alcanzables en el tiempo.",
      actions: [
        "Programá transferencias semanales para repartir mejor el esfuerzo mensual.",
        "Celebrá hitos intermedios para mantener motivación y visibilidad del avance.",
        "Agrupá redondeos o ingresos ocasionales en una subcuenta dedicada a metas.",
      ],
      impact:
        "Aportes más frecuentes pueden mejorar la sensación de control y sostener tu disciplina financiera.",
    },
  ];
  const [openItemId, setOpenItemId] = useState(suggestionItems[0]?.id ?? "");

  if (goals.length === 0) {
    return (
      <Card className="goals-suggestions-card">
        <div className="goals-sidebar-card__header">
          <h3>Sugerencias para tus metas</h3>
          <p>Cuando sumes tu primera meta, vas a ver recomendaciones orientadas a tu progreso.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="goals-suggestions-card">
      <div className="goals-sidebar-card__header">
        <h3>Sugerencias para tus metas</h3>
        <p>Recomendaciones para ayudarte a mantener un avance estable y alcanzable.</p>
      </div>

      <div className="goals-suggestions-card__accordion">
        {suggestionItems.map((item) => {
          const isOpen = item.id === openItemId;

          return (
            <section key={item.id} className="goals-suggestions-card__item">
              <button
                type="button"
                className="goals-suggestions-card__trigger"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => setOpenItemId(isOpen ? "" : item.id)}
              >
                <span className="goals-suggestions-card__trigger-copy">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`goals-suggestions-card__chevron${
                    isOpen ? " goals-suggestions-card__chevron--open" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen ? (
                <div id={`${item.id}-panel`} className="goals-suggestions-card__panel">
                  <div>
                    <h4>¿Por qué te lo sugerimos?</h4>
                    <p>{item.reason}</p>
                  </div>
                  <div>
                    <h4>Qué podés hacer</h4>
                    <ul>
                      {item.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="goals-suggestions-card__impact">
                    <span>Impacto estimado</span>
                    <strong>{item.impact}</strong>
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </Card>
  );
}

export default GoalsSuggestions;
