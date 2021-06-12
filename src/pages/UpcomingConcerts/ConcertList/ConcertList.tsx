import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ConcertListItem } from '../../../components/helpers/ConcertListItem';
import { useFetchConcerts } from '../../../containers/api/concert/useFetchConcerts';
import { concertListResponse } from './dummy';

export const ConcertList: React.VFC = () => {
  const { data } = useFetchConcerts();
  console.log(data);

  return (
    <>
      {concertListResponse.map((concert, index) => (
        <Fragment key={concert.id}>
          <Box mt={2} />
          {index !== 0 && <Divider />}
          <Box mt={4} />
          <ConcertListItem concert={concert} />
        </Fragment>
      ))}
    </>
  );
};
