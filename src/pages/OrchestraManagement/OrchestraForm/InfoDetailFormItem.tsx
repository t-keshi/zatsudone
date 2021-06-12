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
import { FormTextField } from '../../../components/ui/FormTextField/FormTextField';
import { useToggle } from '../../../utility/hooks/useToggle';

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginLeft: theme.spacing(2),
  },
}));

interface Props<TFieldValues> {
  label: string;
  value: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  errorMessage: string | undefined;
}

export const InfoDetailFormItem = <TFieldValues extends FieldValues>({
  label,
  value,
  control,
  name,
  errorMessage,
}: Props<TFieldValues>): React.ReactElement => {
  const classes = useStyles();
  const [isEditMode, handleIsEditMode] = useToggle(false);

  return (
    <ListItem dense>
      <Box display="flex" maxWidth={500} width="100%" alignItems="center">
        <Box width="30%">
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Box width="70%" display="flex" alignItems="center">
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
