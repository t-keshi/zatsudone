/* eslint-disable react/jsx-props-no-spreading */
import { Chip, IconButton, TextFieldProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import React from 'react';
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  Path,
  PathValue,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { FormTextField } from './FormTextField';

interface Props<TFieldValues, K> {
  control: Control<TFieldValues>;
  name: ArrayPath<TFieldValues>;
  keyName: K;
  errorMessage: string | undefined;
}

const useStyles = makeStyles((theme) => ({
  textFieldWrapper: {
    display: 'flex',
  },
  symphonyList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    height: theme.spacing(5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const FormArrayTextField = <
  TFieldValues extends FieldValues,
  K extends keyof FieldArray<TFieldValues, ArrayPath<TFieldValues>>
>({
  control,
  name,
  keyName,
  errorMessage,
  ...typographyProps
}: Props<TFieldValues, K> & Partial<TextFieldProps>): React.ReactElement => {
  const { getValues, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const classes = useStyles();
  const inputIndex = fields.length;

  return (
    <>
      <div className={classes.textFieldWrapper}>
        <FormTextField
          control={control}
          name={
            `${name}.${inputIndex}.${String(keyName)}` as Path<TFieldValues>
          }
          errorMessage={errorMessage}
          fullWidth
          {...typographyProps}
        />
        <IconButton
          onClick={() => {
            console.log(inputIndex);
            const value = getValues(
              `${name}.${inputIndex}.${String(keyName)}` as Path<TFieldValues>,
            );

            if (value === '') {
              return;
            }

            setValue(
              `${name}.${inputIndex}.${String(keyName)}` as Path<TFieldValues>,
              '' as PathValue<FieldValues, Path<TFieldValues>>,
            );

            // eslint-disable-next-line consistent-return
            return append({ [keyName]: value } as FieldArray<
              TFieldValues,
              ArrayPath<TFieldValues>
            >);
          }}
        >
          <Add />
        </IconButton>
      </div>
      <ul className={classes.symphonyList}>
        {fields.map((item, index) => (
          <li key={item.id}>
            <Chip
              className={classes.chip}
              label={item[keyName]}
              onDelete={() => remove(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
