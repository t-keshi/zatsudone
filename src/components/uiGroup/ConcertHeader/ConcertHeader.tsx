import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FilterByPrefecture } from '../../ui/FilterByPrefeture/FilterByPrefecture';

interface Props {
  pageTitle: string;
  pageTitleOverline: string;
}

export const ConcertHeader: React.VFC<Props> = ({
  pageTitle,
  pageTitleOverline,
}) => (
  <Box display="flex" alignItems="flex-end">
    <div>
      <Typography variant="overline">{pageTitleOverline}</Typography>
      <Typography variant="h5">{pageTitle}</Typography>
    </div>
    <Box ml="auto">
      <FilterByPrefecture />
    </Box>
  </Box>
);
