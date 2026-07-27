import Card from "../../../components/ui/Card";
import "./StepCard.css";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <Card className="step-card">
      <span className="step-card__badge">{step}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}

export default StepCard;
