import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props {
  isLoading: boolean;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const ButtonProgress: React.VFC<Props & ButtonProps> = ({
  children,
  isLoading,
  ...buttonProps
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button {...buttonProps}>{children}</Button>
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
