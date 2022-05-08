import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "model";

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  rankingList: Student[];
}

export interface dashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: dashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, actions: PayloadAction<DashboardStatistics>) {
      state.statistics = actions.payload;
    },
    setHighestStudentList(state, actions: PayloadAction<Student[]>) {
      state.highestStudentList = actions.payload;
    },
    setLowestStudentList(state, actions: PayloadAction<Student[]>) {
      state.lowestStudentList = actions.payload;
    },
    setRankingByCityList(state, actions: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = actions.payload;
    },
  },
});

//actions
export const dashboardAcions = dashboardSlice.actions;

//Selectors
export const selectDashBoardStatistics = (state: RootState) =>
  state.dashboard.statistics;
export const selectDashBoardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectHighestStudentList = (state: RootState) =>
  state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) =>
  state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
