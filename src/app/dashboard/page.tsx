"use client";

import { useEffect } from "react";
import { PeriodType } from "@/app/utils/dataLoader";
import PeriodSelector from "@/app/components/PeriodSelector";
import KPICard from "@/app/components/KPICard";
import CustomLineChart from "@/app/components/charts/LineChart";
import CustomPieChart from "@/app/components/charts/PieChart";
import CustomBarChart from "@/app/components/charts/BarChart";
import MixedChart from "@/app/components/charts/MixedChart";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchDashboardData,
  setPeriod,
} from "@/app/store/slices/dashboardSlice";
import {
  Loader2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { selectedPeriod, data, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData(selectedPeriod));
  }, [dispatch, selectedPeriod]);

  const handlePeriodChange = (period: PeriodType) => {
    dispatch(setPeriod(period));
    dispatch(fetchDashboardData(period));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#698AC5] rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#262626] mb-2">
            Loading Dashboard
          </h3>
          <p className="text-[#B09280]">Fetching {selectedPeriod} data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="card p-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#B09280] rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#262626] mb-2">
              Error Loading Data
            </h3>
            <p className="text-[#B09280] mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchDashboardData(selectedPeriod))}
              className="px-6 py-2 bg-[#698AC5] text-white rounded-lg hover:bg-[#698AC5]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="card p-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#B09280] rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#262626] mb-2">
              No Data Available
            </h3>
            <p className="text-[#B09280]">
              Please check back later or contact support
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#698AC5] to-[#B09280] rounded-xl flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#262626]">
              Analytics Dashboard
            </h1>
            <p className="text-[#B09280] text-lg mt-1">
              {data.mainDashboard.startDate} - {data.mainDashboard.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />

      {/* Top KPIs */}
      {data.mainDashboardKPIs.topKPIs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EAE62F] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#262626]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#262626]">
                Key Performance Indicators
              </h2>
              <p className="text-[#B09280]">
                Primary metrics driving your business
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.mainDashboardKPIs.topKPIs.map((kpi, index) => (
              <div
                key={index}
                className="animate-in h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <KPICard kpi={kpi} isTopKPI={true} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Financial Metrics */}
      {data.mainDashboardKPIs.KPIs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#B09280] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#262626]">
                Financial Metrics
              </h2>
              <p className="text-[#B09280]">
                Detailed financial performance indicators
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.mainDashboardKPIs.KPIs.map((kpi, index) => (
              <div
                key={index}
                className="animate-in h-full"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <KPICard kpi={kpi} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Charts */}
      <section className="space-y-8">
        {/* Cash at Bank */}
        {data.mainDashboard.charts.cashAtBank.length > 0 && (
          <div className="animate-in">
            <CustomLineChart
              data={data.mainDashboard.charts.cashAtBank}
              dateArray={data.mainDashboard.dateArray}
              title="Cash at Bank"
            />
          </div>
        )}

        {/* Expense and Revenue Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.mainDashboard.charts.expenseSplit.length > 0 && (
            <div className="animate-in">
              <CustomPieChart
                data={data.mainDashboard.charts.expenseSplit}
                title="Expense Distribution"
              />
            </div>
          )}

          {data.mainDashboard.charts.totalRevenuesSplit.length > 0 && (
            <div className="animate-in">
              <CustomPieChart
                data={data.mainDashboard.charts.totalRevenuesSplit}
                title="Revenue Distribution"
              />
            </div>
          )}
        </div>

        {/* Indirect Cashflow */}
        {data.mainDashboard.charts.indirectCashflow.length > 0 && (
          <div className="animate-in">
            <CustomBarChart
              data={data.mainDashboard.charts.indirectCashflow}
              dateArray={data.mainDashboard.dateArray}
              title="Indirect Cashflow"
            />
          </div>
        )}

        {/* Profit & Loss Overview */}
        {data.mainDashboard.charts.profitLossOverview.length > 0 && (
          <div className="animate-in">
            <MixedChart
              data={data.mainDashboard.charts.profitLossOverview}
              dateArray={data.mainDashboard.dateArray}
              title="Profit & Loss Overview"
            />
          </div>
        )}
      </section>

      {/* Status Footer */}
      <div className="card p-6 bg-gradient-to-r from-[#698AC5]/5 to-[#B09280]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-[#EAE62F] rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#262626]">
                Data Status
              </h3>
              <p className="text-[#B09280]">
                Live {selectedPeriod} data • {data.mainDashboard.startDate} to{" "}
                {data.mainDashboard.endDate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#698AC5]">Last Updated</p>
            <p className="text-xs text-[#B09280]">Just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
