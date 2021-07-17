import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { SubHeading } from '../components/helpers/SubHeading/SubHeading';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { ProfileInfo } from '../components/ui/ProfileForm/ProfileInfo';
import { ProfileHeader } from '../components/ui/ProfileHeader/ProfileHeader';
import { useFetchUserInfo } from '../containers/controllers/authentication/useFetchUserInfo';
import { useFetchParticipation } from '../containers/controllers/participation/useFetchParticipation';
import { useTitle } from '../utility/hooks/useTitle';

export const MyPage: React.VFC = () => {
  const { data: userInfo } = useFetchUserInfo();
  const { data } = useFetchParticipation();
  const concerts =
    data && data.length > 0
      ? data.map((participationItem) => participationItem.concertSnippets)
      : undefined;
  useTitle('SymphonyForum | マイページ');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader pageTitle="マイページ" pageTitleOverline="MYPAGE" />
      </ContainerSpacer>
      <ProfileHeader
        displayName={userInfo?.displayName ?? ''}
        photoURL={userInfo?.photoURL ?? ''}
      />
      <ContainerSpacer my={4}>
        <ProfileInfo />
        <Box mt={2} />
        <SubHeading variant="h5">参加演奏会</SubHeading>
        {data?.length !== 0 ? (
          <ConcertList
            key={concerts ? concerts[0].id : '1'}
            concerts={concerts}
            isFirst
          />
        ) : (
          <Typography>まだ演奏会に参加していません</Typography>
        )}
      </ContainerSpacer>
    </Layout>
  );
};
