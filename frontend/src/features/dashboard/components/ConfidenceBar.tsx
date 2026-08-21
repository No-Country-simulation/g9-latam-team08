import "./ConfidenceBar.css";

interface ConfidenceBarProps {
  value: number;
}

function ConfidenceBar({ value }: ConfidenceBarProps) {
  const percent = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <span className="confidence-bar" role="img" aria-label={`Confianza ${Math.round(percent)}%`}>
      <span className="confidence-bar__fill" style={{ width: `${percent}%` }} />
    </span>
  );
}

export default ConfidenceBar;
