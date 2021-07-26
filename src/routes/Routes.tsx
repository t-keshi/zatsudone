import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AboutSymphonyForum } from '../pages/AboutSymphonyForum';
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
import { OrchestraManagementDetail } from '../pages/OrchestraManagementDetail';
import { Orchestras } from '../pages/Orchestras';
import { Profile } from '../pages/Profile';
import { ProfileSetting } from '../pages/ProfileSetting';
import { usePageScrollReset } from '../utility/hooks/useScrollReset';
import { PrivateRoute } from './PrivateRoute';
import { ROUTE_PATHS } from './type';

export const Routes: React.VFC = () => {
  usePageScrollReset();

  return (
    <Switch>
      <Route exact path={ROUTE_PATHS.ランディングページ}>
        <LandingPage />
      </Route>
      <Route exact path={ROUTE_PATHS.アバウト}>
        <AboutSymphonyForum />
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
      <Route exact path={ROUTE_PATHS.ログイン}>
        <AuthLogIn />
      </Route>
      <Route exact path={ROUTE_PATHS.新規登録}>
        <AuthSignup />
      </Route>
      <Route exact path={ROUTE_PATHS.パスワード忘れ}>
        <AuthForgetPassword />
      </Route>
      <Route exact path={ROUTE_PATHS.プロフィール}>
        <Profile />
      </Route>
      <PrivateRoute exact path={ROUTE_PATHS.楽団運営}>
        <OrchestraManagement />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTE_PATHS.楽団運営詳細}>
        <OrchestraManagementDetail />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTE_PATHS.楽団運営コンサート編集}>
        <ConcertEdit />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTE_PATHS.プロフィール設定}>
        <ProfileSetting />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTE_PATHS.マイページ}>
        <MyPage />
      </PrivateRoute>
      <Route>
        <NotFound404 />
      </Route>
    </Switch>
  );
};
