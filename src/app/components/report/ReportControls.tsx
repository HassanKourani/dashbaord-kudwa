"use client";

import { Expand, Minimize, Download, Filter } from "lucide-react";

interface ReportControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  totalSections: number;
  expandedSections: number;
}

export default function ReportControls({
  onExpandAll,
  onCollapseAll,
  totalSections,
  expandedSections,
}: ReportControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[#262626]">
            Report Controls
          </h3>
          <div className="px-2 py-1 bg-[#EAE62F]/20 rounded-full">
            <span className="text-xs font-medium text-[#262626]">
              {expandedSections}/{totalSections} expanded
            </span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Expand/Collapse Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onExpandAll}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#698AC5] text-white text-sm rounded-lg hover:bg-[#5a7cb0] transition-colors flex-1 sm:flex-initial"
            >
              <Expand className="w-4 h-4" />
              <span className="hidden sm:inline">Expand All</span>
              <span className="sm:hidden">Expand</span>
            </button>
            <button
              onClick={onCollapseAll}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#B09280] text-white text-sm rounded-lg hover:bg-[#9d8070] transition-colors flex-1 sm:flex-initial"
            >
              <Minimize className="w-4 h-4" />
              <span className="hidden sm:inline">Collapse All</span>
              <span className="sm:hidden">Collapse</span>
            </button>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block w-px h-6 bg-[#B09280]/20"></div>

          {/* Additional Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-[#B09280]/20 text-[#262626] text-sm rounded-lg hover:bg-[#FBFAFA] transition-colors flex-1 sm:flex-initial">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-[#B09280]/20 text-[#262626] text-sm rounded-lg hover:bg-[#FBFAFA] transition-colors flex-1 sm:flex-initial">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
