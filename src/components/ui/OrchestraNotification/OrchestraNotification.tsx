import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

export const OrchestraNotification: React.VFC = () => {
  const news = ['ファゴット募集中！', 'サマーコンサートの受付を開始しました'];

  return (
    <div>
      <SubHeading variant="h5" gutterBottom>
        お知らせ
      </SubHeading>
      <List>
        {news.map((newsItem) => (
          <ListItem dense key={newsItem}>
            <ListItemText primary={newsItem} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
