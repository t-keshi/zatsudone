import { Divider, Box } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ConcertListItem } from '../../../components/ui/ConcertListItem';
import { concertListResponse } from './dummy';

export const ConcertList: React.VFC = () => (
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
