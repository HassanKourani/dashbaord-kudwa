"use client";

import { useState, useEffect } from "react";
import {
  ReportData,
  ReportPeriodType,
  loadReportData,
  generateDateLabels,
} from "@/app/utils/reportDataLoader";
import ReportPeriodSelector from "@/app/components/report/ReportPeriodSelector";
import ReportItem from "@/app/components/report/ReportItem";
import ReportControls from "@/app/components/report/ReportControls";
import {
  Loader2,
  AlertCircle,
  FileText,
  BarChart3,
  Calendar,
  Users,
} from "lucide-react";

export default function Report() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<ReportPeriodType>("monthly");
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const reportData = await loadReportData();
        setData(reportData);
      } catch (err) {
        setError("Failed to load report data. Please try again.");
        console.error("Error loading report data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#698AC5] mx-auto mb-4" />
          <p className="text-[#B09280]">Loading report data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 lg:p-6">
          <div className="flex items-center gap-3 text-[#B09280]">
            <AlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Error Loading Report</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 lg:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 lg:p-6">
          <p className="text-[#B09280]">No report data available</p>
        </div>
      </div>
    );
  }

  const dateLabels = generateDateLabels(
    data.reportResult.startingDate,
    data.reportResult.endingDate,
    selectedPeriod
  );

  // Group sections by type for better organization
  const sectionsByType = data.reportResult.profitnLoss.reduce(
    (acc, section) => {
      if (!acc[section.type]) {
        acc[section.type] = [];
      }
      acc[section.type].push(section);
      return acc;
    },
    {} as Record<string, typeof data.reportResult.profitnLoss>
  );

  const getSectionTypeLabel = (type: string) => {
    switch (type) {
      case "expenses":
        return "Expenses";
      case "costOfSales":
        return "Cost of Sales";
      case "revenues":
        return "Revenues";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleExpandAll = () => {
    const allSectionIds =
      data?.reportResult.profitnLoss.map((section) => section.id) || [];
    setExpandedSections(new Set(allSectionIds));
  };

  const handleCollapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#262626] mb-2">
          Financial Report
        </h1>
        <p className="text-[#B09280] text-base lg:text-lg">
          Comprehensive financial analysis from {data.reportResult.startingDate}{" "}
          to {data.reportResult.endingDate}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#698AC5] rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#262626]">Report ID</h3>
              <p className="text-xl font-bold text-[#698AC5]">
                {data.reportResult.id}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#B09280] rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#262626]">Scenario</h3>
              <p className="text-xl font-bold text-[#B09280]">
                {data.reportResult.scenarioId}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#EAE62F] rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#262626]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#262626]">Period</h3>
              <p className="text-lg font-bold text-[#262626]">
                {dateLabels.length} {selectedPeriod}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#698AC5] rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#262626]">Sections</h3>
              <p className="text-xl font-bold text-[#698AC5]">
                {data.reportResult.profitnLoss.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ReportPeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <ReportControls
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        totalSections={data.reportResult.profitnLoss.length}
        expandedSections={expandedSections.size}
      />

      <div className="space-y-4 lg:space-y-6">
        {Object.entries(sectionsByType).map(([type, sections]) => (
          <div key={type} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#262626] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {getSectionTypeLabel(type).charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-[#262626]">
                {getSectionTypeLabel(type)}
              </h2>
              <div className="flex-1 h-px bg-[#B09280]/20"></div>
              <span className="text-sm text-[#B09280]">
                {sections.length} section{sections.length !== 1 ? "s" : ""}
              </span>
            </div>

            {sections.map((section) => (
              <ReportItem
                key={section.id}
                section={section}
                period={selectedPeriod}
                dateLabels={dateLabels}
                startDate={data.reportResult.startingDate}
                endDate={data.reportResult.endingDate}
                isExpanded={expandedSections.has(section.id)}
                onToggleExpanded={(sectionId: number, isExpanded: boolean) => {
                  const newExpanded = new Set(expandedSections);
                  if (isExpanded) {
                    newExpanded.add(sectionId);
                  } else {
                    newExpanded.delete(sectionId);
                  }
                  setExpandedSections(newExpanded);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#262626] mb-1">
              Report Status
            </h3>
            <p className="text-[#B09280]">
              Generated on{" "}
              {new Date(data.reportResult.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-[#B09280]">
              Last updated:{" "}
              {new Date(data.reportResult.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EAE62F] rounded-full"></div>
            <span className="text-sm text-[#B09280]">Interactive Report</span>
          </div>
        </div>
      </div>
    </div>
  );
}
