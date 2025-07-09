import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  DashboardData,
  PeriodType,
  loadDashboardData,
} from "@/app/utils/dataLoader";

interface DashboardState {
  selectedPeriod: PeriodType;
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  selectedPeriod: "monthly",
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (period: PeriodType, { rejectWithValue }) => {
    try {
      const data = await loadDashboardData(period);
      return data;
    } catch {
      return rejectWithValue(
        `Failed to load ${period} data. Please try again.`
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<PeriodType>) => {
      state.selectedPeriod = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPeriod, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
