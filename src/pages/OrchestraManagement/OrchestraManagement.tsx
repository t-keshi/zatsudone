import { Box, Typography, Tabs, Tab, Container } from '@material-ui/core';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Layout } from '../../components/layout/Layout';
import { useTitle } from '../../helpers/hooks/useTitle';
import { useTab } from '../../helpers/hooks/useTab';
import { TabPanel } from '../../components/ui/TabPanel';
import { OrchestraForms } from './OrchestraForm/OrchestraForms';
import { MembersForm } from './MembersForm/MembersForm';
import { ConcertForm } from './ConcertForm/ConcertForm';
import { CoverImage } from '../../components/ui/CoverImage';

export const OrchestraManagement: React.VFC = () => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();

  useTitle('SymphonyForum | ユーザーリスト');

  return (
    <Layout noPadding>
      <Container maxWidth={false}>
        <Box py={2}>
          <Typography variant="overline">ORCHESTRA MANAGEMENT </Typography>
          <Typography variant="h5">楽団運営</Typography>
        </Box>
      </Container>
      <CoverImage isTopImage={false} />
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
          <ConcertForm />
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};
