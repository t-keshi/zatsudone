import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@material-ui/core';
import { LocationOn, Event, Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { format } from 'date-fns';
import musicNote from '../../../assets/musicNote.png';
import { concertResponse } from './dummy';
import { TypographyWithLabel } from '../../../components/ui/TypographyWithLabel';
import { Prefecture } from '../../../constants/prefectures';

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: 500,
    width: '100%',
  },
}));

interface Props {
  detail: {
    prefecture: Prefecture;
    location: string;
    date: Date;
    startAt: string;
    openAt: string;
    closeAt: string;
  };
}

export const ConcertDetailInfo: React.VFC<Props> = ({ detail }) => {
  const classes = useStyles();

  return (
    <Box>
      <img className={classes.image} alt="musicNote" src={musicNote} />
      <Container maxWidth={false}>
        <Box py={2}>
          <Box
            bgcolor="primary.main"
            display="inline-flex"
            paddingRight="8px"
            paddingLeft="8px"
            mb={2}
          >
            <Typography variant="button" display="block">
              {concertResponse.orchestra.name}
            </Typography>
          </Box>
          <Typography variant="h4" paragraph>
            サマーコンサート
          </Typography>
          <Typography variant="body1">
            団員一同、素晴らしい演奏会になるよう日々練習に励んでいますので、ぜひ会場へ足をお運びください。ホームページより事前受付が必要です
          </Typography>
          <Box mt={5} />
          <TypographyWithLabel variant="h5" paragraph>
            コンサート情報
          </TypographyWithLabel>
          <List>
            <ListItem dense>
              <ListItemIcon>
                <Event fontSize="small" />
              </ListItemIcon>
              <ListItemText secondary={format(detail.date, 'yyyy/MM/dd')} />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <Schedule fontSize="small" />
              </ListItemIcon>
              <ListItemText
                secondary={`${detail.openAt} 開場（${detail.startAt} 開演）`}
              />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <Schedule fontSize="small" />
              </ListItemIcon>
              <ListItemText secondary={`${detail.closeAt} 終演予定`} />
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <LocationOn fontSize="small" />
              </ListItemIcon>
              <ListItemText secondary="兵庫県尼崎市あましんアルカイックホール" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
};
