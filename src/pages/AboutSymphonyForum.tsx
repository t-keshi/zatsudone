import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import heroHeader from '../assets/orchestraCover.jpg';
import { ROUTE_PATHS } from '../routes/type';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr min(65ch, 100%) 1fr',
    padding: theme.spacing(2, 0),
  },
  article: {
    gridColumn: 2,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    '& > p': {
      lineHeight: 1.9741171309,
    },
  },
  eyeCatchHeading: {
    fontSize: '2.625rem',
    lineHeight: 1.6171748658,
    [theme.breakpoints.up('md')]: {
      fontSize: '4rem',
      lineHeight: 1.6875,
    },
  },
  fullBleed: {
    width: '100%',
    gridColumn: '1 / 4',
  },
  heroHeader: {
    objectFit: 'cover',
    width: '100%',
    height: 400,
  },
  buttonWrapper: {
    margin: theme.spacing(2, 'auto'),
    display: 'flex',
    gridColumn: 2,
    width: '100%',
    justifyContent: 'center',
  },
}));

export const AboutSymphonyForum: React.VFC = () => {
  const classes = useStyles();
  const history = useHistory();

  useTitle('SymphonyForum | SymphonyForumとは？');

  return (
    <div className={classes.gridWrapper}>
      <div className={classes.article}>
        <Typography
          className={classes.eyeCatchHeading}
          variant="h1"
          paragraph
          align="center"
          component="h1"
        >
          If you realize you are only a wind instrument...
        </Typography>
      </div>
      <div className={classes.fullBleed}>
        <img className={classes.heroHeader} src={heroHeader} alt="heroHeader" />
      </div>
      <Box mt={2} className={classes.article}>
        <Typography variant="h5" paragraph>
          Symphony Forumはすべての音楽好きのためのアプリケーションです。
        </Typography>
        <Typography variant="body1" component="p">
          音楽を通して、世界に繋がりたいと思う。そんな思いを実現します。
          <br />
          Symphony
          Forumでは演奏会を告知したり、日程を調べたり、そして音楽について語り合ったりすることができます。
          さっそく、初めてみましょう
        </Typography>
      </Box>
      <div className={classes.buttonWrapper}>
        <Button
          color="default"
          variant="text"
          size="large"
          onClick={() => history.push(ROUTE_PATHS.近日中のコンサート)}
        >
          登録しないではじめる
        </Button>
        <Button size="large" onClick={() => history.push(ROUTE_PATHS.新規登録)}>
          SignUp
        </Button>
      </div>
    </div>
  );
};
