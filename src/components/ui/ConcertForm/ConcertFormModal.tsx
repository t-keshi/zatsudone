import { Box } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GoogleMapLocation } from '../../../containers/api/concert/useSearchAccess';
import { FormMapLocation } from '../../helpers/FormMapLocation/FormMapLocation';
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
  location: GoogleMapLocation;
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
  const onSubmit = handleSubmit((data: unknown) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <ModalCustom
        variant="standard"
        title="演奏会の作成"
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
        yesButtonProps={{ onClick: onSubmit }}
        noButtonProps={{ onClick: () => handleIsModalOpen(false) }}
        modalWidth={500}
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
          name="closeAt"
          label="終了予定時間"
          margin="normal"
          fullWidth
          errorMessage={errors.title?.message}
        />
        <Box mt={1} />
        <FormMapLocation
          control={control}
          name="location"
          errorMessage={
            errors.location?.address?.message ??
            errors.location?.placeId?.message
          }
        />
      </ModalCustom>
    </form>
  );
};
