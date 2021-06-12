import { Box, Button, Container } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { ROUTE_PATHS } from '../../routes/type';
import { useRouter } from '../../utility/hooks/useRouter';
import { useTitle } from '../../utility/hooks/useTitle';
import { ConcertDetailInfo } from './ConcertDetailInfo/ConcertDetailInfo';
import { ConcertProgram } from './ConcertProgram/ConcertProgram';
import { concertResponse } from './dummy';

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
