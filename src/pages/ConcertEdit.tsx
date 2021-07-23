import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { Layout } from '../components/layout/Layout';
import { ConcertFlayerForm } from '../components/ui/ConcertFlyer/ConcertFlayerForm';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { useTitle } from '../utility/hooks/useTitle';

export const ConcertEdit: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="プロフィール設定"
          pageTitleOverline="PROFILE SETTING"
        />
      </ContainerSpacer>
      <ConcertFlayerForm name="" coverImage="" orchestraId="" />
      <ContainerSpacer my={4}>
        <ProfileForm />
      </ContainerSpacer>
    </Layout>
  );
};
