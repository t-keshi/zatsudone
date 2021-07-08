import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import musicNote from '../../../assets/musicNote.png';

const useStyles = makeStyles((theme) => ({
  root: {
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

export const OrchestraMembers: React.VFC = () => {
  const classes = useStyles();
  const members = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className={classes.root}>
      {members.map((member) => (
        <Box width={100} key={member}>
          <Avatar className={classes.avatar} src={musicNote} alt="avatar" />
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
  );
};
