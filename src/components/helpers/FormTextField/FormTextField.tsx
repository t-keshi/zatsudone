/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<TFieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
}

export const FormTextField = <TFieldValues extends FieldValues>({
  control,
  name,
  errorMessage,
  ...typographyProps
}: Props<TFieldValues> & Partial<TextFieldProps>): React.ReactElement => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        {...typographyProps}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
      />
    )}
  />
);
