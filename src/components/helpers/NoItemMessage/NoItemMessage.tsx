import { Button, ButtonProps, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  heading: string;
  message: string;
  icon: React.ReactNode;
  actionLabel: string;
  actionButtonProps: ButtonProps;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    '& > svg': {
      fontSize: 100,
      color: theme.palette.text.secondary,
    },
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export const NoItemMessage: React.VFC<Props> = ({
  heading,
  message,
  icon,
  actionLabel,
  actionButtonProps,
}) => {
  const classes = useStyles();
  const noFileIcon = <div className={classes.iconWrapper}>{icon}</div>;

  return (
    <div className={classes.root}>
      <div>
        {noFileIcon}
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {heading}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          {message}
        </Typography>
        <div className={classes.buttonWrapper}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Button {...actionButtonProps}>{actionLabel}</Button>
        </div>
      </div>
    </div>
  );
};
