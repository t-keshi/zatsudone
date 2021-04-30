import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const PrivateRoute: React.VFC<RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = true;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
