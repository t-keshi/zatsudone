import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useQueryClient } from 'react-query';
import SwipeableViews from 'react-swipeable-views';
import image from '../../assets/orchestraCover.jpg';
import { CoverImage } from '../../components/helpers/CoverImage/CoverImage';
import { TabPanel } from '../../components/helpers/TabPanel/TabPanel';
import { Layout } from '../../components/layout/Layout';
import { OrchestraDetailInfo } from '../../components/ui/OrchestraDetailInfo/OrchestraDetailInfo';
import { OrchestraMembers } from '../../components/ui/OrchestraMembers/OrchestraMembers';
import { ConcertList } from '../../components/uiGroup/ConcertList/ConcertList';
import { QUERY } from '../../constants/query';
import { ConcertsResponse } from '../../types';
import { useTab } from '../../utility/hooks/useTab';
import { useTitle } from '../../utility/hooks/useTitle';

export const OrchestraDetail: React.VFC = () => {
  const { tabIndex, handleChangeTab, handleChangeTabBySwipe } = useTab();
  const queryClient = useQueryClient();
  const queryCache: ConcertsResponse | undefined = queryClient.getQueryData(
    QUERY.concerts,
  );

  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout noPadding>
      <CoverImage title="大阪大学吹奏楽団" image={image} />
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
          {queryCache !== undefined && (
            <ConcertList concerts={queryCache.concerts} />
          )}
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};
