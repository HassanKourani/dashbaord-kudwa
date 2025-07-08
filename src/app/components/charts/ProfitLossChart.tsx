"use client";

import { useState, useEffect } from "react";
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
  ReferenceLine,
} from "recharts";
import {
  ReportSection,
  ReportPeriodType,
  aggregateDataByPeriod,
} from "@/app/utils/reportDataLoader";

interface ProfitLossChartProps {
  sections: ReportSection[];
  dateLabels: string[];
  period: ReportPeriodType;
  title?: string;
}

interface ChartDataPoint {
  date: string;
  revenues: number;
  expenses: number;
  costOfSales: number;
  grossProfit: number;
  netProfit: number;
}

export default function ProfitLossChart({
  sections,
  dateLabels,
  period,
  title = "Profit & Loss Overview",
}: ProfitLossChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Process and aggregate data by type
  const processedData = (): ChartDataPoint[] => {
    const aggregatedData: { [key: string]: number[] } = {
      revenues: [],
      expenses: [],
      costOfSales: [],
    };

    // Initialize arrays with zeros
    const dataLength = dateLabels.length;
    Object.keys(aggregatedData).forEach((key) => {
      aggregatedData[key] = new Array(dataLength).fill(0);
    });

    // Aggregate data by section type
    sections.forEach((section) => {
      const sectionType = section.type;

      section.fields.forEach((field) => {
        field.actualData.forEach((data) => {
          const values = aggregateDataByPeriod(data.value, period);

          // Add values to the appropriate category
          if (sectionType === "revenues") {
            values.forEach((value, index) => {
              if (index < aggregatedData.revenues.length) {
                aggregatedData.revenues[index] += value;
              }
            });
          } else if (sectionType === "expenses") {
            values.forEach((value, index) => {
              if (index < aggregatedData.expenses.length) {
                aggregatedData.expenses[index] += value;
              }
            });
          } else if (sectionType === "costOfSales") {
            values.forEach((value, index) => {
              if (index < aggregatedData.costOfSales.length) {
                aggregatedData.costOfSales[index] += value;
              }
            });
          }
        });
      });
    });

    // Create chart data points
    return dateLabels.map((date, index) => {
      const revenues = aggregatedData.revenues[index] || 0;
      const expenses = aggregatedData.expenses[index] || 0;
      const costOfSales = aggregatedData.costOfSales[index] || 0;
      const grossProfit = revenues - costOfSales;
      const netProfit = grossProfit - expenses;

      return {
        date,
        revenues: revenues,
        expenses: -Math.abs(expenses), // Show expenses as negative
        costOfSales: -Math.abs(costOfSales), // Show cost of sales as negative
        grossProfit,
        netProfit,
      };
    });
  };

  const chartData = processedData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 lg:p-6 mb-4">
      <h3 className="text-base lg:text-lg font-semibold text-[#262626] mb-6">
        {title}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={isMobile ? 350 : 400}
        className="min-h-[350px] lg:min-h-[400px]"
      >
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: isMobile ? 10 : 20,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 80 : 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#B09280" opacity={0.3} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#262626", fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: "#B09280" }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 70 : 30}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#262626", fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: "#B09280" }}
            width={isMobile ? 60 : 70}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              if (value <= -1000000)
                return `-${(Math.abs(value) / 1000000).toFixed(1)}M`;
              if (value <= -1000)
                return `-${(Math.abs(value) / 1000).toFixed(1)}K`;
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

          {/* Zero reference line */}
          <ReferenceLine y={0} stroke="#262626" strokeDasharray="2 2" />

          {/* Revenue Bar */}
          <Bar
            dataKey="revenues"
            fill="#698AC5"
            name="Revenues"
            radius={[2, 2, 0, 0]}
          />

          {/* Cost of Sales Bar */}
          <Bar
            dataKey="costOfSales"
            fill="#B09280"
            name="Cost of Sales"
            radius={[0, 0, 2, 2]}
          />

          {/* Expenses Bar */}
          <Bar
            dataKey="expenses"
            fill="#EAE62F"
            name="Expenses"
            radius={[0, 0, 2, 2]}
          />

          {/* Gross Profit Line */}
          <Line
            type="monotone"
            dataKey="grossProfit"
            stroke="#262626"
            strokeWidth={3}
            dot={{ fill: "#262626", r: 4 }}
            activeDot={{ r: 6 }}
            name="Gross Profit"
          />

          {/* Net Profit Line */}
          <Line
            type="monotone"
            dataKey="netProfit"
            stroke="#698AC5"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: "#698AC5", r: 4 }}
            activeDot={{ r: 6 }}
            name="Net Profit"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#698AC5] rounded"></div>
          <span className="text-[#262626]">Revenues</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#B09280] rounded"></div>
          <span className="text-[#262626]">Cost of Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#EAE62F] rounded"></div>
          <span className="text-[#262626]">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#262626] rounded"></div>
          <span className="text-[#262626]">Gross Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#698AC5] rounded border-dashed border border-[#698AC5]"></div>
          <span className="text-[#262626]">Net Profit</span>
        </div>
      </div>
    </div>
  );
}
