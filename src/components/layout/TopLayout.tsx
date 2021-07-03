import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Div100vh from 'react-div-100vh';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  containerWrapper: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const TopLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Div100vh className={classes.containerWrapper}>
        <Container maxWidth="lg">
          <div>{children}</div>
        </Container>
      </Div100vh>
    </div>
  );
};
