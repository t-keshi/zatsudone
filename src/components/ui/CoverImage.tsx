import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import orchestraCover from '../../assets/orchestraCover.jpg';

interface Props {
  isTopImage?: boolean;
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 320,
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: (props: Props) =>
      props.isTopImage
        ? `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
        : 0,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 100,
    width: '100%',
    zIndex: 1,
    opacity: 0.9,
    backgroundImage:
      'linear-gradient(to top, #000000, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0))',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-end',
  },
  orchestraName: {
    color: theme.palette.common.white,
  },
}));

export const CoverImage: React.VFC<Props> = ({ isTopImage = true }) => {
  const classes = useStyles({ isTopImage });

  return (
    <Box position="relative">
      <img className={classes.image} src={orchestraCover} alt="cover" />
      <div className={classes.shadow}>
        <Typography
          className={classes.orchestraName}
          variant="h4"
          display="block"
        >
          大阪大学吹奏楽団
        </Typography>
      </div>
    </Box>
  );
};
