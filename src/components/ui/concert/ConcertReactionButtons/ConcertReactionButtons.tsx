import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EventAvailable } from '@material-ui/icons/';
import React from 'react';
import { useToggleFavorite } from '../../../../containers/controllers/concert/useToggleFavorite';
import { useParticipateConcert } from '../../../../containers/controllers/participation/useParticipateConcert';
import { ConcertType } from '../../../../types';
import { LikeIconButton } from '../../../helpers/LikeIconButton/LikeIconButton';

interface Props {
  isUserLike: boolean;
  likesCount: number;
  isUserParticipants: boolean;
  participantsCount: number;
  concert: ConcertType;
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
  isUserParticipants,
  participantsCount,
  concert,
}) => {
  const classes = useStyles();
  const isFooterLayout = useMediaQuery('(max-width:1200px)');
  const { mutate } = useToggleFavorite();
  const { mutate: participate } = useParticipateConcert();

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
              <Tooltip title="来場予定">
                <IconButton
                  className={classes.iconButton}
                  color={isUserParticipants ? 'primary' : 'default'}
                  onClick={() =>
                    participate({
                      concert,
                      toggle: isUserParticipants ? 'remove' : 'add',
                    })
                  }
                >
                  <EventAvailable />
                </IconButton>
              </Tooltip>
              <Typography variant="caption">{participantsCount}</Typography>
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
        <Tooltip title="来場予定">
          <IconButton
            className={classes.iconButton}
            color={isUserParticipants ? 'primary' : 'default'}
            onClick={() =>
              participate({
                concert,
                toggle: isUserParticipants ? 'remove' : 'add',
              })
            }
          >
            <EventAvailable />
          </IconButton>
        </Tooltip>
        <Typography variant="caption">{participantsCount}</Typography>
      </div>
    </div>
  );
};
