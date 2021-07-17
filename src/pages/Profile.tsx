import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { Layout } from '../components/layout/Layout';
import { ProfileInfo } from '../components/ui/ProfileForm/ProfileInfo';
import { useTitle } from '../utility/hooks/useTitle';

export const Profile: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール');

  return (
    <Layout noPadding>
      {/* <ProfileHeader hasRadiusTop /> */}
      <ContainerSpacer>
        <ProfileInfo />
      </ContainerSpacer>
    </Layout>
  );
};
