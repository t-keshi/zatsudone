import { Box, IconButton } from '@material-ui/core';
import { Facebook, Link as LinkIcon, Twitter } from '@material-ui/icons';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Layout } from '../components/layout/Layout';
import { ProfileForm } from '../components/ui/ProfileForm/ProfileForm';
import { User } from '../containers/controllers/authentication/useFetchUserInfo';
import { useSocialConnect } from '../containers/controllers/authentication/useSocialConnect';
import { QUERY } from '../containers/entities/query';
import { useTitle } from '../utility/hooks/useTitle';

export const ProfileSetting: React.VFC = () => {
  const { mutate: socialConnect } = useSocialConnect();
  const client = useQueryClient();
  const user: User | undefined = client.getQueryData([QUERY.user]);
  const twitterUserName = user?.twitterUserName;
  const facebookUserName = user?.facebookUserName;

  useTitle('SymphonyForum | プロフィール設定');

  return (
    <Layout noPadding>
      <Box display="flex" style={{ columnGap: '16px' }}>
        <IconButton
          color={twitterUserName ? 'primary' : 'default'}
          onClick={() => socialConnect('twitter')}
        >
          <Twitter />
        </IconButton>
        <IconButton
          color={facebookUserName ? 'primary' : 'default'}
          onClick={() => socialConnect('facebook')}
        >
          <Facebook />
        </IconButton>
        <IconButton>
          <LinkIcon />
        </IconButton>
      </Box>
      <ProfileForm />
    </Layout>
  );
};
