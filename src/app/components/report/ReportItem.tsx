"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import {
  ReportSection,
  ReportField,
  ReportPeriodType,
  aggregateDataByPeriod,
  formatReportCurrency,
} from "@/app/utils/reportDataLoader";

interface ReportItemProps {
  section: ReportSection;
  period: ReportPeriodType;
  dateLabels: string[];
  startDate: string;
  endDate: string;
  isExpanded?: boolean;
  onToggleExpanded?: (sectionId: number, isExpanded: boolean) => void;
}

export default function ReportItem({
  section,
  period,
  dateLabels,
  isExpanded = false,
  onToggleExpanded,
}: ReportItemProps) {
  const [expandedFields, setExpandedFields] = useState<Set<number>>(new Set());

  const toggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded(section.id, !isExpanded);
    }
  };

  const toggleFieldExpanded = (fieldId: number) => {
    const newExpanded = new Set(expandedFields);
    if (newExpanded.has(fieldId)) {
      newExpanded.delete(fieldId);
    } else {
      newExpanded.add(fieldId);
    }
    setExpandedFields(newExpanded);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "expenses":
        return <TrendingDown className="w-4 h-4 text-[#B09280]" />;
      case "costOfSales":
        return <Minus className="w-4 h-4 text-[#262626]" />;
      case "revenues":
        return <TrendingUp className="w-4 h-4 text-[#698AC5]" />;
      default:
        return <DollarSign className="w-4 h-4 text-[#262626]" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "expenses":
        return "text-[#B09280]";
      case "costOfSales":
        return "text-[#262626]";
      case "revenues":
        return "text-[#698AC5]";
      default:
        return "text-[#262626]";
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "expenses":
        return "bg-[#B09280]/5";
      case "costOfSales":
        return "bg-[#262626]/5";
      case "revenues":
        return "bg-[#698AC5]/5";
      default:
        return "bg-[#FBFAFA]";
    }
  };

  const calculateFieldTotal = (field: ReportField): number => {
    if (field.actualData.length === 0) return 0;

    const values = field.actualData[0]?.value || [];
    const aggregatedValues = aggregateDataByPeriod(values, period);
    return aggregatedValues.reduce((sum, val) => sum + val, 0);
  };

  const sectionTotal = section.fields.reduce(
    (sum, field) => sum + calculateFieldTotal(field),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 mb-4">
      <div
        className={`p-4 rounded-t-lg cursor-pointer transition-all duration-200 hover:bg-opacity-80 ${getTypeBgColor(
          section.type
        )}`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-[#262626]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#262626]" />
              )}
              {getTypeIcon(section.type)}
            </div>
            <div>
              <h3
                className={`text-lg font-semibold ${getTypeColor(
                  section.type
                )}`}
              >
                {section.name}
              </h3>
              <p className="text-sm text-[#B09280]">
                {section.fields.length} field
                {section.fields.length !== 1 ? "s" : ""} • {section.type}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getTypeColor(section.type)}`}>
              {formatReportCurrency(sectionTotal)}
            </div>
            <div className="text-sm text-[#B09280] capitalize">
              {period} total
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-[#B09280]/20">
          {section.fields.map((field) => {
            const fieldTotal = calculateFieldTotal(field);
            const isFieldExpanded = expandedFields.has(field.id);

            return (
              <div
                key={field.id}
                className="border-b border-[#B09280]/10 last:border-b-0"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-[#FBFAFA] transition-colors"
                  onClick={() => toggleFieldExpanded(field.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 ml-4">
                        {isFieldExpanded ? (
                          <ChevronDown className="w-4 h-4 text-[#B09280]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#B09280]" />
                        )}
                        <div className="w-2 h-2 bg-[#EAE62F] rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#262626]">
                          {field.name}
                        </h4>
                        <p className="text-sm text-[#B09280]">
                          Account ID: {field.uniqueReference.accountId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#262626]">
                        {formatReportCurrency(fieldTotal)}
                      </div>
                      <div className="text-sm text-[#B09280] capitalize">
                        {period} total
                      </div>
                    </div>
                  </div>
                </div>

                {isFieldExpanded && field.actualData.length > 0 && (
                  <div className="px-4 pb-4 ml-8">
                    <div className="bg-[#FBFAFA] rounded-lg p-4">
                      <h5 className="font-medium text-[#262626] mb-3">
                        Period Breakdown
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {aggregateDataByPeriod(
                          field.actualData[0]?.value || [],
                          period
                        ).map((value, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 border border-[#B09280]/20"
                          >
                            <div className="text-sm text-[#B09280] mb-1">
                              {dateLabels[index]}
                            </div>
                            <div className="font-semibold text-[#262626]">
                              {formatReportCurrency(value)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {field.uniqueReference && (
                        <div className="mt-4 pt-4 border-t border-[#B09280]/20">
                          <h6 className="font-medium text-[#262626] mb-2">
                            Reference Details
                          </h6>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-[#B09280]">
                                Sheet Type:
                              </span>
                              <span className="ml-2 text-[#262626]">
                                {field.uniqueReference.sheetType}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#B09280]">
                                Source Type:
                              </span>
                              <span className="ml-2 text-[#262626]">
                                {field.uniqueReference.sourceType}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#B09280]">
                                Account Name:
                              </span>
                              <span className="ml-2 text-[#262626]">
                                {field.uniqueReference.accountName}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#B09280]">Metric:</span>
                              <span className="ml-2 text-[#262626]">
                                {field.uniqueReference.metric ? "Yes" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
