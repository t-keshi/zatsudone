import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { SidebarMenu } from './SidebarMenu';

export const Sidebar: React.VFC = () => (
  <Box position="relative">
    <Box position="fixed" width={280}>
      <Paper variant="outlined">
        <SidebarMenu />
      </Paper>
    </Box>
  </Box>
);
