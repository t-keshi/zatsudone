import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { API_KEY } from '../../../../containers/entities/env';
import { FormMapLocation } from '../../../helpers/FormMapLocation/FormMapLocation';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface FormValues {
  location: string;
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  location: yup.string().required(),
});

export const ConcertAccessForm: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <SubHeading variant="h5">会場アクセス</SubHeading>
      <FormMapLocation
        control={control}
        label="会場"
        name="location"
        defaultValue=""
        variant="standard"
        margin="dense"
        errorMessage={errors.location?.message}
      />
      <Button onClick={onSubmit}>保存</Button>
      <Box mt={2} />
      <iframe
        title="map"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ4R137qjvAGAR18pA_2nu0tw&key=${API_KEY}`}
      />
    </div>
  );
};
