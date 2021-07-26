import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextEditable } from '../../../helpers/TextEditable/TextEditable';
import { TextLabel } from '../../../helpers/TextLabel/TextLabel';

interface Props {
  orchestraName: string;
  title: string;
  description: string;
}

interface FormValues {
  title?: string;
  description?: string;
}

const schema = yup.object().shape({
  title: yup.string().min(1).max(30),
  description: yup.string().min(1).max(500),
});

export const ConcertSummaryForm: React.VFC<Props> = ({
  orchestraName,
  title,
  description,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <TextLabel gutterBottom>{orchestraName}</TextLabel>
      <TextEditable
        control={control}
        onSubmit={onSubmit}
        name="title"
        defaultValue={title}
        margin="normal"
        errorMessage={errors.title?.message}
      />
      <TextEditable
        control={control}
        onSubmit={onSubmit}
        name="description"
        defaultValue={description}
        margin="normal"
        multiline
        rows={4}
        errorMessage={errors.description?.message}
      />
    </div>
  );
};
