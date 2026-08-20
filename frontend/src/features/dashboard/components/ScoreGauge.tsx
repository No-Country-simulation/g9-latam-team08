import "./ScoreGauge.css";

interface ScoreGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

function ScoreGauge({
  value,
  max = 100,
  size = 176,
  strokeWidth = 14,
  color = "var(--color-warning)",
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference * (1 - progress);
  const center = size / 2;

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Puntaje ${value} de ${max}`}
      >
        <circle
          className="score-gauge__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="score-gauge__progress"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <div className="score-gauge__value">
        <strong>{value}</strong>
        <span>/{max}</span>
      </div>
    </div>
  );
}

export default ScoreGauge;
