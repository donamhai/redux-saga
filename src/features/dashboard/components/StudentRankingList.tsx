import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Student } from "model";
import * as React from "react";

export interface StudentRankingListProps {
  studentList: Student[];
}

const useStyles = makeStyles((theme) => ({
  table: {},
}));

export function StudentRankingList({ studentList }: StudentRankingListProps) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
