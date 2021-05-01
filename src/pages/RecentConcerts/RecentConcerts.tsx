import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ConcertList } from './ConcertList/ConcertList';
import { ContainerHeader } from './ContainerHeader/ContainerHeader';

export const RecentConcerts: React.VFC = () => {
  useTitle('SymphonyForum | 新着のコンサート');

  return (
    <Layout>
      <Box p={3}>
        <ContainerHeader />
        <Box mt={3} />
        <ConcertList />
      </Box>
    </Layout>
  );
};
