import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { SubHeading } from '../components/helpers/SubHeading/SubHeading';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/concerts/ConcertList/ConcertList';
import { ProfileInfo } from '../components/ui/profile/ProfileForm/ProfileInfo';
import { ProfileHeader } from '../components/ui/profile/ProfileHeader/ProfileHeader';
import { useFetchParticipation } from '../containers/controllers/participation/useFetchParticipation';
import { useFetchUserInfo } from '../containers/controllers/user/useFetchUserInfo';
import { ROUTE_PATHS } from '../routes/type';
import { useTitle } from '../utility/hooks/useTitle';

export const Profile: React.VFC = () => {
  const { data: userInfo } = useFetchUserInfo();
  const { data } = useFetchParticipation();
  const concerts =
    data && data.length > 0
      ? data.map((participationItem) => participationItem.concertSnippets)
      : undefined;

  useTitle('SymphonyForum | プロフィール');

  return (
    <Layout noPadding>
      <ProfileHeader
        displayName={userInfo?.displayName ?? ''}
        photoURL={userInfo?.photoURL ?? ''}
        hasRadiusTop
      />
      <ContainerSpacer my={4}>
        <ProfileInfo />
        <Box mt={2} />
        <SubHeading variant="h5">来場予定＆来場済み</SubHeading>
        {data?.length !== 0 ? (
          <ConcertList
            key={concerts ? concerts[0].id : '1'}
            concerts={concerts}
            isFirst
            linkParam={`/${ROUTE_PATHS.コンサート詳細.split('/')[1]}`}
          />
        ) : (
          <Typography>まだ演奏会に参加していません</Typography>
        )}
      </ContainerSpacer>
    </Layout>
  );
};
