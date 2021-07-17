import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthForgetPassword } from '../pages/AuthForgetPassword';
import { AuthLogIn } from '../pages/AuthLogIn';
import { AuthSignup } from '../pages/AuthSignUp';
import { ConcertDetail } from '../pages/ConcertDetail';
import { ConcertEdit } from '../pages/ConcertEdit';
import { ConcertsRecent } from '../pages/ConcertsRecent';
import { ConcertsUpcoming } from '../pages/ConcertsUpcoming';
import { LandingPage } from '../pages/LandingPage';
import { MyPage } from '../pages/MyPage';
import { NotFound404 } from '../pages/NotFound404';
import { OrchestraDetail } from '../pages/OrchestraDetail';
import { OrchestraManagement } from '../pages/OrchestraManagement';
import { Orchestras } from '../pages/Orchestras';
import { Profile } from '../pages/Profile';
import { ProfileSetting } from '../pages/ProfileSetting';
import { usePageScrollReset } from '../utility/hooks/useScrollReset';
import { ROUTE_PATHS } from './type';

export const Routes: React.VFC = () => {
  usePageScrollReset();

  return (
    <Switch>
      <Route exact path={ROUTE_PATHS.ランディングページ}>
        <LandingPage />
      </Route>
      <Route exact path={ROUTE_PATHS.近日中のコンサート}>
        <ConcertsUpcoming />
      </Route>
      <Route exact path={ROUTE_PATHS.新着のコンサート}>
        <ConcertsRecent />
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
      <Route exact path={ROUTE_PATHS.楽団運営}>
        <OrchestraManagement />
      </Route>
      <Route exact path={ROUTE_PATHS.ログイン}>
        <AuthLogIn />
      </Route>
      <Route exact path={ROUTE_PATHS.コンサート編集}>
        <ConcertEdit />
      </Route>
      <Route exact path={ROUTE_PATHS.新規登録}>
        <AuthSignup />
      </Route>
      <Route exact path={ROUTE_PATHS.パスワード忘れ}>
        <AuthForgetPassword />
      </Route>
      <Route exact path={ROUTE_PATHS.プロフィール設定}>
        <ProfileSetting />
      </Route>
      <Route exact path={ROUTE_PATHS.プロフィール}>
        <Profile />
      </Route>
      <Route exact path={ROUTE_PATHS.マイページ}>
        <MyPage />
      </Route>
      <Route>
        <NotFound404 />
      </Route>
    </Switch>
  );
};
