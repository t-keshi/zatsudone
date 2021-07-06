import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EventAvailable } from '@material-ui/icons/';
import React from 'react';
import { useToggleFavorite } from '../../../containers/controllers/concert/useToggleFavorite';
import { LikeIconButton } from '../../helpers/LikeIconButton/LikeIconButton';

interface Props {
  isUserLike: boolean;
  likesCount: number;
}

const useStyles = makeStyles((theme) => ({
  footerLayoutRoot: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  reactionButtons: {
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(1),
  },
  iconButton: {
    border: `1px solid ${theme.palette.divider}`,
  },
  sideLayoutRoot: {
    position: 'absolute',
    top: 200,
    left: -40,
    height: '90%',
  },
  sticky: {
    position: 'sticky',
    display: 'flex',
    top: 100,
    left: 0,
    rowGap: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const ConcertReactionButtons: React.VFC<Props> = ({
  isUserLike,
  likesCount,
}) => {
  const classes = useStyles();
  const { mutate } = useToggleFavorite();
  const isFooterLayout = useMediaQuery('(max-width:1200px)');

  if (isFooterLayout) {
    return (
      <AppBar
        position="fixed"
        color="primary"
        className={classes.footerLayoutRoot}
      >
        <Toolbar>
          <Container maxWidth="lg">
            <div className={classes.reactionButtons}>
              <LikeIconButton
                isLike={isUserLike}
                toggleIsLike={() => mutate()}
              />
              <Typography variant="caption">{likesCount}</Typography>
              <Box ml={2} />
              <IconButton className={classes.iconButton}>
                <EventAvailable />
              </IconButton>
              <Typography variant="caption">23</Typography>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <div className={classes.sideLayoutRoot}>
      <div className={classes.sticky}>
        <LikeIconButton isLike={isUserLike} toggleIsLike={() => mutate()} />
        <Typography variant="caption">{likesCount}</Typography>
        <Box mt={2} />
        <IconButton className={classes.iconButton}>
          <EventAvailable />
        </IconButton>
        <Typography variant="caption">23</Typography>
      </div>
    </div>
  );
};
