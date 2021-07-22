import { Avatar, Box, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useFetchMembers } from '../../../containers/controllers/belong/useFetchMembers';
import { ROUTE_PATHS } from '../../../routes/type';

interface Props {
  orchestraId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(4),
    columnGap: theme.spacing(5),
    justifyContent: 'center',
  },
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
    marginBottom: theme.spacing(1),
  },
}));

export const OrchestraMembersForm: React.VFC<Props> = ({ orchestraId }) => {
  const classes = useStyles();
  const history = useHistory();
  const { data } = useFetchMembers(orchestraId);

  return (
    <div className={classes.root}>
      {data &&
        data.members.map(({ userSnippets }) => (
          <Box width={100} key={userSnippets.uid}>
            <ButtonBase
              className={classes.avatarWrapper}
              onClick={() =>
                history.push(
                  `/${ROUTE_PATHS.プロフィール.split('/')[1]}/${
                    userSnippets.uid
                  }`,
                )
              }
            >
              <Avatar
                className={classes.avatar}
                src={userSnippets.photoURL}
                alt="avatar"
              />
            </ButtonBase>
            <Box mt={1} />
            <Typography align="center" variant="body1">
              {userSnippets.displayName}
            </Typography>
            <Typography
              align="center"
              variant="caption"
              display="block"
              color="textSecondary"
            >
              {userSnippets.part}
            </Typography>
          </Box>
        ))}
    </div>
  );
};
