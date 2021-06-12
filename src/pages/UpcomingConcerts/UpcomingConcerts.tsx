import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ConcertList } from './ConcertList/ConcertList';
import { ContentHeader } from './ContentHeader/ContentHeader';

export const UpcomingConcerts: React.VFC = () => {
  useTitle('SymphonyForum | 近日中のコンサート');

  return (
    <Layout hasPageTransition>
      <ContentHeader />
      <Box mt={3} />
      <ConcertList />
    </Layout>
  );
};
