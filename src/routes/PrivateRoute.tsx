import React from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { User } from '../containers/controllers/authentication/useFetchUserInfo';
import { QUERY } from '../containers/entities/query';

export const PrivateRoute: React.VFC<RouteProps> = ({ children, ...rest }) => {
  const client = useQueryClient();
  const userInfo: User | undefined = client.getQueryData([QUERY.user]);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
