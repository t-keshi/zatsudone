import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormTextField } from '../../../components/helpers/FormTextField/FormTextField';
import { useMembers } from '../../../containers/contexts/members';
import { yupLocaleJP } from '../../../utility/yupLocaleJP';

interface FormValues {
  name: string;
}

yup.setLocale(yupLocaleJP);
const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  name: yup.string().min(1).max(15).required(),
});

const useStyles = makeStyles(() => ({}));

export const SidebarMenu: React.VFC = () => {
  const classes = useStyles();
  const [members, dispatch] = useMembers();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    dispatch({ type: 'add', payload: { name: data.name } });
    reset();
  });

  return (
    <Box p={3}>
      <FormTextField
        name="name"
        fullWidth
        control={control}
        errorMessage={errors.name?.message}
      />
      <Box mt={6} />
      <Button onClick={onSubmit} fullWidth>
        追加
      </Button>
      <List>
        {members.members.map((member) => (
          <ListItem key={member}>
            <ListItemText primary={member} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
