import { Flag, Plus } from "lucide-react";
import Button from "../../../components/ui/Button";

import "./GoalsEmptyState.css";

interface GoalsEmptyStateProps {
  onCreate: () => void;
}

function GoalsEmptyState({ onCreate }: GoalsEmptyStateProps) {
  return (
    <section className="goals-empty-state">
      <div className="goals-empty-state__icon">
        <Flag size={22} aria-hidden="true" />
      </div>
      <div className="goals-empty-state__copy">
        <h3>Todavía no tenés metas</h3>
        <p>Creá tu primer objetivo financiero y empezá a seguir tu progreso.</p>
      </div>
      <Button onClick={onCreate}>
        <Plus size={18} aria-hidden="true" />
        Crear mi primera meta
      </Button>
    </section>
  );
}

export default GoalsEmptyState;
