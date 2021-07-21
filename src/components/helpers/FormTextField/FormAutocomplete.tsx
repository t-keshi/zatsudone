/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<TFieldValues, TOption> {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  autocompleteProps: Omit<
    AutocompleteProps<TOption, boolean, boolean, boolean>,
    'renderInput'
  >;
  textFieldProps: Partial<TextFieldProps>;
}

export const FormAutocomplete = <
  TFieldValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TOption extends {},
>({
  register,
  name,
  errorMessage,
  autocompleteProps,
  textFieldProps,
}: Props<TFieldValues, TOption>): React.ReactElement => {
  useEffect(() => {
    register(name, {
      validate: (value) => Boolean(value) || 'This is required.',
    });
  }, [name, register]);

  return (
    <Autocomplete
      {...autocompleteProps}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      )}
    />
  );
};
