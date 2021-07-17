import { Paper, PaperProps, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line no-restricted-imports
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

interface Props extends PaperProps {
  breakpoint: Breakpoint;
}

export const ResponsivePaper: React.FC<Props> = ({
  children,
  breakpoint,
  ...rest
}) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(breakpoint));

  if (isMatch) {
    return <>{children}</>;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Paper {...rest}>{children}</Paper>;
};
