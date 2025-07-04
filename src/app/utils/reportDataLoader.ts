// Types for the report data structure
export interface ReportData {
  reportResult: {
    id: number;
    scenarioId: number;
    startingDate: string;
    endingDate: string;
    createdAt: string;
    updatedAt: string;
    profitnLoss: ReportSection[];
  };
}

export interface ReportSection {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  outputs: unknown[];
  actualData: unknown[];
  fields: ReportField[];
}

export interface ReportField {
  id: number;
  topLevelFieldId: number;
  name: string;
  code: string | null;
  uniqueReference: {
    sheetType: string;
    integrationSourceId: number;
    sourceType: string;
    accountId: string;
    accountName: string;
    metric: boolean;
  };
  order: number | null;
  description: string | null;
  style: string | null;
  fieldType: string | null;
  createdAt: string;
  updatedAt: string;
  fieldId: number | null;
  outputs: unknown[];
  actualData: ActualData[];
}

export interface ActualData {
  id: number;
  topLevelFieldId: number | null;
  fieldId: number;
  value: number[];
  createdAt: string;
  updatedAt: string;
}

export type ReportPeriodType = "monthly" | "quarterly" | "yearly";

// Function to load report data
export async function loadReportData(): Promise<ReportData> {
  try {
    const response = await fetch("/FE_Data_Kudwa/Report/report.json");
    if (!response.ok) {
      throw new Error("Failed to fetch report data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading report data:", error);
    throw error;
  }
}

// Function to generate date array based on start and end dates
export function generateDateArray(
  startDate: string,
  endDate: string
): string[] {
  const dates: string[] = [];
  const [startMonth, startYear] = startDate.split("-").map(Number);
  const [endMonth, endYear] = endDate.split("-").map(Number);

  let currentMonth = startMonth;
  let currentYear = startYear;

  while (
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonth)
  ) {
    dates.push(`${currentMonth.toString().padStart(2, "0")}-${currentYear}`);
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return dates;
}

// Function to aggregate data by period
export function aggregateDataByPeriod(
  data: number[],
  period: ReportPeriodType
): number[] {
  if (period === "monthly") {
    return data;
  }

  const result: number[] = [];

  if (period === "quarterly") {
    for (let i = 0; i < data.length; i += 3) {
      const quarterSum = data
        .slice(i, i + 3)
        .reduce((sum, val) => sum + (val || 0), 0);
      result.push(quarterSum);
    }
  } else if (period === "yearly") {
    for (let i = 0; i < data.length; i += 12) {
      const yearSum = data
        .slice(i, i + 12)
        .reduce((sum, val) => sum + (val || 0), 0);
      result.push(yearSum);
    }
  }

  return result;
}

// Function to generate date labels by period
export function generateDateLabels(
  startDate: string,
  endDate: string,
  period: ReportPeriodType
): string[] {
  const monthlyDates = generateDateArray(startDate, endDate);

  if (period === "monthly") {
    return monthlyDates.map((date) => {
      const [month, year] = date.split("-");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    });
  }

  if (period === "quarterly") {
    const result: string[] = [];
    for (let i = 0; i < monthlyDates.length; i += 3) {
      const [month, year] = monthlyDates[i].split("-");
      const quarter = Math.ceil(parseInt(month) / 3);
      result.push(`Q${quarter} ${year}`);
    }
    return result;
  }

  if (period === "yearly") {
    const years = new Set<string>();
    monthlyDates.forEach((date) => {
      const [, year] = date.split("-");
      years.add(year);
    });
    return Array.from(years).sort();
  }

  return [];
}

// Function to format currency
export function formatReportCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Function to format large numbers
export function formatReportNumber(num: number): string {
  if (Math.abs(num) >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toFixed(0);
}
