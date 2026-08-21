import { Info } from "lucide-react";
import Card from "../../../components/ui/Card";
import "./KeyFactorsCard.css";

interface KeyFactorsCardProps {
  factors: string[];
}

function KeyFactorsCard({ factors }: KeyFactorsCardProps) {
  return (
    <Card className="key-factors-card">
      <div className="key-factors-card__header">
        <h3 className="key-factors-card__title">Factores principales</h3>
        <Info size={18} className="key-factors-card__icon" aria-hidden="true" />
      </div>

      <ul className="key-factors-card__list">
        {factors.map((factor) => (
          <li key={factor}>{factor}</li>
        ))}
      </ul>
    </Card>
  );
}

export default KeyFactorsCard;
