import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "app/hooks";
import * as React from "react";
import { useEffect } from "react";
import { StudentTable } from "../components/StudentTable";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice";

const useStyle = makeStyles((theme) => ({
  root: { position: "relative", paddingTop: theme.spacing(1) },

  titleContainer: {
    display: "flex",
    flexFlow: "row nowarp",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

export function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      {/* Student table */}
      <StudentTable studentList={studentList} />

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        ></Pagination>
      </Box>
    </Box>
  );
}
