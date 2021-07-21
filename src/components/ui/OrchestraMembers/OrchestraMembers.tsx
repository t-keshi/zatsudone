import { Avatar, Box, Button, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useBelongOrchestra } from '../../../containers/controllers/belong/useBelongOrchestra';
import { useFetchMembers } from '../../../containers/controllers/belong/useFetchMembers';
import { Orchestra } from '../../../containers/controllers/orchestra/useFetchOrchestra';
import { ROUTE_PATHS } from '../../../routes/type';

interface Props {
  orchestra: Orchestra;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(4),
    columnGap: theme.spacing(5),
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  avatarWrapper: {
    borderRadius: '50%',
  },
  avatar: {
    width: 100,
    height: 100,
  },
}));

export const OrchestraMembers: React.VFC<Props> = ({ orchestra }) => {
  const classes = useStyles();
  const history = useHistory();
  const params: { orchestraId: string } = useParams();
  const { data } = useFetchMembers(params.orchestraId);
  const { mutate } = useBelongOrchestra();

  return (
    <>
      <div className={classes.buttonWrapper}>
        <Button
          disabled={data === undefined}
          variant={data?.isUserBelong ? 'outlined' : 'contained'}
          onClick={() =>
            mutate({
              orchestra,
              toggle: data?.isUserBelong ? 'remove' : 'add',
            })
          }
        >
          {data?.isUserBelong ? '参加を取り消す' : '参加'}
        </Button>
      </div>
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
    </>
  );
};
