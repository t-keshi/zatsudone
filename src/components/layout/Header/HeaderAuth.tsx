import { Avatar, Box, Button, IconButton, MenuItem } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import firebase from 'firebase/app';
import React from 'react';
import { useFetchUserInfo } from '../../../containers/controllers/authentication/useFetchUserInfo';
import { useLogOut } from '../../../containers/controllers/authentication/useLogOut';
import { ROUTE_PATHS } from '../../../routes/type';
import { useMenu } from '../../../utility/hooks/useMenu';
import { useRouter } from '../../../utility/hooks/useRouter';
import { MenuCustom } from '../../helpers/MenuCustom/MenuCustom';

export const HeaderAuth: React.VFC = () => {
  const { history } = useRouter();
  const user = firebase.auth().currentUser;
  const { data, isLoading } = useFetchUserInfo();
  const { mutate } = useLogOut();
  const { anchorEl, handleMenuOpen, handleMenuClose } = useMenu();

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
        <IconButton>
          <KeyboardArrowDown onClick={handleMenuOpen} />
        </IconButton>
        <MenuCustom
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          align="right"
        >
          <MenuItem
            value="すべて"
            onClick={() => history.push(ROUTE_PATHS.プロフィール設定)}
          >
            プロフィール設定
          </MenuItem>
          <MenuItem value="ログアウト" onClick={() => mutate()}>
            ログアウト
          </MenuItem>
        </MenuCustom>
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
