"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "@/app/utils/dataLoader";
import { PieChart as PieChartIcon } from "lucide-react";

interface PieChartProps {
  data: ChartData[];
  title: string;
}

export default function CustomPieChart({ data, title }: PieChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Transform data for recharts
  const chartData = data.map((item) => ({
    name: item.name,
    value: typeof item.values === "number" ? Math.abs(item.values) : 0,
    originalValue: typeof item.values === "number" ? item.values : 0,
  }));

  const COLORS = ["#698AC5", "#B09280", "#EAE62F", "#262626"];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Calculate dynamic height based on legend items
  const calculateChartHeight = () => {
    const baseChartHeight = isMobile ? 280 : 320; // Reduced base height to make room for legend
    const legendItemHeight = isMobile ? 20 : 24; // Height per legend item
    const legendPadding = 40; // Additional padding for legend
    const legendItemsPerRow = isMobile ? 1 : Math.min(2, chartData.length); // Items per row
    const legendRows = Math.ceil(chartData.length / legendItemsPerRow);
    const legendHeight = legendRows * legendItemHeight + legendPadding;

    return baseChartHeight + legendHeight;
  };

  const chartHeight = calculateChartHeight();

  return (
    <div className="card p-8 animate-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#B09280] rounded-lg flex items-center justify-center">
          <PieChartIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#262626]">{title}</h3>
          <p className="text-sm text-[#B09280]">Breakdown by category</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={isMobile ? 45 : 60} // Slightly reduced to make room
            outerRadius={isMobile ? 80 : 100} // Slightly reduced to make room
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #B09280",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(38, 38, 38, 0.1)",
              color: "#262626",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 500,
            }}
            formatter={(value: number, name: string, props) => {
              const originalValue = props.payload.originalValue;
              const percentage = ((value / total) * 100).toFixed(1);
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(originalValue);
              return [`${formatted} (${percentage}%)`, name];
            }}
            labelStyle={{
              color: "#698AC5",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "30px", // Increased padding between chart and legend
              fontSize: isMobile ? "12px" : "14px",
              color: "#262626",
              fontWeight: 500,
            }}
            iconSize={isMobile ? 12 : 14}
            formatter={(value) =>
              value.length > (isMobile ? 12 : 18) // Slightly reduced to prevent overflow
                ? value.substring(0, isMobile ? 12 : 18) + "..."
                : value
            }
            layout={isMobile ? "vertical" : "horizontal"} // Vertical layout on mobile for better spacing
            align={isMobile ? "left" : "center"}
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#698AC5]/5 to-[#B09280]/5 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#262626]">Total</p>
            <p className="text-lg font-semibold text-[#698AC5]">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(total)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#262626]">Categories</p>
            <p className="text-lg font-semibold text-[#B09280]">
              {chartData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
