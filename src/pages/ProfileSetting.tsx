import { Container } from '@material-ui/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { ProfileHeader } from '../components/ui/ProfileHeader/ProfileHeader';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール');

  return (
    <Layout noPadding>
      <div>
        <ProfileHeader />
        <Container maxWidth={false}>
          <ProfileForm />
        </Container>
      </div>
    </Layout>
  );
};
