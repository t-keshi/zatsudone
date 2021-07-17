import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ConcertsResponse } from '../../../types';
import { ConcertListItem } from './ConcertListItem';

interface Props {
  concerts: ConcertsResponse['concerts'] | undefined;
  isFirst?: boolean;
}

export const ConcertList: React.VFC<Props> = ({ concerts, isFirst = true }) => {
  if (concerts === undefined) {
    return (
      <>
        <Box mt={3.5} />
        <ConcertListItem concert={undefined} />
      </>
    );
  }

  return (
    <>
      {concerts.map((concert, index) => (
        <Fragment key={concert.id}>
          <Box mt={1} mb={2.5}>
            {!(isFirst && index === 0) && <Divider />}
          </Box>
          <ConcertListItem concert={concert} />
        </Fragment>
      ))}
    </>
  );
};
