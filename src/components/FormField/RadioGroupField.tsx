import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { Control, useController } from "react-hook-form";

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: String;
  disable?: boolean;
  option: RadioOption[];
}

export function RadioGroupField({
  name,
  control,
  label,
  disable,
  option,
}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      disabled={disable}
      margin="normal"
      component="fieldset"
      error={invalid}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} name={name} onChange={onChange} onBlur={onBlur}>
        {option.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
