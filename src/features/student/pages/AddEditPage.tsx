import { Box, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import studentApi from "api/studentApi";
import { Student } from "model";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { StudentForm } from "../components/StudentForm";
import { toast } from "react-toastify";

export function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const history = useHistory();

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("Faield to fetch student details", error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    // TODO: handle submit hể, call API to add/edit student
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    //toast message
    toast.success("save student successfully");

    //redirect back to student list
    history.push("/admin/students");
  };

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? "Update student Info" : "Add new student"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
