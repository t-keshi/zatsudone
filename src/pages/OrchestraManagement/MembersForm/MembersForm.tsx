import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Box, Button } from '@material-ui/core';
import musicNote from '../../../assets/musicNote.png';
import { TypographyWithLabel } from '../../../components/ui/TypographyWithLabel';

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
      <TypographyWithLabel variant="h5" paragraph>
        入団リクエスト
      </TypographyWithLabel>
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
      <TypographyWithLabel variant="h5" paragraph>
        メンバー
      </TypographyWithLabel>
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
