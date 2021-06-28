import { Box, Container, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import coverImage from '../assets/orchestraCover.jpg';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { ConcertForm } from '../components/ui/ConcertForm/ConcertForm';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { OrchestraFormImage } from '../components/ui/OrchestraFormImage/OrchestraFormImage';
import { MembersForm } from '../components/uiGroup/MembersForm/MembersForm';
import { OrchestraForms } from '../components/uiGroup/OrchestraForms/OrchestraForms';
import { useFetchConcerts } from '../containers/controllers/concert/useFetchConcerts';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';

export const OrchestraManagement: React.VFC = () => {
  const { data } = useFetchConcerts();
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();

  useTitle('SymphonyForum | 楽団運営');

  return (
    <Layout noPadding>
      <Container maxWidth={false}>
        <Box py={2}>
          <ContentHeader
            pageTitle="楽団運営"
            pageTitleOverline="ORCHESTRA MANAGEMENT"
          />
        </Box>
      </Container>
      <OrchestraFormImage image={coverImage} />
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
          <OrchestraForms />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <MembersForm />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <ConcertForm concerts={data?.concerts} />
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};