import { Tabs, Tab, Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { CoverImage } from '../../components/ui/CoverImage';
import { useTab } from '../../helpers/hooks/useTab';
import { useTitle } from '../../helpers/hooks/useTitle';
import { TabPanel } from '../../components/ui/TabPanel';
import { OrchestraConcerts } from './OrchestraConcerts/OrchestraConcerts';
import { OrchestraMembers } from './OrchestraMembers/OrchestraMembers';
import { OrchestraDetailInfo } from './OrchestraDetailInfo/OrchestraDetailInfo';

export const OrchestraDetail: React.VFC = () => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();

  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout noPadding>
      <CoverImage />
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
          <OrchestraDetailInfo />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <OrchestraMembers />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <OrchestraConcerts />
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};