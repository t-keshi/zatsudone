import { Box, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

export const OrchestraFormNotification: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ newNotification: string }>();
  const onSubmit = (data: unknown) => console.log(data);
  const news = ['ファゴット募集中！', 'サマーコンサートの受付を開始しました'];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubHeading variant="h5" gutterBottom>
        お知らせ
      </SubHeading>
      <List>
        {news.map((newsItem) => (
          <ListItem dense key={newsItem}>
            <ListItemText primary={newsItem} />
          </ListItem>
        ))}
      </List>
      <Box display="flex">
        <FormTextField
          control={control}
          name="newNotification"
          variant="standard"
          placeholder="お知らせ"
          errorMessage={errors.newNotification?.message}
        />
        <Box ml={2} />
        <Button startIcon={<Add />} size="small">
          追加する
        </Button>
      </Box>
    </form>
  );
};
