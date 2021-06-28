import { Box, CircularProgress, List } from '@material-ui/core';
import React from 'react';
import { Orchestra } from '../../../containers/controllers/orchestra/useFetchOrchestra';
import { ListItemRow } from '../../helpers/ListItemRow/ListItemRow';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

interface Props {
  orchestra: Orchestra | undefined;
}

const ROW_WIDTH = 500;

export const OrchestraDetailInfo: React.VFC<Props> = ({ orchestra }) => {
  if (orchestra === undefined) {
    return <CircularProgress />;
  }

  return (
    <div>
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
