import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ConcertsResponse } from '../../../types';
import { ConcertListItem } from '../../ui/ConcertListItem/ConcertListItem';

interface Props {
  concerts: ConcertsResponse['concerts'];
}

export const ConcertList: React.VFC<Props> = ({ concerts }) => (
  <>
    {concerts.map((concert, index) => (
      <Fragment key={concert.id}>
        <Box mt={2} />
        {index !== 0 && <Divider />}
        <Box mt={4} />
        <ConcertListItem concert={concert} />
      </Fragment>
    ))}
  </>
);
