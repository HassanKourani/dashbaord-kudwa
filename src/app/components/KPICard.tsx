"use client";

import { useState, useEffect } from "react";
import { KPIData, formatCurrency, formatNumber } from "@/app/utils/dataLoader";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  kpi: KPIData;
  isTopKPI?: boolean;
}

export default function KPICard({ kpi, isTopKPI = false }: KPICardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-[#698AC5]" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-[#B09280]" />;
    return <Minus className="w-4 h-4 text-[#262626]" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-[#698AC5]";
    if (value < 0) return "text-[#B09280]";
    return "text-[#262626]";
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

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 lg:p-6 ${
        isTopKPI ? "border-[#698AC5]/40" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-[#B09280] mb-1 leading-tight ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            {kpi.name}
          </h3>
          <div
            className={`font-bold text-[#262626] mb-2 leading-tight ${
              isMobile ? "text-lg" : "text-2xl"
            }`}
          >
            {formatValue(kpi.value)}
          </div>
          {kpi.date && (
            <p className="text-xs text-[#B09280] mb-2">As of {kpi.date}</p>
          )}
          {momValue !== 0 && (
            <div className="flex items-center gap-1">
              {getTrendIcon(momValue)}
              <span
                className={`font-medium ${getTrendColor(momValue)} ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                {Math.abs(momValue).toFixed(1)}% {kpi.prefix || "MoM"}
              </span>
            </div>
          )}
        </div>
        {isTopKPI && (
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#EAE62F] rounded-full flex-shrink-0"></div>
        )}
      </div>
      {kpi.type === "specificMonth" && (
        <div className="mt-3 pt-3 border-t border-[#B09280]/10">
          <span className="text-xs text-[#B09280] bg-[#FBFAFA] px-2 py-1 rounded">
            Specific Month
          </span>
        </div>
      )}
    </div>
  );
}
