import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportData,
  ReportPeriodType,
  loadReportData,
} from "@/app/utils/reportDataLoader";

interface ReportState {
  selectedPeriod: ReportPeriodType;
  data: ReportData | null;
  loading: boolean;
  error: string | null;
  expandedSections: number[];
}

const initialState: ReportState = {
  selectedPeriod: "monthly",
  data: null,
  loading: false,
  error: null,
  expandedSections: [],
};

// Async thunk for fetching report data
export const fetchReportData = createAsyncThunk(
  "report/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadReportData();
      return data;
    } catch {
      return rejectWithValue("Failed to load report data. Please try again.");
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<ReportPeriodType>) => {
      state.selectedPeriod = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleSection: (
      state,
      action: PayloadAction<{ sectionId: number; isExpanded: boolean }>
    ) => {
      const { sectionId, isExpanded } = action.payload;
      if (isExpanded) {
        if (!state.expandedSections.includes(sectionId)) {
          state.expandedSections.push(sectionId);
        }
      } else {
        state.expandedSections = state.expandedSections.filter(
          (id) => id !== sectionId
        );
      }
    },
    expandAllSections: (state) => {
      if (state.data) {
        const allSectionIds = state.data.reportResult.profitnLoss.map(
          (section) => section.id
        );
        state.expandedSections = allSectionIds;
      }
    },
    collapseAllSections: (state) => {
      state.expandedSections = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPeriod,
  clearError,
  toggleSection,
  expandAllSections,
  collapseAllSections,
} = reportSlice.actions;

export default reportSlice.reducer;
