import { authActions, LoginPayLoad } from "./authSlice";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";

export default function* authSaga() {
  yield fork(watchLoginFlow);
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayLoad> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* handleLogin(payload: LoginPayLoad) {
  try {
    yield delay(1000);
    localStorage.setItem("access_token", "fake_token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: " HaiDN",
      })
    );

    //redirect to admin page
    yield put(push("/admin/dashboard"));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem("access_token");

  //redirect to login page
  yield put(push("/login"));
}
