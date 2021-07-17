import { Box, Container, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { PageTransition } from '../helpers/PageTransition/PageTransition';
import { ResponsivePaper } from '../helpers/ResponsivePaper.tsx/ResponsivePaper';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

interface Props {
  noPadding?: boolean;
  hasPageTransition?: boolean;
  hideAppBar?: boolean;
}

const DRAWER_WIDTH = 240;

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
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
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
                <ResponsivePaper breakpoint="xs" variant="outlined">
                  {noPadding ? (
                    children
                  ) : (
                    <Container maxWidth={false}>
                      <Box py={2}>{children}</Box>
                    </Container>
                  )}
                </ResponsivePaper>
              </PageTransition>
            </Box>
            <Hidden xsDown implementation="css">
              <Box className={classes.sidebar}>
                <Sidebar />
              </Box>
            </Hidden>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
