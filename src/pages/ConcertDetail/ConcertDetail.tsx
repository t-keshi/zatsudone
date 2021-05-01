import { Box } from '@material-ui/core';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ConcertDetailInfo } from './ConcertDetailInfo/ConcertDetailInfo';
import { concertResponse } from './dummy';
import { ConcertProgram } from './ConcertProgram/ConcertProgram';

export const ConcertDetail: React.VFC = () => {
  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout>
      <Box p={3}>
        <ConcertDetailInfo />
        <Box mt={2} />
        <ConcertProgram program={concertResponse.program} />
      </Box>
    </Layout>
  );
};
