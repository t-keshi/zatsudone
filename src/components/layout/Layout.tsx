import { Box, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Header } from './Header/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

interface Props {
  isShowHeader?: boolean;
}

export const Layout: React.FC<Props> = ({ children, isShowHeader = true }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {isShowHeader && <Header />}
      <Box display="flex" justifyContent="center">
        <Container maxWidth="lg">
          <Toolbar />
          <Box>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
};
