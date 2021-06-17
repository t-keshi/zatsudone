import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  containerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const TopLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.containerWrapper}>
        <Container maxWidth="lg">
          <Box p={3}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
};
