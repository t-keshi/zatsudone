import { Box, Tab, Tabs } from '@material-ui/core';
import { Add, InsertDriveFile } from '@material-ui/icons';
import React from 'react';
import coverImage from '../assets/orchestraCover.jpg';
import { ContainerSpacer } from '../components/helpers/ContainerSpacer/ContainerSpacer';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { NoItemMessage } from '../components/helpers/NoItemMessage/NoItemMessage';
import { SwipeableViewsCustom } from '../components/helpers/SwipeableViewsCustom/SwipeableViewsCustom';
import { TabPanel } from '../components/helpers/TabPanel/TabPanel';
import { Layout } from '../components/layout/Layout';
import { ConcertForm } from '../components/ui/ConcertForm/ConcertForm';
import { OrchestraFormModal } from '../components/ui/OrchestraForm/OrchestraFormModal';
import { OrchestraFormImage } from '../components/ui/OrchestraFormImage/OrchestraFormImage';
import { MembersForm } from '../components/uiGroup/MembersForm/MembersForm';
import { OrchestraForms } from '../components/uiGroup/OrchestraForms/OrchestraForms';
import { useFetchConcerts } from '../containers/controllers/concert/useFetchConcerts';
import { useFetchUserInfo } from '../containers/controllers/user/useFetchUserInfo';
import { useTab } from '../utility/hooks/useTab';
import { useTitle } from '../utility/hooks/useTitle';
import { useToggle } from '../utility/hooks/useToggle';

export const OrchestraManagement: React.VFC = () => {
  const { data } = useFetchConcerts();
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  const { data: userInfo } = useFetchUserInfo();
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  useTitle('SymphonyForum | 楽団運営');

  return (
    <Layout noPadding>
      <ContainerSpacer py={2}>
        <ContentHeader
          pageTitle="楽団運営"
          pageTitleOverline="ORCHESTRA MANAGEMENT"
        />
      </ContainerSpacer>
      {userInfo?.managementOrchestraId === undefined ? (
        <>
          <NoItemMessage
            heading="運営している楽団がありません"
            message="楽団を作成してください"
            icon={<InsertDriveFile />}
            actionLabel="楽団作成"
            actionButtonProps={{
              onClick: () => handleIsModalOpen(true),
              startIcon: <Add />,
            }}
          />
          <OrchestraFormModal
            isModalOpen={isModalOpen}
            closeModal={() => handleIsModalOpen(false)}
          />
        </>
      ) : (
        <>
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
          <SwipeableViewsCustom
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
          </SwipeableViewsCustom>
        </>
      )}
    </Layout>
  );
};
