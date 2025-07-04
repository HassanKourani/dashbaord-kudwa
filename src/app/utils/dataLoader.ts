// Types for the dashboard data structure
export interface DashboardData {
  mainDashboard: {
    period: string;
    startDate: string;
    endDate: string;
    metricDate: string;
    dateArray: string[];
    charts: {
      cashAtBank: ChartData[];
      expenseSplit: ChartData[];
      indirectCashflow: ChartData[];
      totalRevenuesSplit: ChartData[];
      profitLossOverview: ChartData[];
      salariesSplit: ChartData[];
      ManpowerOperatingExpenses: ChartData[];
    };
  };
  mainDashboardKPIs: {
    topKPIs: KPIData[];
    KPIs: KPIData[];
  };
}

export interface ChartData {
  chartType: string;
  name: string;
  values: number[] | number;
}

export interface KPIData {
  name: string;
  value: number;
  date?: string;
  mOm?: number;
  mom?: number;
  prefix?: string;
  type?: string;
}

export type PeriodType = "monthly" | "quarterly" | "yearly";

// Function to load dashboard data based on period
export async function loadDashboardData(
  period: PeriodType
): Promise<DashboardData> {
  try {
    const response = await fetch(
      `/FE_Data_Kudwa/Main Dashboard/${period}.json`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${period} data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${period} data:`, error);
    throw error;
  }
}

// Function to format numbers for display
export function formatNumber(num: number): string {
  if (Math.abs(num) >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toFixed(2);
}

// Function to format currency
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Function to get color based on value (positive/negative)
export function getValueColor(value: number): string {
  if (value > 0) return "#698AC5";
  if (value < 0) return "#B09280";
  return "#262626";
}
