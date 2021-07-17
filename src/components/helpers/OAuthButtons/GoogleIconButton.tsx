import {
  IconButton,
  IconButtonProps,
  IconButtonTypeMap,
} from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.custom.google,
    '&:hover': {
      color: darken(
        theme.palette.custom.google,
        theme.palette.action.hoverOpacity,
      ),
    },
  },
}));

export const GoogleIconButton = <
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  // eslint-disable-next-line @typescript-eslint/ban-types
  P = {},
>(
  props: IconButtonProps<D, P>,
): React.ReactElement => {
  const classes = useStyles();

  return (
    <IconButton
      classes={{ colorPrimary: classes.button }}
      color="primary"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <FcGoogle fontSize="large" />
    </IconButton>
  );
};
