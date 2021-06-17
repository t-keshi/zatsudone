import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/uiGroup/ConcertList/ConcertList';
import { ContentHeader } from '../components/uiGroup/ContentHeader/ContentHeader';
import { useFetchConcerts } from '../containers/api/concert/useFetchConcerts';
import { useTitle } from '../utility/hooks/useTitle';

export const ConcertsRecent: React.VFC = () => {
  useTitle('SymphonyForum | 新着のコンサート');
  const { data } = useFetchConcerts();

  return (
    <Layout>
      <ContentHeader
        pageTitle="近日中のコンサート"
        pageTitleOverline="UPCOMING CONCERTS"
        hasFilter
      />
      <Box mt={3} />
      <ConcertList concerts={data?.concerts} />
    </Layout>
  );
};
