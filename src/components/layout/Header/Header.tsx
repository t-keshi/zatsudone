import { Container, Hidden } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useMenu } from '../../../utility/hooks/useMenu';
import { HideOnScroll } from '../../helpers/HideOnScroll/HideOnScroll';
import { HeaderAuth } from './HeaderAuth';
import { HeaderMenu } from './HeaderMenu';

interface Props {
  hideAppBar: boolean;
}

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

export const Header: React.VFC<Props> = ({ hideAppBar }) => {
  const classes = useStyles();
  const { anchorEl, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();

  return (
    <HideOnScroll hideDownBreakpoints={hideAppBar ? 'md' : undefined}>
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
              <HeaderAuth />
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </HideOnScroll>
  );
};
