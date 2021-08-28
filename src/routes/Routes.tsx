import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Top } from '../pages/Top';
import { ROUTE_PATHS } from './type';

export const Routes: React.VFC = () => (
  <Switch>
    <Route exact path={ROUTE_PATHS.トップ}>
      <Top />
    </Route>
  </Switch>
);
