import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FilterByPrefecture } from '../../../components/ui/FilterByPrefecture';

export const ContainerHeader: React.VFC = () => (
  <Box display="flex" alignItems="flex-end">
    <div>
      <Typography variant="overline">RECENT CONCERTS</Typography>
      <Typography variant="h5"> 新着のコンサート</Typography>
    </div>
    <Box ml="auto">
      <FilterByPrefecture />
    </Box>
  </Box>
);
