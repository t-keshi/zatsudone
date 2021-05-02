import { Box, Button, Container } from '@material-ui/core';
import React from 'react';
import { AccountBox } from '@material-ui/icons';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ConcertDetailInfo } from './ConcertDetailInfo/ConcertDetailInfo';
import { concertResponse } from './dummy';
import { ConcertProgram } from './ConcertProgram/ConcertProgram';
import { useRouter } from '../../helpers/hooks/useRouter';
import { ROUTE_PATHS } from '../../routes/type';

export const ConcertDetail: React.VFC = () => {
  const { history } = useRouter();
  useTitle('SymphonyForum | 大阪大学吹奏楽団');
  const {
    prefecture,
    location,
    date,
    startAt,
    openAt,
    closeAt,
  } = concertResponse;
  const detail = {
    prefecture,
    location,
    date,
    startAt,
    openAt,
    closeAt,
  };

  return (
    <Layout noPadding>
      <ConcertDetailInfo detail={detail} />
      <Container maxWidth={false}>
        <Box py={2}>
          <ConcertProgram program={concertResponse.program} />
          <Box mt={5} display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              color="default"
              startIcon={<AccountBox color="primary" />}
              onClick={() => history.push(ROUTE_PATHS.楽団詳細)}
            >
              楽団情報を見る
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
