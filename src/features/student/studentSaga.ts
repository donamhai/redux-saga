import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListResponse, Student } from "model";
import { call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

export default function* studentSaga() {
  //watch fet student action
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch student list", error);
    yield put(studentActions.fetchStudentListFailed());
  }
}
