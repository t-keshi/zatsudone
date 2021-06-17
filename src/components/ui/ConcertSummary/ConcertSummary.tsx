import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { TextLabel } from '../../helpers/TextLabel/TextLabel';

interface Props {
  orchestraName: string;
}

export const ConcertSummary: React.VFC<Props> = ({ orchestraName }) => {
  if (orchestraName === undefined) {
    return (
      <div>
        <Skeleton width={200}>
          <TextLabel gutterBottom />
        </Skeleton>
        <Skeleton>
          <Typography variant="h4" paragraph />
        </Skeleton>
        <Skeleton>
          <Typography variant="body1" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div>
      <TextLabel gutterBottom>{orchestraName}</TextLabel>
      <Typography variant="h4" paragraph>
        サマーコンサート
      </Typography>
      <Typography variant="body1">
        団員一同、素晴らしい演奏会になるよう日々練習に励んでいますので、ぜひ会場へ足をお運びください。ホームページより事前受付が必要です
      </Typography>
    </div>
  );
};
