import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useDeviceInfo } from '../../../utility/hooks/useDeviceInfo';
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
    '&.isPCFullscreen': {
      height: '100vh',
    },
    '&.isNonPCFullscreen': {
      height: '100vh',
      position: 'fixed',
      backgroundColor: theme.palette.common.black,
      zIndex: 1,
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConcertFlyer: React.VFC<Props> = ({ title, image }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPCFullscreen, togglePCFullscreen] = useToggle(false);
  const [isNonPCFullscreen, toggleNonPCFullscreen] = useToggle(false);
  const device = useDeviceInfo();
  const handleClick = () => {
    if (device === 'pc') {
      togglePCFullscreen(true);
    } else {
      toggleNonPCFullscreen(true);
    }
  };
  const classes = useStyles();

  useFullscreen(ref, isPCFullscreen, {
    onClose: () => togglePCFullscreen(false),
  });

  if (title === undefined) {
    return <Skeleton className={classes.image} variant="rect" />;
  }

  return (
    <div ref={ref}>
      <CardActionArea onClick={() => handleClick()}>
        <img
          className={clsx(
            classes.image,
            isPCFullscreen && 'isPCFullscreen',
            isNonPCFullscreen && 'isNonPcFullscreen',
          )}
          alt={`${title}-flyer`}
          src={image}
        />
      </CardActionArea>
    </div>
  );
};
