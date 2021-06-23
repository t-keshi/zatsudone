import { List } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ListItemRowEditable } from '../../helpers/ListItemRow/ListItemRowEditable';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

const ROW_WIDTH = 500;

export const OrchestraDetailInfoForm: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    membersCount: number;
    conductor: string;
    subConductor: string;
    homepage: string;
  }>();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SubHeading variant="h5" gutterBottom>
        楽団詳細情報
      </SubHeading>
      <List>
        <ListItemRowEditable
          control={control}
          label="団員数"
          name="membersCount"
          value="142名"
          errorMessage={errors.membersCount?.message}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRowEditable
          control={control}
          label="指揮"
          name="conductor"
          value="142名"
          errorMessage={errors.conductor?.message}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRowEditable
          control={control}
          label="副指揮"
          name="subConductor"
          value="142名"
          errorMessage={errors.subConductor?.message}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRowEditable
          control={control}
          label="公式ホームページ"
          name="subConductor"
          value="https://google.com"
          errorMessage={errors.homepage?.message}
          rowWidth={ROW_WIDTH}
        />
      </List>
    </form>
  );
};
