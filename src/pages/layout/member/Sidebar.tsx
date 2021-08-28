import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SidebarMenu } from './SidebarMenu';

const SIDEBAR_WIDTH = 540;

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  sidebar: {
    position: 'fixed',
    width: SIDEBAR_WIDTH,
  },
}));

export const Sidebar: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>
        <Paper variant="outlined">
          <SidebarMenu />
        </Paper>
      </Box>
    </Box>
  );
};
