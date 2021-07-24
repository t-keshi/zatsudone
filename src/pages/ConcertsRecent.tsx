import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { ContentHeader } from '../components/helpers/ContentHeader/ContentHeader';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { FilterByPrefecture } from '../components/ui/FilterByPrefeture/FilterByPrefecture';
import { useInfiniteFetchConcerts } from '../containers/controllers/concert/useInfiniteFetchConcerts';
import { Prefecture } from '../containers/entities/prefectures';
import { ROUTE_PATHS } from '../routes/type';
import { useIntersectionObserver } from '../utility/hooks/useIntersectionObserver';
import { useSelect } from '../utility/hooks/useSelect';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(3),
  },
  fetchMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export const ConcertsRecent: React.VFC = () => {
  const classes = useStyles();
  const [selectedPrefecture, handleSelectPrefecture] = useSelect<
    Prefecture | 'すべて'
  >('すべて');
  const { data, fetchNextPage, hasNextPage } = useInfiniteFetchConcerts({
    orderBy: 'createdAt',
    prefecture:
      selectedPrefecture === 'すべて' ? undefined : selectedPrefecture,
  });
  const ref = useRef<HTMLDivElement | null>(null);

  useTitle('SymphonyForum | 新着のコンサート');
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      if (hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  return (
    <Layout>
      <div className={classes.headerWrapper}>
        <ContentHeader
          pageTitle="新着のコンサート"
          pageTitleOverline="RECENT CONCERTS"
        />
        <FilterByPrefecture
          selectedPrefecture={selectedPrefecture}
          handleSelectPrefecture={handleSelectPrefecture}
        />
      </div>
      {data?.pages.map((page, index) => {
        const isFirst = index === 0;

        return page?.concerts && page?.concerts.length > 0 ? (
          <ConcertList
            key={page?.concerts[0].id}
            concerts={page?.concerts}
            isFirst={isFirst}
            linkParam={`/${ROUTE_PATHS.コンサート詳細.split('/')[1]}`}
          />
        ) : (
          <div />
        );
      }) ?? <ConcertList concerts={undefined} linkParam="" />}
      <div className={classes.fetchMoreWrapper} ref={ref}>
        <Button
          variant="text"
          color="default"
          size="small"
          startIcon={<KeyboardArrowDown />}
          style={{ visibility: hasNextPage ? 'visible' : 'hidden' }}
        >
          さらに取得
        </Button>
      </div>
    </Layout>
  );
};
