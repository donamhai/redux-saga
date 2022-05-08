import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { ListResponse, Student } from "model";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardAcions, RankingByCity } from "./dashboardSlice";

export default function* dashboardSaga() {
  yield takeLatest(dashboardAcions.fetchData.type, fetchDashboardData);
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardAcions.fetchDataSuccess());
  } catch (error) {
    console.log("Failed to fetch dashboard data", error);
    yield put(dashboardAcions.fetchDataFailed());
  }
}

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: "male",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: "female",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_gte: 8,
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_lte: 5,
    }),
  ]);

  const statisticList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(
    dashboardAcions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });

  yield put(dashboardAcions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });

  yield put(dashboardAcions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  //fetch city list
  const { data: cityList } = yield call(cityApi.getAll);
  //fetch ranking per city

  const callList = cityList.map((x: any) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "desc",
      city: x.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      rankingList: x.data,
    })
  );
  //update state
  yield put(dashboardAcions.setRankingByCityList(rankingByCityList));
}
