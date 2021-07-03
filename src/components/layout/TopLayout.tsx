import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const TopLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.containerWrapper}>
      <Container maxWidth="lg">
        <div>{children}</div>
      </Container>
    </Box>
  );
};
