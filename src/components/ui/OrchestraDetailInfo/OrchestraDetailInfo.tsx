import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { Orchestra } from '../../../containers/api/orchestra/useFetchOrchestra';
import { ListItemRow } from '../../helpers/ListItemRow/ListItemRow';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

interface Props {
  orchestra: Orchestra | undefined;
}

const ROW_WIDTH = 500;

export const OrchestraDetailInfo: React.VFC<Props> = ({ orchestra }) => {
  const news = ['ファゴット募集中！', 'サマーコンサートの受付を開始しました'];

  if (orchestra === undefined) {
    return <CircularProgress />;
  }

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
      <List>
        <ListItemRow
          label="団員数"
          value={orchestra.conductor}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRow
          label="指揮"
          value={orchestra.conductor}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRow
          label="副指揮"
          value={orchestra.subConductor}
          rowWidth={ROW_WIDTH}
        />
        <ListItemRow
          label="公式ホームページ"
          value={orchestra.homePage}
          rowWidth={ROW_WIDTH}
          listItemTextProps={{
            secondaryTypographyProps: {
              component: 'a',
              target: '_blank',
              rel: 'noopener',
              href: orchestra.homePage,
            },
          }}
        />
      </List>
    </div>
  );
};
