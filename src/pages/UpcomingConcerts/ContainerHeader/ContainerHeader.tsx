import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FilterByPrefecture } from '../../../components/ui/FilterByPrefecture';

export const ContainerHeader: React.VFC = () => (
  <Box display="flex" alignItems="flex-end">
    <div>
      <Typography variant="overline">UPCOMING CONCERTS</Typography>
      <Typography variant="h5"> 近日中のコンサート</Typography>
    </div>
    <Box ml="auto">
      <FilterByPrefecture />
    </Box>
  </Box>
);
