import { Box, Typography, TypographyProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface StyleProps {
  gutterBottom: TypographyProps['gutterBottom'];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0, 1),
    marginBottom: ({ gutterBottom }: StyleProps) =>
      gutterBottom ? theme.spacing(1) : 0,
  },
}));

export const TextLabel: React.VFC<TypographyProps> = ({
  children,
  gutterBottom,
  ...rest
}) => {
  const classes = useStyles({ gutterBottom });

  return (
    <Box className={classes.root}>
      <Typography
        variant="button"
        display="block"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        gutterBottom={false}
      >
        {children}
      </Typography>
    </Box>
  );
};
