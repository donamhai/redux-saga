import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  // check if user is logged in
  // if yes, show route
  // otherwise, redirect to login page

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  console.log("is logged in", isLoggedIn);
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}
