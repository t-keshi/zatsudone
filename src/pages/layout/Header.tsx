import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    padding: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              zatsudone
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
