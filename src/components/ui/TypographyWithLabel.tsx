import { Typography, TypographyProps, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  label: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
  },
}));

type Props = TypographyProps;

export const TypographyWithLabel: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Box className={classes.label}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Typography {...props}>{children}</Typography>
    </Box>
  );
};
