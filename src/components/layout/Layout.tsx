import { Box, Container, Hidden, Paper, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
  },
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      <Box display="flex" justifyContent="center">
        <Container maxWidth="lg">
          <Toolbar />
          <Box display="flex" my={3} style={{ columnGap: '24px' }}>
            <Box className={classes.content}>
              <Paper variant="outlined">{children}</Paper>
            </Box>
            <Box className={classes.sidebar}>
              <Hidden xsDown implementation="css">
                <Sidebar />
              </Hidden>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
