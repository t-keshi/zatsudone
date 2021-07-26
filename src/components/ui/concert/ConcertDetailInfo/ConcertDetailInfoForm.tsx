import { yupResolver } from '@hookform/resolvers/yup';
import { List } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { dateFormat } from '../../../../utility/dateFormat';
import { ListItemRowEditable } from '../../../helpers/ListItemRow/ListItemRowEditable';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  date: Date;
  openAt: Date;
  startAt: Date;
  closeAt: Date;
}

interface FormValues {
  date?: Date;
  openAt?: Date;
  startAt?: Date;
  closeAt?: Date;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  date: yup.date(),
  openAt: yup.date(),
  startAt: yup.date(),
  closeAt: yup.date(),
});

const ROW_WIDTH = 500;

export const ConcertDetailInfoForm: React.VFC<Props> = ({
  date,
  openAt,
  startAt,
  closeAt,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <SubHeading variant="h5" paragraph>
        コンサート情報
      </SubHeading>
      <List>
        <ListItemRowEditable
          control={control}
          label="開催日"
          name="openAt"
          defaultValue={dateFormat(date)}
          errorMessage={errors.date?.message}
          rowWidth={ROW_WIDTH}
          type="date"
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="会場時間"
          name="openAt"
          defaultValue={dateFormat(openAt)}
          errorMessage={errors.openAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="開演時間"
          name="startAt"
          defaultValue={dateFormat(startAt)}
          errorMessage={errors.startAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="終演予定時間"
          name="closeAt"
          defaultValue={dateFormat(closeAt)}
          errorMessage={errors.closeAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
      </List>
    </div>
  );
};
