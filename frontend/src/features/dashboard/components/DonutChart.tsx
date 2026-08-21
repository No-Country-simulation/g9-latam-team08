import "./DonutChart.css";

export interface DonutChartSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutChartSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
}

function DonutChart({
  segments,
  size = 200,
  strokeWidth = 32,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  let cumulativePercent = 0;

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Gráfico de distribución"
      >
        {total <= 0 ? (
          <circle
            className="donut-chart__empty"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ) : (
          segments.map((segment) => {
            const percent = segment.value / total;
            const dash = percent * circumference;
            const gap = circumference - dash;
            const rotation = cumulativePercent * 360 - 90;
            cumulativePercent += percent;

            return (
              <circle
                key={segment.label}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
                stroke={segment.color}
                strokeDasharray={`${dash} ${gap}`}
                transform={`rotate(${rotation} ${center} ${center})`}
              >
                <title>{`${segment.label}: ${segment.value}`}</title>
              </circle>
            );
          })
        )}
      </svg>

      {centerValue && (
        <div className="donut-chart__center">
          {centerLabel && <span className="donut-chart__center-label">{centerLabel}</span>}
          <strong className="donut-chart__center-value">{centerValue}</strong>
        </div>
      )}
    </div>
  );
}

export default DonutChart;
