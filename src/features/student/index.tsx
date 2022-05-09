import { Box } from "@material-ui/core";
import React, {useEffect} from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { AddEditPage } from "./pages/AddEditPage";
import { useAppDispatch } from "app/hooks";
import { cityActions } from "features/city/citySlice";

export function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(cityActions.fetCityList())
  },[])
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
