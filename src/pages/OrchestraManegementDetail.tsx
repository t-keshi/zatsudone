import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useQueryClient } from 'react-query';
import coverImage from '../assets/orchestraCover.jpg';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { SwipeableViewsCustom } from '../components/helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { ConcertForm } from '../components/ui/ConcertForm/ConcertForm';
import { OrchestraFormImage } from '../components/ui/OrchestraFormImage/OrchestraFormImage';
import { OrchestraMembersForm } from '../components/ui/OrchestraMembers/OrchestraMembersForm';
import { OrchestraForms } from '../components/uiGroup/OrchestraForms/OrchestraForms';
import { useFetchConcerts } from '../containers/controllers/concert/useFetchConcerts';
import { useFetchOrchestra } from '../containers/controllers/orchestra/useFetchOrchestra';
import { User } from '../containers/controllers/user/useFetchUserInfo';
import { QUERY } from '../containers/entities/query';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';

export const OrchestraManagementDetail: React.VFC = () => {
  const { data } = useFetchConcerts();
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
            {orchestraData && <OrchestraForms orchestra={orchestraData} />}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            {orchestraData && (
              <OrchestraMembersForm orchestraId={orchestraData.id} />
            )}
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <ConcertForm concerts={data?.concerts} />
          </TabPanel>
        </SwipeableViewsCustom>
      </>
    </Layout>
  );
};
