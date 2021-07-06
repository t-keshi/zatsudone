import { Box, Container, Hidden, Paper, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { PageTransition } from '../helpers/PageTransition/PageTransition';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

interface Props {
  noPadding?: boolean;
  hasPageTransition?: boolean;
  hideAppBar?: boolean;
}

const drawerWidth = 240;

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
  container: {
    position: 'relative',
    // [theme.breakpoints.up('lg')]: {
    //   margin: theme.spacing(4),
    // },
  },
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

export const Layout: React.FC<Props> = ({
  children,
  noPadding = false,
  hasPageTransition = true,
  hideAppBar = false,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header hideAppBar={hideAppBar} />
      <Box className={classes.containerWrapper}>
        <Container className={classes.container} maxWidth="lg">
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
