"use client";

import { PeriodType } from "@/app/utils/dataLoader";
import { Calendar, Clock, TrendingUp } from "lucide-react";

interface PeriodSelectorProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

export default function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  const periods = [
    {
      key: "monthly" as PeriodType,
      label: "Monthly",
      icon: <Calendar className="w-4 h-4" />,
      description: "Monthly data trends",
    },
    {
      key: "quarterly" as PeriodType,
      label: "Quarterly",
      icon: <Clock className="w-4 h-4" />,
      description: "Quarterly performance",
    },
    {
      key: "yearly" as PeriodType,
      label: "Yearly",
      icon: <TrendingUp className="w-4 h-4" />,
      description: "Annual overview",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262626] mb-4">Time Period</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {periods.map((period) => {
          const isSelected = selectedPeriod === period.key;
          return (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                isSelected
                  ? "border-[#698AC5] bg-[#698AC5]/5 shadow-sm"
                  : "border-[#B09280]/20 hover:border-[#B09280]/40 hover:bg-[#FBFAFA]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-full ${
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
                      Currently active
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
