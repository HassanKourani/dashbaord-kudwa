"use client";

import { ReportPeriodType } from "@/app/utils/reportDataLoader";
import { Calendar, Clock, TrendingUp, BarChart3 } from "lucide-react";

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
      icon: <Calendar className="w-4 h-4" />,
      description: "Monthly report breakdown",
      color: "#698AC5",
    },
    {
      key: "quarterly" as ReportPeriodType,
      label: "Quarterly",
      icon: <Clock className="w-4 h-4" />,
      description: "Quarterly aggregated data",
      color: "#B09280",
    },
    {
      key: "yearly" as ReportPeriodType,
      label: "Yearly",
      icon: <TrendingUp className="w-4 h-4" />,
      description: "Annual summary",
      color: "#EAE62F",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-[#698AC5] rounded-full flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#262626]">
            Report Period
          </h3>
          <p className="text-sm text-[#B09280]">
            Select the time period for detailed analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {periods.map((period) => {
          const isSelected = selectedPeriod === period.key;
          return (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected
                  ? "border-[#698AC5] bg-[#698AC5]/5 shadow-sm"
                  : "border-[#B09280]/20 hover:border-[#B09280]/40 hover:bg-[#FBFAFA]"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected
                      ? "bg-[#698AC5] text-white"
                      : "bg-[#B09280]/10 text-[#B09280]"
                  }`}
                >
                  {period.icon}
                </div>
                <div>
                  <h4
                    className={`font-semibold ${
                      isSelected ? "text-[#698AC5]" : "text-[#262626]"
                    }`}
                  >
                    {period.label}
                  </h4>
                  <p className="text-sm text-[#B09280]">{period.description}</p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-[#698AC5]/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#EAE62F] rounded-full"></div>
                    <span className="text-sm font-medium text-[#698AC5]">
                      Active Period
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
