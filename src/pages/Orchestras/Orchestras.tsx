import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { OrchestraList } from './OrchestraList/OrchestraList';

export const Orchestras: React.VFC = () => {
  useTitle('SymphonyForum | 楽団リスト');

  return (
    <Layout>
      <Box p={3}>
        <OrchestraList />
      </Box>
    </Layout>
  );
};
