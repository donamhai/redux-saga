import cityApi from "api/cityApi";
import { City, ListResponse } from "model";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

export default function* citySaga() {
    yield takeLatest(cityActions.fetCityList.type,fetchCityList)
}

function* fetchCityList() {
try {
    const response: ListResponse<City> = yield call(cityApi.getAll)
    yield put(cityActions.fetCityListSuccess(response))
} catch (error) {
    console.log('Failed to fetch city list', error)
    yield put(cityActions.fetCityListFailed())
}
}