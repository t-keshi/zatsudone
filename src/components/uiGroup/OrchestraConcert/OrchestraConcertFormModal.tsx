import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateConcert } from '../../../containers/controllers/concert/useCreateConcert';
import { GoogleMapLocation } from '../../../containers/controllers/concert/useSearchAccess';
import { extractPrefectureFromAddress } from '../../../utility/extractPrefectureFromAddress';
import { yupLocaleJP } from '../../../utility/yupLocaleJP';
import { DialogCustom } from '../../helpers/DialogCustom/DialogCustom';
import { FormMapLocation } from '../../helpers/FormMapLocation/FormMapLocation';
import { FormArrayTextField } from '../../helpers/FormTextField/FormArrayTextField';
import { FormTextField } from '../../helpers/FormTextField/FormTextField';

interface Props {
  isModalOpen: boolean;
  handleIsModalOpen: (nextValue?: boolean | undefined) => void;
}

interface Symphony {
  symphony: string;
}

export interface FormValues {
  title: string;
  date: string;
  location: GoogleMapLocation;
  symphonies: Symphony[];
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  title: yup.string().min(1).max(30).required(),
  date: yup.string().required(),
  location: yup.object().shape({
    address: yup.string().required(),
    placeId: yup.string().required(),
  }),
  symphonies: yup
    .array()
    .of(yup.object().shape({ symphony: yup.string().required() })),
});

export const OrchestraConcertFormModal: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      date: '2017-05-24',
      location: { address: '', placeId: '' },
      symphonies: [],
    },
    resolver: yupResolver(schema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { mutate } = useCreateConcert({
    onSuccess: () => handleIsModalOpen(false),
  });
  const onSubmit = handleSubmit((data: FormValues) => {
    const { title, date, location, symphonies } = data;
    const formattedSymphonies = symphonies
      .filter((symphony) => symphony.symphony !== '')
      .map((symphony) => symphony.symphony);
    const variables = {
      title,
      date: new Date(date),
      address: location.address,
      placeId: location.placeId,
      prefecture: extractPrefectureFromAddress(location.address) ?? null,
      symphonies: formattedSymphonies,
    };

    mutate(variables);
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <DialogCustom
          variant="standard"
          title="演奏会の作成"
          open={isModalOpen}
          onClose={() => handleIsModalOpen(false)}
          yesButtonProps={{
            onClick: (e) => {
              void onSubmit(e);
              console.log('clicked');
            },
          }}
          maxWidth="sm"
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
        </DialogCustom>
      </form>
    </FormProvider>
  );
};
