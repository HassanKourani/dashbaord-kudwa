"use client";

import { PeriodType } from "@/app/utils/dataLoader";
import { Calendar, Clock, TrendingUp, Check } from "lucide-react";

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
      icon: Calendar,
      description: "Monthly insights",
      color: "bg-[#698AC5]",
    },
    {
      key: "quarterly" as PeriodType,
      label: "Quarterly",
      icon: Clock,
      description: "Quarterly performance",
      color: "bg-[#B09280]",
    },
    {
      key: "yearly" as PeriodType,
      label: "Yearly",
      icon: TrendingUp,
      description: "Annual overview",
      color: "bg-[#EAE62F]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 animate-in backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#698AC5] to-[#5a7bb8] rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              Time Period
            </h3>
            <p className="text-gray-500">Choose your reporting timeframe</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
          <div className="w-2 h-2 bg-[#698AC5] rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Active</span>
        </div>
      </div>

      {/* Period Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {periods.map((period) => {
          const isSelected = selectedPeriod === period.key;
          const Icon = period.icon;

          return (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left transform cursor-pointer active:scale-95 ${
                isSelected
                  ? "border-[#698AC5] bg-gradient-to-br from-[#698AC5]/10 via-white to-[#698AC5]/5 shadow-2xl shadow-[#698AC5]/20 scale-105"
                  : "border-gray-300 bg-white hover:border-[#698AC5] hover:shadow-2xl hover:shadow-[#698AC5]/10 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#698AC5]/5 hover:to-white shadow-lg"
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-6 right-6 w-10 h-10 bg-[#698AC5] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-md ${
                    isSelected
                      ? "bg-[#698AC5] text-white shadow-xl shadow-[#698AC5]/30 transform scale-110"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:bg-[#698AC5] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#698AC5]/20 group-hover:transform group-hover:scale-105"
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Text Content */}
                <div className="space-y-3 mb-6">
                  <h4
                    className={`text-xl font-bold transition-colors duration-300 ${
                      isSelected
                        ? "text-[#698AC5]"
                        : "text-gray-800 group-hover:text-[#698AC5]"
                    }`}
                  >
                    {period.label}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isSelected
                        ? "text-[#698AC5]/70 font-medium"
                        : "text-gray-600 group-hover:text-gray-700"
                    }`}
                  >
                    {period.description}
                  </p>
                  {!isSelected && (
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-[#698AC5] rounded-full animate-pulse"></div>
                      <span className="text-xs text-[#698AC5] font-medium">
                        Click to select
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#698AC5] via-[#5a7bb8] to-[#EAE62F] rounded-b-2xl" />
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#698AC5]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
