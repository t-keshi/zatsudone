import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { OrchestraListItem } from '../../../components/ui/OrchestraListItem/OrchestraListItem';
import { orchestraListResponse } from './dummy';

export const OrchestraList: React.VFC = () => (
  <>
    {orchestraListResponse.map((orchestra, index) => (
      <Fragment key={orchestra.id}>
        <Box mt={2} />
        {index !== 0 && <Divider />}
        <Box mt={4} />
        <OrchestraListItem orchestra={orchestra} />
      </Fragment>
    ))}
  </>
);
