/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<TFieldValues> {
  // value: ParsableDate<
  //   React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // >;
  // onChange: (
  //   date: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null,
  //   keyboardInputValue?: string | undefined,
  // ) => void;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
}

export const FormDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  // value,
  // onChange,
  errorMessage,
  ...typographyProps
}: Props<TFieldValues> & Partial<TextFieldProps>): React.ReactElement => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <DatePicker
        value={field.value}
        onChange={field.onChange}
        mask="____/__/__"
        renderInput={(datePickerProps) => (
          <TextField
            {...datePickerProps}
            {...typographyProps}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
          />
        )}
      />
    )}
  />
);
