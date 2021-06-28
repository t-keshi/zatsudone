import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { OrchestraList } from '../components/ui/OrchestraList/OrchestraList';
import { useFetchOrchestras } from '../containers/controllers/orchestra/useFetchOrchestras';
import { useTitle } from '../utility/hooks/useTitle';

export const Orchestras: React.VFC = () => {
  const { data } = useFetchOrchestras();

  useTitle('SymphonyForum | 楽団リスト');

  return (
    <Layout>
      <ContentHeader
        pageTitle="楽団リスト"
        pageTitleOverline="ORCHESTRA LIST"
      />
      <Box mt={3} />
      <OrchestraList orchestras={data?.orchestras} />
    </Layout>
  );
};
