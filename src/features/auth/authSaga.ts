import { authActions, LoginPayLoad } from "./authSlice";
import { fork, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleLogin(payload: LoginPayLoad) {
  console.log("handle login", payload);
}
function* handleLogout() {
  console.log("handle log out");
}
function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<LoginPayLoad> = yield take(
      authActions.login.type
    );
    yield fork(handleLogin, action.payload);

    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
