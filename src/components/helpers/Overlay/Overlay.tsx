import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: theme.zIndex.overlay,
    opacity: 0.3,
    backgroundColor: theme.palette.grey[900],
  },
}));

export const Overlay: React.VFC = () => {
  const classes = useStyles();

  return <div className={classes.overlay} />;
};
