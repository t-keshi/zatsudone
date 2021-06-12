import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { Link, LinkProps } from '@material-ui/core';
import React from 'react';

type Props = RouterLinkProps & LinkProps;

export const StyledLink: React.FC<Props> = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link component={RouterLink} {...rest}>
    {children}
  </Link>
);
