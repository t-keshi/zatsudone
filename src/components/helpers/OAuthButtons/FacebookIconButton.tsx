import {
  IconButton,
  IconButtonProps,
  IconButtonTypeMap,
} from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles';
import { Facebook } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.custom.facebook,
    '&:hover': {
      color: darken(
        theme.palette.custom.facebook,
        theme.palette.action.hoverOpacity,
      ),
    },
  },
}));

export const FacebookIconButton = <
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
      <Facebook fontSize="large" />
    </IconButton>
  );
};
