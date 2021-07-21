import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEditOrchestraNotification } from '../../../containers/controllers/orchestra/useEditOrchestraNotification';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

interface Props {
  orchestraId: string;
  notifications: string[];
}
interface FormValues {
  notification: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  notification: yup.string().required(),
});

export const OrchestraNotificationForm: React.VFC<Props> = ({
  orchestraId,
  notifications,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate } = useEditOrchestraNotification();
  const onSubmit = handleSubmit((data: FormValues) => {
    mutate({
      orchestraId,
      notification: data.notification,
      manipulation: 'add',
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <SubHeading variant="h5" gutterBottom>
        お知らせ
      </SubHeading>
      <List>
        {notifications &&
          notifications.reverse().map((notification) => (
            <ListItem dense key={notification}>
              <ListItemText primary={notification} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() =>
                    mutate({
                      orchestraId,
                      notification,
                      manipulation: 'delete',
                    })
                  }
                >
                  <Close />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Box display="flex">
        <FormTextField
          control={control}
          name="notification"
          variant="standard"
          placeholder="お知らせ"
          errorMessage={errors.notification?.message}
        />
        <Box ml={2} />
        <Button startIcon={<Add />} size="small" onClick={onSubmit}>
          追加する
        </Button>
      </Box>
    </form>
  );
};
