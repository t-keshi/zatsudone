import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowRight } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes/type';

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 28,
  },
  activeNavLink: {
    color: theme.palette.primary.main,
  },
}));

export const SidebarMenu: React.VFC = () => {
  const classes = useStyles();
  const sidebarNavItems = [
    {
      label: '近日中のコンサート',
      link: ROUTE_PATHS.近日中のコンサート,
    },
    {
      label: '新着のコンサート',
      link: ROUTE_PATHS.新着のコンサート,
    },
    {
      label: '楽団リスト',
      link: ROUTE_PATHS.楽団リスト,
    },
    {
      label: '楽団運営',
      link: ROUTE_PATHS.楽団運営,
    },
  ];

  return (
    <List>
      {sidebarNavItems.map((navItem) => (
        <ListItem
          key={navItem.label}
          component={NavLink}
          activeClassName={classes.activeNavLink}
          button
          to={navItem.link}
        >
          <ListItemIcon className={classes.icon}>
            <ArrowRight />
          </ListItemIcon>
          <ListItemText primary={navItem.label} />
        </ListItem>
      ))}
    </List>
  );
};
