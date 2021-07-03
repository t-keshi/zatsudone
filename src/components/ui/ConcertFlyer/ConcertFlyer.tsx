import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import React, { useRef } from 'react';
import { useFullscreen } from '../../../utility/hooks/useFullscreen';
import { useToggle } from '../../../utility/hooks/useToggle';

interface Props {
  title: string | undefined;
  image: string | undefined;
}

interface StyleProps {
  isFullscreen: boolean;
}

const FLYER_HEIGHT = 500;

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: ({ isFullscreen }: StyleProps) =>
      isFullscreen ? '100vh' : FLYER_HEIGHT,
    width: '100%',
    contentVisibility: 'auto',
    containIntrinsicSize: FLYER_HEIGHT,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConcertFlyer: React.VFC<Props> = ({ title, image }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });
  const classes = useStyles({ isFullscreen });

  if (title === undefined) {
    return <Skeleton className={classes.image} variant="rect" />;
  }

  return (
    <div ref={ref}>
      <CardActionArea onClick={() => toggle()}>
        <img className={classes.image} alt={`${title}-flyer`} src={image} />
      </CardActionArea>
    </div>
  );
};
