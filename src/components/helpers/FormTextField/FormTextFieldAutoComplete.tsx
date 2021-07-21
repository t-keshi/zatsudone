/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form';

interface Props<TFieldValues, TOption> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  autocompleteProps: Omit<
    AutocompleteProps<TOption, boolean, boolean, boolean>,
    'renderInput'
  >;
  textFieldProps: Partial<TextFieldProps>;
}

export const FormTextFieldAutocomplete = <
  TFieldValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TOption extends {},
>({
  control,
  name,
  errorMessage,
  autocompleteProps,
  textFieldProps,
}: Props<TFieldValues, TOption>): React.ReactElement => (
  <Controller
    name={name}
    control={control}
    defaultValue={
      textFieldProps.defaultValue as UnpackNestedValue<
        PathValue<TFieldValues, Path<TFieldValues> & undefined>
      >
    }
    render={({ field }) => (
      <Autocomplete
        {...autocompleteProps}
        renderInput={(params) => (
          <TextField
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            {...textFieldProps}
            {...field}
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    )}
  />
);
