import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  isBlack?: boolean;
}

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: theme.zIndex.overlay,
    opacity: 0.3,
    backgroundColor: ({ isBlack }: Props) =>
      isBlack ? theme.palette.grey[900] : theme.palette.grey[100],
  },
}));

export const Overlay: React.VFC<Props> = ({ isBlack = true }) => {
  const classes = useStyles({ isBlack });

  return <div className={classes.overlay} />;
};
