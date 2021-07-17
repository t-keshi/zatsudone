import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import image from '../assets/orchestraCover.jpg';
import { CoverImage } from '../components/helpers/CoverImage/CoverImage';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { OrchestraDetailInfo } from '../components/ui/OrchestraDetailInfo/OrchestraDetailInfo';
import { OrchestraMembers } from '../components/ui/OrchestraMembers/OrchestraMembers';
import { useFetchConcerts } from '../containers/controllers/concert/useFetchConcerts';
import { useFetchOrchestra } from '../containers/controllers/orchestra/useFetchOrchestra';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';

export const OrchestraDetail: React.VFC = () => {
  const { data } = useFetchOrchestra();
  const { data: concertData } = useFetchConcerts();
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();

  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout noPadding>
      <CoverImage title={data?.name ?? ''} image={image} hasRadiusTop />
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
      <SwipeableViews
        axis="x"
        index={tabIndex}
        onChangeIndex={handleChangeTabBySwipe}
      >
        <TabPanel value={tabIndex} index={0}>
          <OrchestraDetailInfo orchestra={data} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <OrchestraMembers />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <ConcertList concerts={concertData?.concerts} />
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};
