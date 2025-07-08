"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "@/app/utils/dataLoader";
import { TrendingUp } from "lucide-react";

interface LineChartProps {
  data: ChartData[];
  dateArray: string[];
  title: string;
}

export default function CustomLineChart({
  data,
  dateArray,
  title,
}: LineChartProps) {
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
  const chartData = dateArray.map((date, index) => {
    const dataPoint: { [key: string]: string | number } = { date };
    data.forEach((series) => {
      if (Array.isArray(series.values)) {
        dataPoint[series.name] = series.values[index] || 0;
      }
    });
    return dataPoint;
  });

  const colors = ["#698AC5", "#B09280", "#EAE62F", "#262626"];

  return (
    <div className="card p-8 animate-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#698AC5] rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#262626]">{title}</h3>
          <p className="text-sm text-[#B09280]">Financial trends over time</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 350 : 400}
        className="min-h-[350px] lg:min-h-[400px]"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: isMobile ? 20 : 30,
            left: isMobile ? 20 : 30,
            bottom: isMobile ? 80 : 20,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#B09280"
            opacity={0.2}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{
              fill: "#B09280",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 500,
            }}
            tickLine={{ stroke: "#B09280", strokeWidth: 1 }}
            axisLine={{ stroke: "#B09280", strokeWidth: 1 }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 80 : 40}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{
              fill: "#B09280",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 500,
            }}
            tickLine={{ stroke: "#B09280", strokeWidth: 1 }}
            axisLine={{ stroke: "#B09280", strokeWidth: 1 }}
            width={isMobile ? 60 : 80}
            tickFormatter={(value) => {
              if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
              return `$${value}`;
            }}
          />
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
            formatter={(value: number, name: string) => {
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value);
              return [formatted, name];
            }}
            labelStyle={{
              color: "#698AC5",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: isMobile ? "12px" : "14px",
              color: "#262626",
              fontWeight: 500,
            }}
            iconSize={isMobile ? 12 : 14}
          />
          {data.map((series, index) => (
            <Line
              key={series.name}
              type="monotone"
              dataKey={series.name}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={{
                r: 5,
                fill: colors[index % colors.length],
                strokeWidth: 2,
                stroke: "white",
              }}
              activeDot={{
                r: 8,
                fill: colors[index % colors.length],
                strokeWidth: 3,
                stroke: "white",
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
