import { Avatar, Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import musicNote from '../../../assets/musicNote.png';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

const useStyles = makeStyles((theme) => ({
  avatarWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(4),
    columnGap: theme.spacing(5),
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
}));

export const MembersForm: React.VFC = () => {
  const classes = useStyles();
  const joinRequests = [1, 2, 3];
  const members = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <SubHeading variant="h5" paragraph>
        入団リクエスト
      </SubHeading>
      <div className={classes.avatarWrapper}>
        {joinRequests.map((request) => (
          <Box width={100} key={request}>
            <Avatar alt="avatar" src={musicNote} className={classes.avatar} />
            <Box mt={1} />
            <Typography align="center" variant="body1">
              山田 太郎
            </Typography>
            <Typography
              align="center"
              variant="caption"
              display="block"
              color="textSecondary"
            >
              ファゴット
            </Typography>
            <Box mt={1} />
            <Button size="small" fullWidth>
              許可する
            </Button>
          </Box>
        ))}
      </div>
      <Box mt={5} />
      <SubHeading variant="h5" paragraph>
        メンバー
      </SubHeading>
      <div className={classes.avatarWrapper}>
        {members.map((member) => (
          <Box width={100} key={member}>
            <Avatar alt="avatar" src={musicNote} className={classes.avatar} />
            <Box mt={1} />
            <Typography align="center" variant="body1">
              山田 太郎
            </Typography>
            <Typography
              align="center"
              variant="caption"
              display="block"
              color="textSecondary"
            >
              ファゴット
            </Typography>
          </Box>
        ))}
      </div>
    </>
  );
};
