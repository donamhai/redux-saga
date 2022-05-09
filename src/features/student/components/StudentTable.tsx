import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { City, Student } from "model";
import * as React from "react";
import { capitalizeString, getMarkColor } from "utils";

export interface StudentTableProps {
  studentList: Student[];
  cityMap:{
    [key:string]: City
  }
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {},

  edit: {
    marginRight: theme.spacing(1),
  },
}));

export function StudentTable({
  studentList,
  onEdit,
  cityMap,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell width={310}>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)} fontWeight="bold">
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{cityMap[student.city]?.name}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  className={classes.edit}
                  color="primary"
                  onClick={() => onEdit?.(student)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => onRemove?.(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
