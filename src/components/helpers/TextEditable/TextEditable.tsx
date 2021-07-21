import { IconButton, TextFieldProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from '@material-ui/icons';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useToggle } from '../../../utility/hooks/useToggle';
import { FormTextField } from '../FormTextField/FormTextField';
import { YesOrNoButton } from '../YesOrNoButton/YesOrNoButton';

interface Props<TFieldValues> {
  defaultValue: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (...args: any) => void;
}

const useStyles = makeStyles((theme) => ({
  textFieldWrapper: {
    display: 'flex',
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  yesOrNoButtonWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export const TextEditable = <TFieldValues extends FieldValues>({
  defaultValue,
  control,
  name,
  errorMessage,
  onSubmit,
  ...rest
}: Props<TFieldValues> & TextFieldProps): React.ReactElement => {
  const classes = useStyles();
  const [isEditMode, handleIsEditMode] = useToggle(false);

  if (!isEditMode) {
    return (
      <div className={classes.textFieldWrapper}>
        <Typography variant="body2" color="textSecondary">
          {defaultValue}
        </Typography>
        <IconButton
          className={classes.editButton}
          size="small"
          onClick={() => handleIsEditMode(true)}
        >
          <Edit />
        </IconButton>
      </div>
    );
  }

  return (
    <>
      <div className={classes.textFieldWrapper}>
        <FormTextField
          autoFocus
          size="small"
          variant="standard"
          fullWidth
          defaultValue={defaultValue}
          control={control}
          name={name}
          errorMessage={errorMessage}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </div>
      <div className={classes.yesOrNoButtonWrapper}>
        <YesOrNoButton
          yesLabel="保存"
          yesButtonProps={{
            onClick: () => {
              onSubmit();
              handleIsEditMode(false);
            },
          }}
          noLabel="キャンセル"
          noButtonProps={{ onClick: () => handleIsEditMode(false) }}
        />
      </div>
    </>
  );
};
