import counterSaga from "features/counter/counterSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  console.log("root saga");
  yield all([helloSaga(), counterSaga()]);
}

function* helloSaga() {
  console.log("hello saga");
}
