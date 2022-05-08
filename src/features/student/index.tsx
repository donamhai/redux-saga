import { Box } from "@material-ui/core";
import * as React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { AddEditPage } from "./pages/AddEditPage";

export function StudentFeature() {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListPage />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditPage />
        </Route>
        <Route path={`${match.path}/:studentId`}>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}
