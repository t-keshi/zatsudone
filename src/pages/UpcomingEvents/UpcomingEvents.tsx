import { Typography } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';

export const UpcomingEvents: React.VFC = () => {
  useTitle('SymphonyForum | 近日中のイベント');

  return (
    <Layout>
      <Typography variant="overline">UPCOMING EVENTS</Typography>
      <Typography variant="h6"> 近日中のイベント</Typography>
    </Layout>
  );
};
