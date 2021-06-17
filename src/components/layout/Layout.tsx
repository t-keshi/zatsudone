import { Box, Container, Hidden, Paper, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { PageTransition } from '../helpers/PageTransition/PageTransition';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  containerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    margin: theme.spacing(3, 0),
    columnGap: theme.spacing(3),
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

interface Props {
  noPadding?: boolean;
  hasPageTransition?: boolean;
}

export const Layout: React.FC<Props> = (props) => {
  const { children, noPadding = false, hasPageTransition = false } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.containerWrapper}>
        <Container maxWidth="lg">
          <Toolbar />
          <Box className={classes.main}>
            <Box className={classes.content}>
              <PageTransition hasPageTransition={hasPageTransition}>
                <Paper variant="outlined">
                  {noPadding ? (
                    children
                  ) : (
                    <Container maxWidth={false}>
                      <Box py={2}>{children}</Box>
                    </Container>
                  )}
                </Paper>
              </PageTransition>
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
