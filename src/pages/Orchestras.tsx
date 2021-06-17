import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ContentHeader } from '../components/uiGroup/ContentHeader/ContentHeader';
import { OrchestraList } from '../components/uiGroup/OrchestraList/OrchestraList';
import { useTitle } from '../utility/hooks/useTitle';

export const Orchestras: React.VFC = () => {
  useTitle('SymphonyForum | 楽団リスト');

  return (
    <Layout>
      <ContentHeader
        pageTitle="楽団リスト"
        pageTitleOverline="ORCHESTRA LIST"
      />
      <Box mt={3} />
      <OrchestraList />
    </Layout>
  );
};
