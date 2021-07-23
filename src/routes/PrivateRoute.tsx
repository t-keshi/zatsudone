import { CircularProgress } from '@material-ui/core';
import firebase from 'firebase';
import React, { useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const PrivateRoute: React.VFC<RouteProps> = ({ children, ...rest }) => {
  const [user, setUser] = useState<firebase.User | boolean | undefined>(
    undefined,
  );

  firebase
    .auth()
    .onAuthStateChanged(() => setUser(firebase.auth().currentUser ?? false));

  if (user === undefined) {
    return <CircularProgress />;
  }

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        user ? (
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
