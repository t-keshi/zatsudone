import { Box, Container, Hidden } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase/app';
import React from 'react';
import { useLogOut } from '../../../containers/api/authentication/useLogOut';
import { ROUTE_PATHS } from '../../../routes/type';
import { useMenu } from '../../../utility/hooks/useMenu';
import { useRouter } from '../../../utility/hooks/useRouter';
import { HeaderMenu } from './HeaderMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: `1px solid ${theme.palette.divider}`,
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    padding: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header: React.VFC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const user = firebase.auth().currentUser;
  const { mutate } = useLogOut();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            {isMenuOpen && (
              <HeaderMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
            )}
            <Typography variant="h6" className={classes.title}>
              Symphony Forum
            </Typography>
            {!user ? (
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
            ) : (
              <>
                <Typography variant="caption">{user.displayName}</Typography>
                <Box ml={2} />
                <Button color="primary" onClick={() => mutate()}>
                  LogOut
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
