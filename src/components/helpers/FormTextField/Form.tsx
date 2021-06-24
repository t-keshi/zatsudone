/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export const FormTextField = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  ...typographyProps
}: UseControllerProps<TFieldValues> &
  Partial<TextFieldProps>): React.ReactElement => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    defaultValue,
  });

  return (
    <TextField
      {...field}
      {...typographyProps}
      error={Boolean(errors.message)}
      helperText={errors.message}
    />
  );
};
