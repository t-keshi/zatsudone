import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../utility/hooks/useTitle';
import { OrchestraList } from './OrchestraList/OrchestraList';

export const Orchestras: React.VFC = () => {
  useTitle('SymphonyForum | 楽団リスト');

  return (
    <Layout>
      <div>
        <Typography variant="overline">Orchestra List</Typography>
        <Typography variant="h5">楽団リスト</Typography>
      </div>
      <Box mt={3} />
      <OrchestraList />
    </Layout>
  );
};
