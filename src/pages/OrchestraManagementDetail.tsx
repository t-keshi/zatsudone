import { Box, CircularProgress, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useQueryClient } from 'react-query';
import coverImage from '../assets/orchestraCover.jpg';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { SwipeableViewsCustom } from '../components/helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { OrchestraConcertForm } from '../components/ui/orchestra/OrchestraConcert/OrchestraConcertForm';
import { OrchestraFormImage } from '../components/ui/orchestra/OrchestraFormImage/OrchestraFormImage';
import { OrchestraInfoForms } from '../components/ui/orchestra/OrchestraInfo/OrchestraInfoForms';
import { OrchestraMembersForm } from '../components/ui/orchestra/OrchestraMembers/OrchestraMembersForm';
import { useFetchOrchestra } from '../containers/controllers/orchestra/useFetchOrchestra';
import { User } from '../containers/controllers/user/useFetchUserInfo';
import { QUERY } from '../containers/entities/query';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';

export const OrchestraManagementDetail: React.VFC = () => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  const queryClient = useQueryClient();
  const userInfo: User | undefined = queryClient.getQueryData([QUERY.user]);
  const { data: orchestraData } = useFetchOrchestra(
    userInfo?.managementOrchestraId ?? '',
    { enabled: userInfo?.managementOrchestraId !== undefined },
  );

  useTitle('SymphonyForum | 楽団運営');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="楽団運営"
          pageTitleOverline="ORCHESTRA MANAGEMENT"
        />
      </ContainerSpacer>
      <>
        <OrchestraFormImage
          name={orchestraData?.name ?? ''}
          orchestraId={orchestraData?.id ?? ''}
          coverImage={orchestraData?.coverUrl ?? coverImage}
        />
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="楽団情報" />
          <Tab label="メンバー" />
          <Tab label="演奏会" />
        </Tabs>
        <Box mt={1} />
        <SwipeableViewsCustom
          index={tabIndex}
          onChangeIndex={handleChangeTabBySwipe}
        >
          <TabPanel value={tabIndex} index={0}>
            {!orchestraData ? (
              <CircularProgress />
            ) : (
              <OrchestraInfoForms orchestra={orchestraData} />
            )}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <OrchestraMembersForm />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <OrchestraConcertForm />
          </TabPanel>
        </SwipeableViewsCustom>
      </>
    </Layout>
  );
};
