import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

interface Props {
  title: string | undefined;
  image: string | undefined;
}

const FLYER_HEIGHT = 500;

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: FLYER_HEIGHT,
    width: '100%',
    contentVisibility: 'auto',
    containIntrinsicSize: FLYER_HEIGHT,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConcertFlyer: React.VFC<Props> = ({ title, image }) => {
  const classes = useStyles();

  if (title === undefined) {
    return <Skeleton className={classes.image} variant="rect" />;
  }

  return <img className={classes.image} alt={`${title}-flyer`} src={image} />;
};
