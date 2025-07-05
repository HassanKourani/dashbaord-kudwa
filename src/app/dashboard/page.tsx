"use client";

import { useState, useEffect } from "react";
import {
  DashboardData,
  PeriodType,
  loadDashboardData,
} from "@/app/utils/dataLoader";
import PeriodSelector from "@/app/components/PeriodSelector";
import KPICard from "@/app/components/KPICard";
import CustomLineChart from "@/app/components/charts/LineChart";
import CustomPieChart from "@/app/components/charts/PieChart";
import CustomBarChart from "@/app/components/charts/BarChart";
import MixedChart from "@/app/components/charts/MixedChart";
import { Loader2, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("monthly");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await loadDashboardData(selectedPeriod);
        setData(dashboardData);
      } catch (err) {
        setError(`Failed to load ${selectedPeriod} data. Please try again.`);
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  if (loading) {
    return (
      <div className="p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#698AC5] mx-auto mb-4" />
          <p className="text-[#B09280]">Loading {selectedPeriod} data...</p>
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
              <h3 className="font-semibold">Error Loading Data</h3>
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
          <p className="text-[#B09280]">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#262626] mb-2">
          Main Dashboard
        </h1>
        <p className="text-[#B09280] text-base lg:text-lg">
          Analytics and insights for {data.mainDashboard.startDate} -{" "}
          {data.mainDashboard.endDate}
        </p>
      </div>

      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      {data.mainDashboardKPIs.topKPIs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#262626] mb-4">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.mainDashboardKPIs.topKPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} isTopKPI={true} />
            ))}
          </div>
        </div>
      )}

      {data.mainDashboardKPIs.KPIs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#262626] mb-4">
            Financial Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {data.mainDashboardKPIs.KPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6 lg:space-y-8">
        {data.mainDashboard.charts.cashAtBank.length > 0 && (
          <CustomLineChart
            data={data.mainDashboard.charts.cashAtBank}
            dateArray={data.mainDashboard.dateArray}
            title="Cash at Bank"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {data.mainDashboard.charts.expenseSplit.length > 0 && (
            <CustomPieChart
              data={data.mainDashboard.charts.expenseSplit}
              title="Expense Split"
            />
          )}

          {data.mainDashboard.charts.totalRevenuesSplit.length > 0 && (
            <CustomPieChart
              data={data.mainDashboard.charts.totalRevenuesSplit}
              title="Revenue Split"
            />
          )}
        </div>

        {data.mainDashboard.charts.indirectCashflow.length > 0 && (
          <CustomBarChart
            data={data.mainDashboard.charts.indirectCashflow}
            dateArray={data.mainDashboard.dateArray}
            title="Indirect Cashflow"
          />
        )}

        {data.mainDashboard.charts.profitLossOverview.length > 0 && (
          <MixedChart
            data={data.mainDashboard.charts.profitLossOverview}
            dateArray={data.mainDashboard.dateArray}
            title="Profit & Loss Overview"
          />
        )}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-[#B09280]/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#262626] mb-1">
              Data Status
            </h3>
            <p className="text-[#B09280]">
              Showing {selectedPeriod} data from {data.mainDashboard.startDate}{" "}
              to {data.mainDashboard.endDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EAE62F] rounded-full"></div>
            <span className="text-sm text-[#B09280]">Live data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
