import { Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  description: string;
}

export const OrchestraFormDescription: React.VFC<Props> = ({ description }) => (
  <Typography variant="body2">{description}</Typography>
);
