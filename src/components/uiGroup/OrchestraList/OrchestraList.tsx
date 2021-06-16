import { Box, Divider } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Orchestra } from '../../../type';
import { OrchestraListItem } from '../../ui/OrchestraListItem/OrchestraListItem';

export const orchestraListResponse: Orchestra[] = [
  {
    id: 1,
    name: '大阪大学吹奏楽団',
  },
  {
    id: 2,
    name: '大阪大学吹奏楽団',
  },
  {
    id: 3,
    name: '大阪大学吹奏楽団',
  },
];

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
