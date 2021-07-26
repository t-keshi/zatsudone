import { Box } from '@material-ui/core';
import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { Layout } from '../components/layout/Layout';
import { ConcertAccessForm } from '../components/ui/concert/ConcertAccess/ConcertAccessForm';
import { ConcertDetailInfoForm } from '../components/ui/concert/ConcertDetailInfo/ConcertDetailInfoForm';
import { ConcertFlayerForm } from '../components/ui/concert/ConcertFlyer/ConcertFlayerForm';
import { ConcertProgramForm } from '../components/ui/concert/ConcertProgram/ConcertProgramForm';
import { ConcertSummaryForm } from '../components/ui/concert/ConcertSummary/ConcertSummaryForm';
import { useFetchConcert } from '../containers/controllers/concert/useFetchConcert';
import { useTitle } from '../utility/hooks/useTitle';

export const ConcertEdit: React.VFC = () => {
  const { data } = useFetchConcert();

  useTitle('SymphonyForum | コンサート編集');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="コンサート編集"
          pageTitleOverline="CONCERT EDIT"
        />
      </ContainerSpacer>
      <ConcertFlayerForm name="" coverImage="" orchestraId="" />
      <ContainerSpacer my={4}>
        {data && (
          <ConcertSummaryForm
            orchestraName={data.orchestra.name}
            title={data.title}
            description={data.description}
          />
        )}
        <Box mt={4} />
        {data && (
          <ConcertDetailInfoForm
            date={data.date}
            openAt={data.openAt}
            startAt={data.startAt}
            closeAt={data.closeAt}
          />
        )}
        <Box mt={4} />
        <ConcertProgramForm />
        <Box mt={4} />
        <ConcertAccessForm />
      </ContainerSpacer>
    </Layout>
  );
};
