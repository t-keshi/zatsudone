import { Avatar, Box, Button, IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import firebase from 'firebase/app';
import React from 'react';
import { useFetchUserInfo } from '../../../containers/controllers/authentication/useFetchUserInfo';
import { useLogOut } from '../../../containers/controllers/authentication/useLogOut';
import { ROUTE_PATHS } from '../../../routes/type';
import { useRouter } from '../../../utility/hooks/useRouter';

export const HeaderAuth: React.VFC = () => {
  const { history } = useRouter();
  const user = firebase.auth().currentUser;
  const { data, isLoading } = useFetchUserInfo();
  const { mutate } = useLogOut();

  console.log(data, user);

  if (!user) {
    return (
      <>
        <Button
          color="default"
          variant="outlined"
          onClick={() => history.push(ROUTE_PATHS.新規登録)}
        >
          SignUp
        </Button>
        <Box ml={2} />
        <Button
          color="primary"
          onClick={() => history.push(ROUTE_PATHS.ログイン)}
        >
          LogIn
        </Button>
      </>
    );
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (data && user) {
    return (
      <Box display="flex">
        <Avatar alt={data.displayName} src={data.photoURL} />
        <IconButton onClick={() => mutate()}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <div>error</div>
      <IconButton onClick={() => mutate()}>
        <KeyboardArrowDown />
      </IconButton>
    </Box>
  );
};
