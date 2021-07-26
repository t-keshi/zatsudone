import { yupResolver } from '@hookform/resolvers/yup';
import { List } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useUpdateConcert } from '../../../../containers/controllers/concert/useUpdateConcert';
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
  date?: string;
  openAt?: string;
  startAt?: string;
  closeAt?: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  date: yup.string(),
  openAt: yup.string(),
  startAt: yup.string(),
  closeAt: yup.string(),
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
  const { mutate } = useUpdateConcert();
  const params: { concertId: string } = useParams();
  const onSubmit = handleSubmit((data) => {
    mutate({
      id: params.concertId,
      date: data.date ? new Date(data.date) : undefined,
      openAt: data.openAt
        ? new Date(`${dateFormat(date)} ${data.openAt}`)
        : undefined,
      startAt: data.startAt
        ? new Date(`${dateFormat(date)} ${data.startAt}`)
        : undefined,
      closeAt: data.closeAt
        ? new Date(`${dateFormat(date)} ${data.closeAt}`)
        : undefined,
    });
  });

  return (
    <div>
      <SubHeading variant="h5" paragraph>
        コンサート情報
      </SubHeading>
      <List>
        <ListItemRowEditable
          control={control}
          label="開催日"
          name="date"
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
          defaultValue={dateFormat(openAt, 'time')}
          errorMessage={errors.openAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="開演時間"
          name="startAt"
          defaultValue={dateFormat(startAt, 'time')}
          errorMessage={errors.startAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
        <ListItemRowEditable
          control={control}
          label="終演予定時間"
          name="closeAt"
          defaultValue={dateFormat(closeAt, 'time')}
          errorMessage={errors.closeAt?.message}
          rowWidth={ROW_WIDTH}
          type="time"
          onSave={onSubmit}
        />
      </List>
    </div>
  );
};
