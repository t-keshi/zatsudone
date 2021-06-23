import { IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Edit } from '@material-ui/icons';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useToggle } from '../../../utility/hooks/useToggle';
import { FormTextField } from '../FormTextField/FormTextField';
import { YesOrNoButton } from '../YesOrNoButton/YesOrNoButton';

interface Props<TFieldValues> {
  value: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (...args: any) => void;
}

const useStyles = makeStyles((theme) => ({
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
  value,
  control,
  name,
  errorMessage,
  onSubmit,
}: Props<TFieldValues>): React.ReactElement => {
  const classes = useStyles();
  const [isEditMode, handleIsEditMode] = useToggle(false);

  if (!isEditMode) {
    <>
      <Typography variant="body2" color="textSecondary">
        {value}
      </Typography>
      <IconButton
        className={classes.editButton}
        size="small"
        onClick={() => handleIsEditMode(true)}
      >
        <Edit />
      </IconButton>
    </>;
  }

  return (
    <>
      <FormTextField
        autoFocus
        size="small"
        variant="standard"
        defaultValue={value}
        control={control}
        name={name}
        errorMessage={errorMessage}
      />
      <IconButton
        className={classes.editButton}
        size="small"
        onClick={() => handleIsEditMode(false)}
      >
        <Close />
      </IconButton>
      <div className={classes.yesOrNoButtonWrapper}>
        <YesOrNoButton
          yesLabel="保存"
          yesButtonProps={{
            onClick: () => {
              onSubmit();
              handleIsEditMode(false);
            },
          }}
          noLabel="保存"
          noButtonProps={{ onClick: () => handleIsEditMode(false) }}
        />
      </div>
    </>
  );
};
