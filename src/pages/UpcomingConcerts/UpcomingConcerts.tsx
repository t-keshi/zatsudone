import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { ConcertList } from '../../components/uiGroup/ConcertList/ConcertList';
import { ContentHeader } from '../../components/uiGroup/ContentHeader/ContentHeader';
import { useFetchConcerts } from '../../containers/api/concert/useFetchConcerts';
import { useTitle } from '../../utility/hooks/useTitle';

export const UpcomingConcerts: React.VFC = () => {
  useTitle('SymphonyForum | 近日中のコンサート');
  const { isLoading, data } = useFetchConcerts();

  if (isLoading) return <CircularProgress />;

  return (
    <Layout hasPageTransition>
      <ContentHeader
        pageTitle="近日中のコンサート"
        pageTitleOverline="UPCOMING CONCERTS"
        hasFilter
      />
      <Box mt={3} />
      {data !== undefined && <ConcertList concerts={data.concerts} />}
    </Layout>
  );
};
