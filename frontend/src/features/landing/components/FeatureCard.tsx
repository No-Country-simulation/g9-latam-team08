import type { LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";
import "./FeatureCard.css";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="feature-card">
      <span className="feature-card__icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}

export default FeatureCard;
