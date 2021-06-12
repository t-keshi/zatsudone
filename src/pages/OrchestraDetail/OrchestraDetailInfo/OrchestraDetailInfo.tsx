import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SubHeading } from '../../../components/helpers/SubHeading/SubHeading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(4),
    columnGap: theme.spacing(5),
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  listItem: {
    display: 'inline-flex',
  },
  label: {
    width: '50%',
  },
  valueText: {
    width: '50%',
  },
}));

export const OrchestraDetailInfo: React.VFC = () => {
  const classes = useStyles();
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
      <Box mt={2} />
      <SubHeading variant="h5" gutterBottom>
        楽団情報詳細
      </SubHeading>
      <Box maxWidth={500}>
        <List>
          <ListItem dense>
            <ListItemText
              classes={{
                root: classes.listItem,
                primary: classes.label,
                secondary: classes.valueText,
              }}
              primary="団員数"
              secondary="142名"
            />
          </ListItem>
          <ListItem dense>
            <ListItemText
              classes={{
                root: classes.listItem,
                primary: classes.label,
                secondary: classes.valueText,
              }}
              primary="指揮"
              secondary="142名"
            />
          </ListItem>
          <ListItem dense>
            <ListItemText
              classes={{
                root: classes.listItem,
                primary: classes.label,
                secondary: classes.valueText,
              }}
              primary="副指揮"
              secondary="142名"
            />
          </ListItem>
          <ListItem dense>
            <ListItemText
              classes={{
                root: classes.listItem,
                primary: classes.label,
                secondary: classes.valueText,
              }}
              primary="公式ホームページ"
              secondary="https://google.com"
              secondaryTypographyProps={{
                component: 'a',
                target: '_blank',
                rel: 'noopener',
                href: 'https://google.com',
              }}
            />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};
