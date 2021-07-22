/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  SelectProps,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { SelectCustom } from '../SelectCustom/SelectCustom';

interface Props<TFieldValues> {
  children: React.ReactNode;
  label: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  selectProps: SelectProps;
  formControlProps: FormControlProps;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  children,
  label,
  register,
  name,
  errorMessage,
  formControlProps,
  selectProps,
}: Props<TFieldValues>): React.ReactElement => {
  useEffect(() => {
    register(name, {
      validate: (value) => Boolean(value) || 'This is required.',
    });
  }, [name, register]);

  return (
    <FormControl
      variant="outlined"
      error={Boolean(errorMessage)}
      {...formControlProps}
    >
      <InputLabel>{label}</InputLabel>
      <SelectCustom displayRowsCount={5.5} {...selectProps}>
        {children}
      </SelectCustom>
      <FormHelperText error={Boolean(errorMessage)}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};
