import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Orchestras } from '../pages/Orchestras/Orchestras';
import { RecentConcerts } from '../pages/RecentConcerts/RecentConcerts';
import { Top } from '../pages/Top/Top';
import { UpcomingConcerts } from '../pages/UpcomingConcerts/UpcomingConcerts';
import { OrchestraDetail } from '../pages/OrchestraDetail/OrchestraDetail';
import { ROUTE_PATHS } from './type';
import { ConcertDetail } from '../pages/ConcertDetail/ConcertDetail';

export const Routes: React.VFC = () => (
  <Switch>
    <Route exact path={ROUTE_PATHS.トップ}>
      <Top />
    </Route>
    <Route exact path={ROUTE_PATHS.近日中のコンサート}>
      <UpcomingConcerts />
    </Route>
    <Route exact path={ROUTE_PATHS.新着のコンサート}>
      <RecentConcerts />
    </Route>
    <Route exact path={ROUTE_PATHS.コンサート詳細}>
      <ConcertDetail />
    </Route>
    <Route exact path={ROUTE_PATHS.楽団リスト}>
      <Orchestras />
    </Route>
    <Route exact path={ROUTE_PATHS.楽団詳細}>
      <OrchestraDetail />
    </Route>
  </Switch>
);
