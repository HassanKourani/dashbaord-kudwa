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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onExpandAll}
              className="flex items-center gap-2 px-3 py-2 bg-[#698AC5] text-white text-sm rounded-lg hover:bg-[#5a7cb0] transition-colors"
            >
              <Expand className="w-4 h-4" />
              Expand All
            </button>
            <button
              onClick={onCollapseAll}
              className="flex items-center gap-2 px-3 py-2 bg-[#B09280] text-white text-sm rounded-lg hover:bg-[#9d8070] transition-colors"
            >
              <Minimize className="w-4 h-4" />
              Collapse All
            </button>
          </div>

          <div className="w-px h-6 bg-[#B09280]/20"></div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-[#B09280]/20 text-[#262626] text-sm rounded-lg hover:bg-[#FBFAFA] transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-[#B09280]/20 text-[#262626] text-sm rounded-lg hover:bg-[#FBFAFA] transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
