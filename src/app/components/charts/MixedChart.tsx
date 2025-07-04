"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "@/app/utils/dataLoader";

interface MixedChartProps {
  data: ChartData[];
  dateArray: string[];
  title: string;
}

export default function MixedChart({
  data,
  dateArray,
  title,
}: MixedChartProps) {
  // Transform data for recharts
  const chartData = dateArray.map((date, index) => {
    const dataPoint: { [key: string]: string | number } = { date };
    data.forEach((series) => {
      if (Array.isArray(series.values)) {
        dataPoint[series.name] = series.values[index] || 0;
      }
    });
    return dataPoint;
  });

  const barColor = ["#B09280", "#698AC5", "#EAE62F", "#262626"];
  const lineColor = "#EAE62F";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
      <h3 className="text-lg font-semibold text-[#262626] mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#B09280" opacity={0.3} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#262626", fontSize: 12 }}
            tickLine={{ stroke: "#B09280" }}
          />
          <YAxis
            tick={{ fill: "#262626", fontSize: 12 }}
            tickLine={{ stroke: "#B09280" }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FBFAFA",
              border: "1px solid #B09280",
              borderRadius: "8px",
              color: "#262626",
            }}
            formatter={(value: number) => {
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value);
              return [formatted, ""];
            }}
          />
          <Legend />
          {data.map((series, index) => {
            if (series.chartType === "line") {
              return (
                <Line
                  key={series.name}
                  type="monotone"
                  dataKey={series.name}
                  stroke={lineColor}
                  strokeWidth={3}
                  dot={{ r: 5, fill: lineColor }}
                  activeDot={{ r: 7 }}
                />
              );
            } else {
              return (
                <Bar
                  key={series.name}
                  dataKey={series.name}
                  stackId="stack"
                  fill={barColor[index % barColor.length]}
                  radius={[2, 2, 0, 0]}
                />
              );
            }
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
