/* eslint-disable react/jsx-props-no-spreading */
import { Chip, IconButton, TextFieldProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import React from 'react';
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  Path,
  PathValue,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { FormTextField } from './FormTextField';

interface Props<TFieldValues> {
  control: Control<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
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

export const FormSelectArray = <TFieldValues extends FieldValues>({
  control,
  name,
  errorMessage,
  ...typographyProps
}: Props<TFieldValues> & Partial<TextFieldProps>): React.ReactElement => {
  const { getValues, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray<
    TFieldValues,
    ArrayPath<TFieldValues>
  >({
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
          name={`${name}.${inputIndex}.value` as Path<TFieldValues>}
          errorMessage={errorMessage}
          fullWidth
          {...typographyProps}
        />
        <IconButton
          onClick={() => {
            const value = getValues(`${name}.${inputIndex}.value`);

            if (value === '') {
              return;
            }

            setValue(
              `${name}.${inputIndex}.value`,
              '' as PathValue<FieldValues, Path<TFieldValues>>,
            );

            // eslint-disable-next-line consistent-return
            return append({ value } as FieldArray<
              TFieldValues,
              ArrayPath<TFieldValues>
            >);
          }}
        >
          <Add />
        </IconButton>
      </div>
      <ul className={classes.symphonyList}>
        {fields.map(
          (
            field: FieldArrayWithId<
              TFieldValues,
              ArrayPath<TFieldValues>,
              'id'
            >,
            index,
          ) => (
            <li key={field.id}>
              {console.log(field, fields)}
              <Chip
                className={classes.chip}
                label={
                  field['value' as PathValue<FieldValues, Path<TFieldValues>>]
                }
                onDelete={() => remove(index)}
              />
            </li>
          ),
        )}
      </ul>
    </>
  );
};
