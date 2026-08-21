import { Target } from "lucide-react";
import Button from "../../../components/ui/Button";

interface GoalsEmptyStateProps {
  onCreate: () => void;
}

function GoalsEmptyState({ onCreate }: GoalsEmptyStateProps) {
  return (
    <section className="goals-empty-state">
      <div className="goals-empty-state__icon">
        <Target size={32} aria-hidden="true" />
      </div>
      <h3>Todavía no tenés metas</h3>
      <p>
        Creá tu primera meta financiera para empezar a hacer seguimiento de tu
        progreso de ahorro.
      </p>
      <Button onClick={onCreate}>Crear mi primera meta</Button>
    </section>
  );
}

export default GoalsEmptyState;
