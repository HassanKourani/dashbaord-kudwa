"use client";

import { ReportPeriodType } from "@/app/utils/reportDataLoader";
import { Calendar, Clock, TrendingUp, BarChart3, Check } from "lucide-react";

interface ReportPeriodSelectorProps {
  selectedPeriod: ReportPeriodType;
  onPeriodChange: (period: ReportPeriodType) => void;
}

export default function ReportPeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: ReportPeriodSelectorProps) {
  const periods = [
    {
      key: "monthly" as ReportPeriodType,
      label: "Monthly",
      icon: <Calendar className="w-5 h-5" />,
      description: "Monthly report breakdown",
      color: "#698AC5",
    },
    {
      key: "quarterly" as ReportPeriodType,
      label: "Quarterly",
      icon: <Clock className="w-5 h-5" />,
      description: "Quarterly aggregated data",
      color: "#B09280",
    },
    {
      key: "yearly" as ReportPeriodType,
      label: "Yearly",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Annual summary",
      color: "#EAE62F",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#698AC5] to-[#5a7bb8] rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Report Period
            </h3>
            <p className="text-gray-500">
              Select the time period for detailed analysis
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
          <div className="w-2 h-2 bg-[#698AC5] rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {periods.map((period) => {
          const isSelected = selectedPeriod === period.key;
          return (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`relative group rounded-xl border-2 transition-all duration-300 text-left transform cursor-pointer overflow-hidden active:scale-95 ${
                isSelected
                  ? "border-[#698AC5] bg-gradient-to-br from-[#698AC5]/10 via-white to-[#698AC5]/5 shadow-xl shadow-[#698AC5]/20 scale-105"
                  : "border-gray-300 bg-white hover:border-[#698AC5] hover:shadow-xl hover:shadow-[#698AC5]/10 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#698AC5]/5 hover:to-white shadow-lg"
              }`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#698AC5] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 shadow-md ${
                      isSelected
                        ? "bg-[#698AC5] text-white shadow-xl shadow-[#698AC5]/30 transform scale-110"
                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:bg-[#698AC5] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#698AC5]/20 group-hover:scale-105"
                    }`}
                  >
                    {period.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-lg font-bold transition-colors duration-300 ${
                        isSelected
                          ? "text-[#698AC5]"
                          : "text-gray-800 group-hover:text-[#698AC5]"
                      }`}
                    >
                      {period.label}
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isSelected
                          ? "text-[#698AC5]/70 font-medium"
                          : "text-gray-600 group-hover:text-gray-700"
                      }`}
                    >
                      {period.description}
                    </p>
                  </div>
                </div>

                {/* Active Period Indicator */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-[#698AC5]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#EAE62F] rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-[#698AC5]">
                        Active Period
                      </span>
                    </div>
                  </div>
                )}

                {/* Click to Select Indicator */}
                {!isSelected && (
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#698AC5] rounded-full animate-pulse"></div>
                      <span className="text-xs text-[#698AC5] font-medium">
                        Click to select
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#698AC5] via-[#5a7bb8] to-[#EAE62F] rounded-b-xl" />
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#698AC5]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
