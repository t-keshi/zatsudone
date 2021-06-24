import { Box } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GoogleMapLocation } from '../../../containers/api/concert/useSearchAccess';
import { FormMapLocation } from '../../helpers/FormMapLocation/FormMapLocation';
import { FormArrayTextField } from '../../helpers/FormTextField/FormArrayTextField';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';
import { ModalCustom } from '../../helpers/ModalCustom/ModalCustom';

interface Props {
  isModalOpen: boolean;
  handleIsModalOpen: (nextValue?: boolean | undefined) => void;
}

interface Symphony {
  symphony: string;
}

export interface FormValue {
  title: string;
  date: Date;
  location: GoogleMapLocation;
  symphonies: Symphony[];
}

export const ConcertFormModal: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const methods = useForm<FormValue>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit((data: unknown) => console.log(data));

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
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
            errorMessage={errors.date?.message}
          />
          <Box mt={1} />
          <FormMapLocation
            control={control}
            name="location"
            label="会場"
            errorMessage={
              errors.location?.address?.message ??
              errors.location?.placeId?.message
            }
          />
          <Box mt={2} />
          <FormArrayTextField
            control={control}
            key="symphony"
            name="symphonies"
            label="主な演奏曲(3曲まで)"
            errorMessage={
              errors.symphonies?.map((error) => error)[0]?.symphony?.message
            }
          />
        </ModalCustom>
      </form>
    </FormProvider>
  );
};
