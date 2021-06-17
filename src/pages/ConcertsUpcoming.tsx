import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { useFetchConcerts } from '../containers/api/concert/useFetchConcerts';
import { useTitle } from '../utility/hooks/useTitle';

export const ConcertsUpcoming: React.VFC = () => {
  useTitle('SymphonyForum | 近日中のコンサート');
  const { data } = useFetchConcerts();

  return (
    <Layout hasPageTransition>
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
