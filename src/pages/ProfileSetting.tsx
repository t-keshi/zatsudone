import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { Layout } from '../components/layout/Layout';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { ProfileHeaderForm } from '../components/ui/ProfileHeader/ProfileHeaderForm';
import { useFetchUserInfo } from '../containers/controllers/authentication/useFetchUserInfo';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  const { data: userInfo } = useFetchUserInfo();
  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="プロフィール設定"
          pageTitleOverline="PROFILE SETTING"
        />
      </ContainerSpacer>
      <ProfileHeaderForm
        displayName={userInfo?.displayName ?? ''}
        photoURL={userInfo?.photoURL ?? ''}
      />
      <ContainerSpacer my={4}>
        <ProfileForm />
      </ContainerSpacer>
    </Layout>
  );
};
