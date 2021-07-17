import { Button, ButtonProps, ButtonTypeMap } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as LinkIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  link: {
    padding: theme.spacing(0, 1),
    position: 'relative',
    textTransform: 'none',
    '&:before': {
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      content: '""',
      display: 'block',
      position: 'absolute',
      top: -16,
      bottom: 16,
      right: 0,
      left: 0,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      zIndex: 1,
      transition: 'transform .3s ease',
    },
    '&:hover:before': {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left',
    },
  },
  hoverColor: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export const LinkCustom = <
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  // eslint-disable-next-line @typescript-eslint/ban-types
  P = {},
>({
  children,
  href,
  ...rest
}: { href: string } & ButtonProps<D, P>): React.ReactElement => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: classes.link,
        text: classes.hoverColor,
        colorInherit: classes.hoverColor,
      }}
      component="a"
      variant="text"
      color="default"
      startIcon={<LinkIcon />}
      href={href}
      disableFocusRipple
      disableRipple
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
};
