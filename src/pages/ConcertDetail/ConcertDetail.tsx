import { Box, Button, CircularProgress, Container } from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import React from 'react';
import musicNote from '../../assets/musicNote.png';
import { Layout } from '../../components/layout/Layout';
import { ConcertAccess } from '../../components/ui/ConcertAccess/ConcertAccess';
import { ConcertDetailInfo } from '../../components/ui/ConcertDetailInfo/ConcertDetailInfo';
import { ConcertFlyer } from '../../components/ui/ConcertFlyer/ConcertFlyer';
import { ConcertProgram } from '../../components/ui/ConcertProgram/ConcertProgram';
import { ConcertSummary } from '../../components/ui/ConcertSummary/ConcertSummary';
import { useFetchConcert } from '../../containers/api/concert/useFetchConcert';
import { ROUTE_PATHS } from '../../routes/type';
import { useRouter } from '../../utility/hooks/useRouter';
import { useTitle } from '../../utility/hooks/useTitle';

export const ConcertDetail: React.VFC = () => {
  const { history } = useRouter();
  useTitle('SymphonyForum | 大阪大学吹奏楽団');
  const { data, isLoading } = useFetchConcert();
  console.log(data);

  if (isLoading) return <CircularProgress />;

  return (
    <Layout noPadding>
      <ConcertFlyer title={data?.title} src={musicNote} />
      <Container maxWidth={false}>
        <Box py={2}>
          <ConcertSummary orchestraName="大阪大学吹奏楽団" />
          {data !== undefined && (
            <>
              <Box mt={4} />
              <ConcertDetailInfo
                location="兵庫県尼崎市あましんアルカイックホール"
                date={data.date}
                startAt={data.startAt}
                openAt={data.openAt}
                closeAt={data.closeAt}
              />
              <Box mt={4} />
              <ConcertProgram />
              <Box mt={4} />
              <ConcertAccess />
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
            </>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
