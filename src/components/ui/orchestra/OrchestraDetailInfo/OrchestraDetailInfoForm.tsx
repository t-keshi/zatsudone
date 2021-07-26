import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment, List } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateOrchestra } from '../../../../containers/controllers/orchestra/useUpdateOrchestra';
import { yupLocaleJP } from '../../../../utility/yupLocaleJP';
import { ListItemRowEditable } from '../../../helpers/ListItemRow/ListItemRowEditable';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  orchestraId: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
}
interface FormValues {
  membersCount: number | undefined;
  conductor: string | undefined;
  subConductor: string | undefined;
  homePage: string | undefined;
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  membersCount: yup.number().positive().integer(),
  conductor: yup.string().min(1),
  subConductor: yup.string().min(1),
  homePage: yup.string().url(),
});

const ROW_WIDTH = 500;

export const OrchestraDetailInfoForm: React.VFC<Props> = ({
  orchestraId,
  membersCount,
  conductor,
  subConductor,
  homePage,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate } = useUpdateOrchestra();
  const onSubmit = handleSubmit((data: FormValues) => {
    console.log('aaaaaaaaaa', data);
    mutate({
      orchestraId,
      membersCount: data?.membersCount ?? undefined,
      conductor: data?.conductor ?? undefined,
      subConductor: data?.subConductor ?? undefined,
      homePage: data?.homePage ?? undefined,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <SubHeading variant="h5" gutterBottom>
        楽団詳細情報
      </SubHeading>
      <List>
        <ListItemRowEditable
          control={control}
          label="団員数"
          name="membersCount"
          defaultValue={membersCount}
          errorMessage={errors.membersCount?.message}
          rowWidth={ROW_WIDTH}
          onSave={onSubmit}
          InputProps={{
            endAdornment: <InputAdornment position="end">名</InputAdornment>,
          }}
        />
        <ListItemRowEditable
          control={control}
          label="指揮"
          name="conductor"
          defaultValue={conductor}
          errorMessage={errors.conductor?.message}
          rowWidth={ROW_WIDTH}
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="副指揮"
          name="subConductor"
          defaultValue={subConductor}
          errorMessage={errors.subConductor?.message}
          rowWidth={ROW_WIDTH}
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="公式ホームページ"
          name="homePage"
          defaultValue={homePage}
          errorMessage={errors.homePage?.message}
          rowWidth={ROW_WIDTH}
          onSave={onSubmit}
        />
      </List>
    </form>
  );
};
