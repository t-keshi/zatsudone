import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@material-ui/icons';
import React from 'react';

interface StyleProps {
  hasRadiusTop?: boolean;
}

interface Props extends StyleProps {
  title: string;
  image: string;
  editModal?: () => void;
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 320,
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    background: 'center/cover no-repeat',
    borderRadius: ({ hasRadiusTop }: StyleProps) =>
      hasRadiusTop
        ? `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
        : 0,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 100,
    width: '100%',
    zIndex: 10,
    opacity: 0.9,
    backgroundImage:
      'linear-gradient(to top, #000000, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0))',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-end',
  },
  title: {
    color: theme.palette.common.white,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    opacity: 0.3,
    backgroundColor: theme.palette.grey[900],
  },
  editButton: {
    color: theme.palette.common.white,
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  },
}));

export const CoverImage: React.VFC<Props> = (props) => {
  const { hasRadiusTop = false, title, image, editModal } = props;
  const classes = useStyles({ hasRadiusTop });

  return (
    <Box position="relative">
      <img className={classes.image} src={image} alt={title} />
      <div className={classes.titleWrapper}>
        <Typography className={classes.title} variant="h4" display="block">
          {title}
        </Typography>
      </div>
      {/* edit start */}
      <div className={classes.overlay} />
      {Boolean(editModal) && (
        <Button
          className={classes.editButton}
          variant="text"
          startIcon={<Image color="inherit" />}
          onClick={editModal}
        >
          カバー写真を変更
        </Button>
      )}
      {/* edit end */}
    </Box>
  );
};
