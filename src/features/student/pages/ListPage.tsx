import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import studentApi from "api/studentApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCityList, selectCityMap } from "features/city/citySlice";
import { ListParams, Student } from "model";
import * as React from "react";
import { useEffect } from "react";
import { StudentFilters } from "../components/StudentFilters";
import { StudentTable } from "../components/StudentTable";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

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
  const history = useHistory();
  const classes = useStyle();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const match = useRouteMatch();

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      //remove student APi
      await studentApi.remove(student.id || "");

      // trigger to refresh student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
      toast.success("Remove student successfully");
    } catch (error) {
      console.log("failed to fetch student", error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Student</Typography>

        <Link to={`${match.url}/add`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        {/* Filter */}
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {/* Student table */}
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
      />

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
