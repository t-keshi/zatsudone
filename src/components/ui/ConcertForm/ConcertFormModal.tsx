import { Box } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateConcert } from '../../../containers/api/concert/useCreateConcert';
import { GoogleMapLocation } from '../../../containers/api/concert/useSearchAccess';
import { extractPrefectureFromAddress } from '../../../utility/extractPrefectureFromAddress';
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
  date: string;
  location: GoogleMapLocation;
  symphonies: Symphony[];
}

export const ConcertFormModal: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const methods = useForm<FormValue>({
    defaultValues: {
      title: '',
      date: '2017-05-24',
      location: { address: '', placeId: '' },
      symphonies: [],
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { mutate } = useCreateConcert();
  const onSubmit = handleSubmit((data: FormValue) => {
    const { title, date, location, symphonies } = data;
    const formattedSymphonies = symphonies
      .filter((symphony) => symphony.symphony !== '')
      .map((symphony) => symphony.symphony);
    const variables = {
      title,
      date: new Date(date),
      location: {
        address: location.address,
        placeId: location.placeId,
        prefecture: extractPrefectureFromAddress(location.address) ?? null
      },
      symphonies: formattedSymphonies,
      orchestra: {
        id: 'HugSlHXnLK4D39Oe3M2z',
        name: '大阪大学吹奏楽団',
      },
    };

    return mutate(variables);
  });

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
            keyName="symphony"
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
