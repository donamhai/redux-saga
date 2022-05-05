import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction) {
//   console.log("log", action);
// }

function* handleIncrementSaga(action: PayloadAction<number>){
  console.log('handle increment saga')

  //wait 2s
  yield call(delay,2000)

  console.log('waiting done, dispatch action')

  //dispatch action success
  yield put(incrementSagaSuccess(action.payload))
}


export default function* counterSaga() {
  console.log("counter saga");

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
