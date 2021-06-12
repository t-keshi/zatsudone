import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../utility/hooks/useTitle';
import { ConcertList } from './ConcertList/ConcertList';
import { ContentHeader } from './ContentHeader/ContentHeader';

export const RecentConcerts: React.VFC = () => {
  useTitle('SymphonyForum | 新着のコンサート');

  return (
    <Layout>
      <ContentHeader />
      <Box mt={3} />
      <ConcertList />
    </Layout>
  );
};
