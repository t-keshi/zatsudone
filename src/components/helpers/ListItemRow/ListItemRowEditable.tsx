import {
  Box,
  Button,
  IconButton,
  ListItem,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Edit } from '@material-ui/icons';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useToggle } from '../../../utility/hooks/useToggle';
import { FormTextField } from '../FormTextField/FormTextField';

interface StyleProps {
  rowWidth: number;
}

interface Props<TFieldValues> extends StyleProps {
  label: string;
  defaultValue: TextFieldProps['defaultValue'];
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (...args: any) => void;
}

const useStyles = makeStyles((theme) => ({
  listItemText: {
    display: 'flex',
    width: '100%',
    maxWidth: ({ rowWidth }: StyleProps) => rowWidth,
    alignItems: 'center',
  },
  label: {
    width: '30%',
  },
  value: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
}));

export const ListItemRowEditable = <TFieldValues extends FieldValues>({
  label,
  defaultValue,
  control,
  name,
  errorMessage,
  rowWidth,
  onSave,
}: Props<TFieldValues>): React.ReactElement => {
  const classes = useStyles({ rowWidth });
  const [isEditMode, handleIsEditMode] = useToggle(false);

  return (
    <ListItem dense>
      <Box className={classes.listItemText}>
        <Box className={classes.label}>
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Box className={classes.value}>
          {!isEditMode ? (
            <>
              <Typography variant="body2" color="textSecondary">
                {defaultValue as React.ReactText}
              </Typography>
              <IconButton
                className={classes.editButton}
                size="small"
                onClick={() => handleIsEditMode(true)}
              >
                <Edit />
              </IconButton>
            </>
          ) : (
            <>
              <FormTextField
                autoFocus
                size="small"
                variant="standard"
                defaultValue={defaultValue}
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
              <Button
                size="small"
                className={classes.editButton}
                onClick={() => {
                  onSave();
                  handleIsEditMode(false);
                }}
              >
                保存
              </Button>
            </>
          )}
        </Box>
      </Box>
    </ListItem>
  );
};
