"use client";

import { KPIData, formatCurrency, formatNumber } from "@/app/utils/dataLoader";
import { Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  kpi: KPIData;
  isTopKPI?: boolean;
}

export default function KPICard({ kpi, isTopKPI = false }: KPICardProps) {
  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUpRight className="w-4 h-4" />;
    if (value < 0) return <ArrowDownRight className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendStyles = (value: number) => {
    if (value > 0)
      return {
        color: "text-[#698AC5]",
        bg: "bg-[#698AC5]/10",
        border: "border-[#698AC5]/20",
      };
    if (value < 0)
      return {
        color: "text-[#B09280]",
        bg: "bg-[#B09280]/10",
        border: "border-[#B09280]/20",
      };
    return {
      color: "text-[#262626]",
      bg: "bg-[#262626]/10",
      border: "border-[#262626]/20",
    };
  };

  const formatValue = (value: number) => {
    if (
      kpi.name.toLowerCase().includes("cash") ||
      kpi.name.toLowerCase().includes("revenue") ||
      kpi.name.toLowerCase().includes("profit") ||
      kpi.name.toLowerCase().includes("expense")
    ) {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  const momValue = kpi.mOm || kpi.mom || 0;
  const trendStyles = getTrendStyles(momValue);

  return (
    <div
      className={`card p-6 group relative overflow-hidden h-full min-h-[200px] flex flex-col ${
        isTopKPI
          ? "border-[#698AC5]/20 bg-gradient-to-br from-white to-[#698AC5]/5"
          : ""
      }`}
    >
      {/* Top KPI indicator */}
      {isTopKPI && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#EAE62F] to-[#EAE62F]/60 rounded-bl-full opacity-20" />
      )}

      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-[#B09280] mb-1 leading-tight">
              {kpi.name}
            </h3>
            {kpi.date && (
              <p className="text-xs text-[#B09280]/70">Updated {kpi.date}</p>
            )}
          </div>
          {isTopKPI && (
            <div className="w-2 h-2 bg-[#EAE62F] rounded-full shadow-sm" />
          )}
        </div>

        {/* Main Value */}
        <div className="mb-4 flex-1 flex flex-col justify-center">
          <div className="text-2xl lg:text-3xl font-bold text-[#262626] mb-2">
            {formatValue(kpi.value)}
          </div>

          {/* Trend Indicator */}
          {momValue !== 0 && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${trendStyles.bg} ${trendStyles.border} border w-fit`}
            >
              <span className={trendStyles.color}>
                {getTrendIcon(momValue)}
              </span>
              <span className={`text-sm font-medium ${trendStyles.color}`}>
                {Math.abs(momValue).toFixed(1)}%
              </span>
              <span className="text-xs text-[#B09280]">
                {kpi.prefix || "MoM"}
              </span>
            </div>
          )}
        </div>

        {/* Type indicator */}
        <div className="mt-auto">
          {kpi.type === "specificMonth" && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#B09280] rounded-full" />
              <span className="text-xs text-[#B09280] font-medium">
                Specific Month Data
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#698AC5]/5 to-[#B09280]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
