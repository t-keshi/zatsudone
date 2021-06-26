import { Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  pageTitle: string;
  pageTitleOverline: string;
}

export const ContentHeader: React.VFC<Props> = ({
  pageTitle,
  pageTitleOverline,
}) => (
  <div>
    <Typography variant="overline">{pageTitleOverline}</Typography>
    <Typography variant="h5">{pageTitle}</Typography>
  </div>
);
