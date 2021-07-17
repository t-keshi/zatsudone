import { Box, BoxProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));

export const ContainerSpacer: React.VFC<BoxProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box className={classes.container} {...rest}>
      {children}
    </Box>
  );
};
