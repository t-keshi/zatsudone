import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

export const TopLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Container maxWidth="lg">
          <Box p={3}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
};
