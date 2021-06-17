import { Box } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { ModalCustom } from '../../helpers/ModalCustom/ModalCustom';

interface Props {
  isModalOpen: boolean;
  handleIsModalOpen: (nextValue?: boolean | undefined) => void;
}

interface FormValue {
  title: string;
  date: Date;
  startAt: string;
  openAt: string;
  closeAt: string;
}

export const ConcertFormModal: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalCustom
        variant="standard"
        title="演奏会の作成"
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
        yesButtonProps={{ onClick: () => handleIsModalOpen(false) }}
        noButtonProps={{ onClick: () => handleIsModalOpen(false) }}
      >
        <FormTextField
          control={control}
          name="title"
          label="演奏会名"
          margin="normal"
          fullWidth
          errorMessage={errors.title?.message}
        />
        <Box mt={1} />
        <FormTextField
          control={control}
          name="date"
          type="date"
          label="開催日"
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
          margin="normal"
          fullWidth
          errorMessage={errors.title?.message}
        />
        <Box mt={1} />
        <FormTextField
          control={control}
          name="startAt"
          label="開場時間"
          margin="normal"
          fullWidth
          errorMessage={errors.title?.message}
        />
        <Box mt={1} />
        <FormTextField
          control={control}
          name="startAt"
          label="開演時間"
          margin="normal"
          fullWidth
          errorMessage={errors.title?.message}
        />
      </ModalCustom>
    </form>
  );
};
