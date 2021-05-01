import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import heroHeader from '../../assets/heroHeader.png';
import { TopLayout } from '../../components/layout/TopLayout';
import { useRouter } from '../../helpers/hooks/useRouter';
import { useTitle } from '../../helpers/hooks/useTitle';
import { ROUTE_PATHS } from '../../routes/type';

export const Top: React.VFC = () => {
  useTitle('SymphonyForum | 音楽を楽しもう');
  const { history } = useRouter();

  return (
    <TopLayout>
      <Box
        width="100%"
        height="90vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box mt={8}>
          <Typography variant="body1">音楽を楽しもう</Typography>
          <Typography variant="h2">Symphony Forum</Typography>
          <Box
            mt={4}
            display="flex"
            flexDirection="row"
            style={{ rowGap: '8px' }}
          >
            <Button
              variant="text"
              color="default"
              onClick={() => console.log('hello')}
            >
              詳しく
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push(ROUTE_PATHS.近日中のコンサート)}
            >
              はじめる
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <img alt="music" src={heroHeader} />
        </Box>
      </Box>
    </TopLayout>
  );
};
