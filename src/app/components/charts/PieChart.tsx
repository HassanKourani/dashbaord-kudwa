"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "@/app/utils/dataLoader";

interface PieChartProps {
  data: ChartData[];
  title: string;
}

export default function CustomPieChart({ data, title }: PieChartProps) {
  // Transform data for recharts
  const chartData = data.map((item) => ({
    name: item.name,
    value: typeof item.values === "number" ? Math.abs(item.values) : 0,
    originalValue: typeof item.values === "number" ? item.values : 0,
  }));

  const COLORS = ["#698AC5", "#B09280", "#EAE62F", "#262626", "#FBFAFA"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
      <h3 className="text-lg font-semibold text-[#262626] mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#FBFAFA",
              border: "1px solid #B09280",
              borderRadius: "8px",
              color: "#262626",
            }}
            formatter={(value: number, name: string, props) => {
              const originalValue = props.payload.originalValue;
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(originalValue);
              return [formatted, name];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#262626" }}
            formatter={(value) =>
              value.length > 20 ? value.substring(0, 20) + "..." : value
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
