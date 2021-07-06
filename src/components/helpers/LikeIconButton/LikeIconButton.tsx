import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { useMemo } from 'react';
import Lottie, { EventListener } from 'react-lottie';
import animationData from '../../../assets/animation/congratulations.json';
import { useToggle } from '../../../utility/hooks/useToggle';

interface Props {
  isLike: boolean;
  toggleIsLike: () => void;
}

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.custom.favorite,
  },
  iconButton: {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export const LikeIconButton: React.VFC<Props & IconButtonProps> = ({
  isLike,
  toggleIsLike,
  ...rest
}) => {
  const classes = useStyles();
  const { size } = rest;
  const lottieSize = useMemo(() => {
    switch (size) {
      case 'medium':
        return 48;
      case 'small':
        return 40;
      default:
        return 48;
    }
  }, [size]);
  const [isAnimating, setIsAnimating] = useToggle(false);
  const eventListeners: ReadonlyArray<EventListener> = [
    {
      eventName: 'complete',
      callback: () => setIsAnimating(false),
    },
  ];
  const onClick = () => {
    if (isLike) {
      toggleIsLike();
    } else {
      toggleIsLike();
      setIsAnimating(true);
    }
  };
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const lottieStyle: React.CSSProperties = {
    position: 'absolute',
  };

  return (
    <Tooltip title="like">
      <IconButton
        classes={{ root: classes.iconButton, colorPrimary: classes.primary }}
        color={isLike ? 'primary' : 'default'}
        onClick={onClick}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        <Lottie
          options={defaultOptions}
          height={lottieSize}
          width={lottieSize}
          isStopped={!isAnimating}
          eventListeners={eventListeners}
          style={lottieStyle}
        />
        {isLike ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};
