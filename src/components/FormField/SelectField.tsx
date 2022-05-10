import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: String;
  disable?: boolean;
  option: SelectOption[];
}

export function SelectField({
  name,
  control,
  label,
  disable,
  option,
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      disabled={disable}
      margin="normal"
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {option.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
