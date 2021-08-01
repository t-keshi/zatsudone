import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCreateConcert } from '../../../../containers/controllers/concert/useCreateConcert';
import { GoogleMapLocation } from '../../../../containers/controllers/concert/useSearchAccess';
import { extractPrefectureFromAddress } from '../../../../utility/extractPrefectureFromAddress';
import { yupLocaleJP } from '../../../../utility/yupLocaleJP';
import { DialogCustom } from '../../../helpers/DialogCustom/DialogCustom';
import { FormMapLocation } from '../../../helpers/FormTextField/FormMapLocation';
import { FormTextField } from '../../../helpers/FormTextField/FormTextField';
import { FormSelectArray } from '../../../helpers/FormTextField/FromSelectArray';

interface Props {
  isModalOpen: boolean;
  handleIsModalOpen: (nextValue?: boolean | undefined) => void;
}

export interface FormValues {
  title: string;
  date: string;
  location: GoogleMapLocation;
  symphonies: { value?: string }[];
}

yup.setLocale(yupLocaleJP);

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  title: yup.string().min(1).max(30).required(),
  date: yup.string().required(),
  location: yup.object().shape({
    address: yup.string().required(),
    placeId: yup.string().required(),
  }),
  symphonies: yup.array().of(yup.object().shape({ value: yup.string() })),
});

export const OrchestraConcertFormDialog: React.VFC<Props> = ({
  isModalOpen,
  handleIsModalOpen,
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      date: '2017-05-24',
    },
    resolver: yupResolver(schema),
  });
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;
  const all = watch();
  const { mutate } = useCreateConcert({
    onSuccess: () => {
      reset();
      handleIsModalOpen(false);
    },
  });
  const onSubmit = handleSubmit((data: FormValues) => {
    console.log(data, 'data');
    const { title, date, location, symphonies } = data;
    const formattedSymphonies = symphonies
      .filter((symphony) => symphony.value !== undefined)
      .map((symphony) => symphony.value as string);
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
              console.log('clicked', all);
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
          <FormSelectArray<FormValues>
            control={control}
            name="symphonies"
            label="主な演奏曲(3曲まで)"
            errorMessage={
              errors.symphonies?.map((error) => error)[0]?.value?.message
            }
          />
        </DialogCustom>
      </form>
    </FormProvider>
  );
};
