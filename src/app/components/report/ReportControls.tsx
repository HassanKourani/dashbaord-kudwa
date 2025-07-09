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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">
            Report Controls
          </h3>
          <div className="px-2 py-1 bg-yellow-100 rounded-full">
            <span className="text-xs font-medium text-gray-800">
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
              className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-initial"
            >
              <Expand className="w-4 h-4" />
              <span>Expand All</span>
            </button>
            <button
              onClick={onCollapseAll}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors flex-1 sm:flex-initial"
            >
              <Minimize className="w-4 h-4" />
              <span>Collapse All</span>
            </button>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

          {/* Additional Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-initial">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
