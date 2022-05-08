import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ChatBubble,
  ChatRounded,
  LinearScaleSharp,
  PeopleAlt,
} from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "app/hooks";
import * as React from "react";
import { useEffect } from "react";
import { StatisticItem } from "./components/statisticItem";
import { StudentRankingList } from "./components/StudentRankingList";
import { Widget } from "./components/Widget";
import {
  dashboardAcions,
  selectDashBoardLoading,
  selectDashBoardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

export function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashBoardLoading);
  const statistics = useAppSelector(selectDashBoardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardAcions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* statistic sextion */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* all student ranking */}
      <Box mt={5}>
        <Typography variant="h4">All Student</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                {" "}
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/*ranking by city */}
      <Box mt={5}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={highestStudentList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
