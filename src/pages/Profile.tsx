import { Typography } from '@material-ui/core';
import React from 'react';
import image from '../assets/imageNotFound.jpeg';
import { Layout } from '../components/layout/Layout';
import { ConcertFlyer } from '../components/ui/ConcertFlyer/ConcertFlyer';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { useTitle } from '../utility/hooks/useTitle';

export const Profile: React.VFC = () => {
  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      <div>
        <ConcertFlyer title="hogehoe" image={image} />
        <Typography variant="h5">hello</Typography>
        <ProfileForm />
      </div>
    </Layout>
  );
};
