import { TextField } from "@material-ui/core";
import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: String;
}

export function InputField({
  name,
  control,
  label,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      label={label}
      value={value}
      variant="outlined"
      inputRef={ref}
      error={invalid}
      onChange={onChange}
      onBlur={onBlur}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
