import { Divider, Grid, GridProps } from '@material-ui/core';
import React from 'react';

export const DividerWithText: React.FC<GridProps> = ({
  children,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Grid container alignItems="center" spacing={3} {...props}>
    <Grid item xs>
      <Divider />
    </Grid>
    <Grid item>{children}</Grid>
    <Grid item xs>
      <Divider />
    </Grid>
  </Grid>
);
