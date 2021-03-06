import { Avatar, Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Overlay } from '../Overlay/Overlay';

interface StyleProps {
  hasRadiusTop?: boolean;
}

interface Props extends StyleProps {
  title: string;
  image: string;
  avatar?: string;
  editModal?: () => void;
  editLabel?: string;
}

const COVER_IMAGE_HEIGHT = 320;

const useStyles = makeStyles((theme) => ({
  image: {
    height: COVER_IMAGE_HEIGHT,
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    background: 'center/cover no-repeat',
    contentVisibility: 'auto',
    containIntrinsicSize: COVER_IMAGE_HEIGHT,
    [theme.breakpoints.up('sm')]: {
      borderRadius: ({ hasRadiusTop }: StyleProps) =>
        hasRadiusTop
          ? `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
          : 0,
    },
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 100,
    width: '100%',
    zIndex: theme.zIndex.overlay + 1,
    opacity: 0.9,
    backgroundImage:
      'linear-gradient(to top, #000000, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0))',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-end',
    columnGap: theme.spacing(1),
  },
  title: {
    color: theme.palette.common.white,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  editButton: {
    color: theme.palette.common.white,
    position: 'absolute',
    zIndex: theme.zIndex.overlay + 1,
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  },
}));

export const CoverImage: React.VFC<Props> = ({
  hasRadiusTop = false,
  title,
  image,
  avatar,
  editModal,
  editLabel = 'カバー写真を変更',
}) => {
  const classes = useStyles({ hasRadiusTop });

  if (title === undefined || image === undefined) {
    return <Skeleton className={classes.image} variant="rect" />;
  }

  return (
    <Box position="relative">
      <img className={classes.image} src={image} alt={title} />
      <div className={classes.titleWrapper}>
        {Boolean(avatar) && (
          <Avatar className={classes.avatar} src={avatar} alt="avatar" />
        )}
        <Typography className={classes.title} variant="h4" display="block">
          {title}
        </Typography>
      </div>
      {Boolean(editModal) && (
        <>
          <Overlay />
          <Button
            className={classes.editButton}
            variant="text"
            startIcon={<Image color="inherit" />}
            onClick={editModal}
          >
            {editLabel}
          </Button>
        </>
      )}
    </Box>
  );
};
