import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      <ProfileForm />
    </Layout>
  );
};
