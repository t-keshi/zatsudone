import { IconButton, IconButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { useMemo } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../assets/animation/congratulations.json';
import { useToggle } from '../../../utility/hooks/useToggle';

const FAVORITE_COLOR = '#E0255E';

const useStyles = makeStyles(() => ({
  primary: {
    color: FAVORITE_COLOR,
  },
}));

export const ProfileForm: React.VFC<IconButtonProps> = (props) => {
  const classes = useStyles();
  const { size } = props;
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
  const [isFavorite, setIsFavorite] = useToggle(false);
  const [isAnimating, setIsAnimating] = useToggle(false);
  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setIsAnimating(false);
    } else {
      setIsFavorite(true);
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
    <IconButton
      classes={{ colorPrimary: classes.primary }}
      color={isFavorite ? 'primary' : 'default'}
      onClick={toggleFavorite}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Lottie
        options={defaultOptions}
        height={lottieSize}
        width={lottieSize}
        isStopped={!isAnimating}
        style={lottieStyle}
      />
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};
