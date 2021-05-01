import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { AccountBox, LocationOn, QueueMusic } from '@material-ui/icons';
import { format } from 'date-fns';
import musicNote from '../../assets/musicNote.png';
import { Concert } from '../../type';

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: 120,
    width: 120,
  },
}));

interface Props {
  concert: Concert;
}

export const ConcertListItem: React.VFC<Props> = ({ concert }) => {
  const classes = useStyles();

  return (
    <Box display="flex" style={{ columnGap: '24px' }}>
      <img className={classes.image} alt="musicNote" src={musicNote} />
      <Box>
        <Box
          bgcolor="primary.main"
          display="inline-flex"
          paddingRight="8px"
          paddingLeft="8px"
          mb={1}
        >
          <Typography variant="button" display="block">
            {format(concert.date, 'yyyy/MM/dd')}
          </Typography>
        </Box>
        <Typography variant="h6">サマーコンサート</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="大阪大学吹奏楽団" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>
            <ListItemText primary="ドラゴンの年、宇宙の音楽　他" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText primary="兵庫県尼崎市あましんアルカイックホール" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
