import { Box, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { PageTransition } from '../../components/helpers/PageTransition/PageTransition';
import { ResponsivePaper } from '../../components/helpers/ResponsivePaper.tsx/ResponsivePaper';
import { Header } from './Header';
import { Sidebar } from './member/Sidebar';

const DRAWER_WIDTH = 380;

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

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.containerWrapper}>
        <Container className={classes.container} maxWidth="lg">
          <Toolbar />
          <Box className={classes.main}>
            <Box className={classes.content}>
              <PageTransition hasPageTransition={false}>
                <ResponsivePaper breakpoint="xs" variant="outlined">
                  <Container maxWidth={false}>
                    <Box py={2}>{children}</Box>
                  </Container>
                </ResponsivePaper>
              </PageTransition>
            </Box>
            <Box className={classes.sidebar}>
              <Sidebar />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
