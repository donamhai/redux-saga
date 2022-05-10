import { Box, Button, CircularProgress } from "@material-ui/core";
import { useAppSelector } from "app/hooks";
import { InputField, RadioGroupField, SelectField } from "components/FormField";
import { selectCityOption } from "features/city/citySlice";
import { Student } from "model";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@material-ui/lab";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Please enter name")
      .test("two-word", "Please enter at least two words", (value) => {
        if (!value) return true;
        const parts = value?.split(" ") || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive("Please enter an positive number")
      .integer("Please enter an integer")
      .min(18, "Min is 18")
      .max(100, "Min is 100")
      .typeError("Please enter a valid number")
      .required("Please enter age"),
    mark: yup
      .number()
      .positive("Please enter an positive number")
      .min(0, "min is zero")
      .max(10, "max is ten")
      .typeError("Please enter a valid number")
      .required("Please enter mark"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select either male or female")
      .required("Please enter gender"),
    city: yup.string().required("Please select city"),
  })
  .required();

export interface StudentFormProps {
  initialValues: Student;
  onSubmit?: (formValues: Student) => void;
}

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOption = useAppSelector(selectCityOption);
  const [error, setError] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError("");
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          option={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOption) && cityOption.length > 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            option={cityOption}
          />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
