import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import coverImage from '../assets/orchestraCover.jpg';
import { CoverImage } from '../components/helpers/CoverImage/CoverImage';
import { SwipeableViewsCustom } from '../components/helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { OrchestraConcert } from '../components/ui/orchestra/OrchestraConcert/OrchestraConcert';
import { OrchestraDetailInfo } from '../components/ui/orchestra/OrchestraInfo/OrchestraInfo';
import { OrchestraMembers } from '../components/ui/orchestra/OrchestraMembers/OrchestraMembers';
import { useFetchOrchestra } from '../containers/controllers/orchestra/useFetchOrchestra';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';

export const OrchestraDetail: React.VFC = () => {
  const params: { orchestraId: string } = useParams();
  const { data } = useFetchOrchestra(params.orchestraId);
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();

  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout noPadding>
      <CoverImage
        title={data?.name ?? ''}
        image={data?.coverUrl ?? coverImage}
        hasRadiusTop
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
      <Box mt={2} />
      <SwipeableViewsCustom
        index={tabIndex}
        onChangeIndex={handleChangeTabBySwipe}
      >
        <TabPanel value={tabIndex} index={0}>
          <OrchestraDetailInfo orchestra={data} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <OrchestraMembers orchestra={data} />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <OrchestraConcert />
        </TabPanel>
      </SwipeableViewsCustom>
    </Layout>
  );
};
