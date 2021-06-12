/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactText } from 'react';

type StyleProps = {
  width: ReactText;
};

const useStyles = makeStyles(() => ({
  button: {
    width: (props: StyleProps) => props.width,
  },
}));

interface Props {
  yesLabel: string;
  yesButtonProps: ButtonProps;
  noLabel: string;
  noButtonProps: ButtonProps;
  width?: ReactText;
}

export const YesOrNoButton: React.VFC<Props> = ({
  yesLabel,
  yesButtonProps,
  noLabel,
  noButtonProps,
  width = 100,
}) => {
  const classes = useStyles({ width });

  return (
    <Box display="flex">
      <Button className={classes.button} variant="text" {...noButtonProps}>
        {noLabel}
      </Button>
      <Button className={classes.button} {...yesButtonProps}>
        {yesLabel}
      </Button>
    </Box>
  );
};
