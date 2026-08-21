import "./BarChart.css";

export interface BarChartSeries {
  label: string;
  color: string;
  values: number[];
}

interface BarChartProps {
  categories: string[];
  series: BarChartSeries[];
  valueFormatter?: (value: number) => string;
  width?: number;
  height?: number;
}

const GRID_STEPS = 4;

function BarChart({
  categories,
  series,
  valueFormatter = (value) => `${value}`,
  width = 640,
  height = 280,
}: BarChartProps) {
  const marginTop = 16;
  const marginBottom = 32;
  const marginLeft = 72;
  const marginRight = 12;

  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const niceMax = Math.ceil(maxValue / GRID_STEPS) * GRID_STEPS || GRID_STEPS;

  const groupWidth = chartWidth / Math.max(categories.length, 1);
  const barGap = 6;
  const barWidth = (groupWidth - barGap * (series.length + 1)) / Math.max(series.length, 1);

  const yFor = (value: number) => marginTop + chartHeight - (value / niceMax) * chartHeight;

  return (
    <svg
      className="bar-chart"
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Gráfico de barras"
    >
      {Array.from({ length: GRID_STEPS + 1 }, (_, step) => {
        const value = (niceMax / GRID_STEPS) * step;
        const y = yFor(value);

        return (
          <g key={value}>
            <line
              className="bar-chart__grid-line"
              x1={marginLeft}
              x2={width - marginRight}
              y1={y}
              y2={y}
            />
            <text
              className="bar-chart__axis-label"
              x={marginLeft - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {valueFormatter(value)}
            </text>
          </g>
        );
      })}

      {categories.map((category, categoryIndex) => {
        const groupX = marginLeft + groupWidth * categoryIndex;

        return (
          <g key={category}>
            {series.map((item, seriesIndex) => {
              const value = item.values[categoryIndex] ?? 0;
              const barHeight = (value / niceMax) * chartHeight;
              const x = groupX + barGap + seriesIndex * (barWidth + barGap);
              const y = marginTop + chartHeight - barHeight;

              return (
                <rect
                  key={item.label}
                  x={x}
                  y={y}
                  width={Math.max(barWidth, 0)}
                  height={Math.max(barHeight, 0)}
                  rx={4}
                  fill={item.color}
                >
                  <title>{`${item.label} - ${category}: ${valueFormatter(value)}`}</title>
                </rect>
              );
            })}

            <text
              className="bar-chart__category-label"
              x={groupX + groupWidth / 2}
              y={height - marginBottom + 20}
              textAnchor="middle"
            >
              {category}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default BarChart;
