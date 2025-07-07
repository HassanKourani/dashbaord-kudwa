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

  const colors = ["#698AC5", "#B09280", "#EAE62F", "#262626", "#FBFAFA"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 lg:p-6">
      <h3 className="text-base lg:text-lg font-semibold text-[#262626] mb-6">
        {title}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 280 : 300}
        className="min-h-[280px] lg:min-h-[300px]"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: isMobile ? 10 : 20,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 80 : 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#B09280" opacity={0.3} />
          <XAxis
            dataKey="date"
            tick={{
              fill: "#262626",
              fontSize: isMobile ? 10 : 12,
            }}
            tickLine={{ stroke: "#B09280" }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 70 : 30}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{
              fill: "#262626",
              fontSize: isMobile ? 10 : 12,
            }}
            tickLine={{ stroke: "#B09280" }}
            width={isMobile ? 50 : 60}
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
              fontSize: isMobile ? "12px" : "14px",
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
          />
          <Legend
            wrapperStyle={{
              fontSize: isMobile ? "10px" : "12px",
              color: "#262626",
            }}
            iconSize={isMobile ? 8 : 10}
          />
          {data.map((series, index) => (
            <Line
              key={series.name}
              type="monotone"
              dataKey={series.name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
