import { Container, ContainerProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Div100vh from 'react-div-100vh';

interface Props {
  maxWidth?: ContainerProps['maxWidth'];
}

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
  container: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

export const TopLayout: React.FC<Props> = ({ children, maxWidth = 'lg' }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Div100vh className={classes.containerWrapper}>
        <Container className={classes.container} maxWidth={maxWidth}>
          <div>{children}</div>
        </Container>
      </Div100vh>
    </div>
  );
};
