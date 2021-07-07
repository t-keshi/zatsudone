import { Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { ROUTE_PATHS } from '../routes/type';
import { useTimeoutFn } from '../utility/hooks/useTimeoutFn';

export const NotFound404: React.VFC = () => {
  const history = useHistory();
  useTimeoutFn(() => history.push(ROUTE_PATHS.ランディングページ), 5000);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        ページが見つかりません
      </Typography>
      <Typography variant="body2">
        5秒後にトップページにジャンプします
      </Typography>
    </>
  );
};
