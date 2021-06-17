import {
  Box,
  Button,
  IconButton,
  ListItem,
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
  value: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
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
  value,
  control,
  name,
  errorMessage,
  rowWidth,
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
                {value}
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
              <Button size="small" className={classes.editButton}>
                保存
              </Button>
            </>
          )}
        </Box>
      </Box>
    </ListItem>
  );
};
