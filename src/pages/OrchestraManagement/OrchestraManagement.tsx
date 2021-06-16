import { Box, Container, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import image from '../../assets/orchestraCover.jpg';
import { CoverImage } from '../../components/helpers/CoverImage/CoverImage';
import { TabPanel } from '../../components/helpers/TabPanel/TabPanel';
import { Layout } from '../../components/layout/Layout';
import { ConcertForm } from '../../components/ui/ConcertForm/ConcertForm';
import { ImageUploadModal } from '../../components/ui/ImageUploadModal/ImageUploadModal';
import { ContentHeader } from '../../components/uiGroup/ContentHeader/ContentHeader';
import { MembersForm } from '../../components/uiGroup/MembersForm/MembersForm';
import { OrchestraForms } from '../../components/uiGroup/OrchestraForms/OrchestraForms';
import { useTab } from '../../utility/hooks/useTab';
import { useTitle } from '../../utility/hooks/useTitle';
import { useToggle } from '../../utility/hooks/useToggle';

export const OrchestraManagement: React.VFC = () => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  useTitle('SymphonyForum | ユーザーリスト');

  return (
    <Layout noPadding>
      <Container maxWidth={false}>
        <ContentHeader
          pageTitle="楽団運営"
          pageTitleOverline="ORCHESTRA MANAGEMENT"
        />
      </Container>
      <CoverImage
        title="大阪大学吹奏楽団"
        image={image}
        hasRadiusTop={false}
        editModal={() => handleIsModalOpen(true)}
      />
      <ImageUploadModal
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
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
