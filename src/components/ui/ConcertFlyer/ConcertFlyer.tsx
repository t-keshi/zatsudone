import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useFullscreen } from '../../../utility/hooks/useFullscreen';
import { useToggle } from '../../../utility/hooks/useToggle';

interface Props {
  title: string | undefined;
  image: string | undefined;
}

const FLYER_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: 'contain',
    height: FLYER_HEIGHT,
    width: '100%',
    contentVisibility: 'auto',
    containIntrinsicSize: FLYER_HEIGHT,
    '& .isFullscreen': {
      height: '100vh',
      position: 'fixed',
      backgroundColor: theme.palette.common.black,
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConcertFlyer: React.VFC<Props> = ({ title, image }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });
  const classes = useStyles();

  if (title === undefined) {
    return <Skeleton className={classes.image} variant="rect" />;
  }

  return (
    <div ref={ref}>
      <CardActionArea onClick={() => toggle()}>
        <img
          className={clsx(classes.image, isFullscreen && 'isFullscreen')}
          alt={`${title}-flyer`}
          src={image}
        />
      </CardActionArea>
    </div>
  );
};
