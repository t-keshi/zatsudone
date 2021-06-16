import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FilterByPrefecture } from '../../ui/FilterByPrefeture/FilterByPrefecture';

interface Props {
  pageTitle: string;
  pageTitleOverline: string;
  hasFilter?: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  filterWrapper: {
    marginLeft: 'auto',
  },
}));

export const ContentHeader: React.VFC<Props> = ({
  pageTitle,
  pageTitleOverline,
  hasFilter,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div>
        <Typography variant="overline">{pageTitleOverline}</Typography>
        <Typography variant="h5">{pageTitle}</Typography>
      </div>
      {hasFilter && (
        <Box className={classes.filterWrapper}>
          <FilterByPrefecture />
        </Box>
      )}
    </Box>
  );
};
