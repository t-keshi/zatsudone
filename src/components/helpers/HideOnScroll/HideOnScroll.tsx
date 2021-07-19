import { Slide, useMediaQuery, useScrollTrigger } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line no-restricted-imports
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

interface Props {
  hideDownBreakpoints?: Breakpoint;
  children: React.ReactElement;
}

export const HideOnScroll: React.VFC<Props> = ({
  children,
  hideDownBreakpoints,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.down(hideDownBreakpoints ?? 'xs'),
  );
  const trigger = useScrollTrigger({ target: window });

  if (hideDownBreakpoints === undefined || !matches) {
    return children;
  }

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
