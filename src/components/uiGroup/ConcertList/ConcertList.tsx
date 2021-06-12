import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useFetchConcerts } from '../../../containers/api/concert/useFetchConcerts';
import { ConcertsResponse } from '../../../types';

interface Props {
  concerts: ConcertsResponse['concerts'];
}

export const ConcertList: React.VFC<Props> = ({ concerts }) => {
  const { data } = useFetchConcerts();
  console.log(data);

  return (
    <>
      {concerts.map((concert, index) => (
        <Fragment key={concert.id}>
          <Box mt={2} />
          {index !== 0 && <Divider />}
          <Box mt={4} />
          {/* <ConcertListItem concert={concert} /> */}
        </Fragment>
      ))}
    </>
  );
};
