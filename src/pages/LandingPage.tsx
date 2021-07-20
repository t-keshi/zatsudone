import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import heroHeader from '../assets/heroHeader.png';
import { TopLayout } from '../components/layout/TopLayout';
import { ROUTE_PATHS } from '../routes/type';
import { useRouter } from '../utility/hooks/useRouter';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    rowGap: theme.spacing(1),
  },
  heroHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

export const LandingPage: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();

  useTitle('SymphonyForum | 音楽を楽しもう');

  return (
    <TopLayout>
      <Box className={classes.root}>
        <Box mt={8}>
          <Typography variant="body1">音楽を楽しもう</Typography>
          <Typography variant="h2">Symphony Forum</Typography>
          <Box className={classes.buttonWrapper}>
            <Button
              variant="text"
              color="default"
              onClick={() => history.push(ROUTE_PATHS.アバウト)}
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
        <Box className={classes.heroHeaderWrapper}>
          <img alt="music" src={heroHeader} />
        </Box>
      </Box>
    </TopLayout>
  );
};
