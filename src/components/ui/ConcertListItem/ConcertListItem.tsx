import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Event, LocationOn, QueueMusic } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';
import musicNote from '../../../assets/musicNote.png';
import { ROUTE_PATHS } from '../../../routes/type';
import { Concert } from '../../../type';
import { StyledLink } from '../../helpers/StyledLink/StyledLink';

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: 120,
    width: 120,
  },
  icon: {
    minWidth: 32,
  },
}));

interface Props {
  concert: Concert;
}

export const ConcertListItem: React.VFC<Props> = ({ concert }) => {
  const classes = useStyles();

  return (
    <Box display="flex" style={{ columnGap: '24px' }}>
      <Hidden xsDown implementation="css">
        <img className={classes.image} alt="musicNote" src={musicNote} />
      </Hidden>
      <Box>
        <Box
          bgcolor="primary.main"
          display="inline-flex"
          paddingRight="8px"
          paddingLeft="8px"
          mb={1}
        >
          <Typography variant="button" display="block">
            {concert.orchestra.name}
          </Typography>
        </Box>
        <Typography
          component={StyledLink}
          to={ROUTE_PATHS.コンサート詳細}
          variant="h6"
          color="textPrimary"
          underline="always"
          display="block"
        >
          サマーコンサート
        </Typography>
        <List>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <Event fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary={format(concert.date, 'yyyy/MM/dd')} />
          </ListItem>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <LocationOn fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary="兵庫県尼崎市あましんアルカイックホール" />
          </ListItem>
          <ListItem dense>
            <ListItemIcon className={classes.icon}>
              <QueueMusic fontSize="small" />
            </ListItemIcon>
            <ListItemText secondary="ドラゴンの年、宇宙の音楽　他" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
