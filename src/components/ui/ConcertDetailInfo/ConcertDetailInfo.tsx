import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Event, LocationOn, Schedule } from '@material-ui/icons';
import { format } from 'date-fns';
import React from 'react';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

interface Props {
  date: Date;
  location: string;
  openAt: Date;
  startAt: Date;
  closeAt: Date;
}

export const ConcertDetailInfo: React.VFC<Props> = ({
  date,
  openAt,
  startAt,
  closeAt,
}) => (
  <div>
    <SubHeading variant="h5" paragraph>
      コンサート情報
    </SubHeading>
    <List>
      <ListItem dense>
        <ListItemIcon>
          <Event fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary={format(date, 'yyyy/MM/dd')} />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <Schedule fontSize="small" />
        </ListItemIcon>
        <ListItemText
          secondary={`${format(openAt, 'HH:mm')} 開場（${format(
            new Date(startAt),
            'HH:mm',
          )}  開演）`}
        />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <Schedule fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary={`${format(closeAt, 'HH:mm')} 終演予定`} />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <LocationOn fontSize="small" />
        </ListItemIcon>
        <ListItemText secondary="兵庫県尼崎市あましんアルカイックホール" />
      </ListItem>
    </List>
  </div>
);
