import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useUpdateConcert } from '../../../../containers/controllers/concert/useUpdateConcert';
import { API_KEY } from '../../../../containers/entities/env';
import { extractPrefectureFromAddress } from '../../../../utility/extractPrefectureFromAddress';
import { FormMapLocation } from '../../../helpers/FormTextField/FormMapLocation';
import { SubHeading } from '../../../helpers/SubHeading/SubHeading';

interface Props {
  address: string;
  placeId: string;
}
interface FormValues {
  location: { address: string; placeId: string };
}

const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  location: yup.object().shape({
    address: yup.string().required(),
    placeId: yup.string().required(),
  }),
});

export const ConcertAccessForm: React.VFC<Props> = ({ address, placeId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const { mutate } = useUpdateConcert();
  const params: { concertId: string } = useParams();
  const onSubmit = handleSubmit((data) =>
    mutate({
      id: params.concertId,
      address: data.location.address,
      placeId: data.location.placeId,
      prefecture: extractPrefectureFromAddress(data.location.address),
    }),
  );

  return (
    <div>
      <SubHeading variant="h5">会場アクセス</SubHeading>
      <FormMapLocation
        control={control}
        label="会場"
        name="location"
        defaultValue={address}
        variant="standard"
        margin="dense"
        errorMessage={
          errors.location?.address?.message ?? errors.location?.placeId?.message
        }
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
        src={`https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${API_KEY}`}
      />
    </div>
  );
};
