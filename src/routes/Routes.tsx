import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Top } from '../pages/Top/Top';
import { UpcomingEvents } from '../pages/UpcomingEvents/UpcomingEvents';
import { ROUTE_PATHS } from './type';

export const Routes: React.VFC = () => (
  <Switch>
    <Route exact path={ROUTE_PATHS.トップ}>
      <Top />
    </Route>
    <Route>
      <UpcomingEvents />
    </Route>
  </Switch>
);
