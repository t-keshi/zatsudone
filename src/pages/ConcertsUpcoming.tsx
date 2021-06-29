import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import React, { useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { FilterByPrefecture } from '../components/ui/FilterByPrefeture/FilterByPrefecture';
import { useInfiniteFetchConcerts } from '../containers/controllers/concert/useInfiniteFetchConcerts';
import { Prefecture } from '../containers/entities/prefectures';
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

export const ConcertsUpcoming: React.VFC = () => {
  const classes = useStyles();
  const [selectedPrefecture, handleSelectPrefecture] = useSelect<
    Prefecture | 'すべて'
  >('すべて');
  const { data, fetchNextPage, hasNextPage } = useInfiniteFetchConcerts({
    orderBy: 'date',
    prefecture:
      selectedPrefecture === 'すべて' ? undefined : selectedPrefecture,
  });
  const ref = useRef<HTMLDivElement | null>(null);

  useTitle('SymphonyForum | 近日中のコンサート');

  useIntersectionObserver({
    target: ref,
    onIntersect: () => {
      if (hasNextPage) {
        void fetchNextPage();
      }
    },
  });

  return (
    <Layout hasPageTransition>
      <div className={classes.headerWrapper}>
        <ContentHeader
          pageTitle="近日中のコンサート"
          pageTitleOverline="UPCOMING CONCERTS"
        />
        <FilterByPrefecture
          selectedPrefecture={selectedPrefecture}
          handleSelectPrefecture={handleSelectPrefecture}
        />
      </div>
      {data?.pages.map((page) =>
        page.concerts.length > 0 ? (
          <ConcertList key={page.concerts[0].id} concerts={page.concerts} />
        ) : (
          <div />
        ),
      ) ?? <ConcertList concerts={undefined} />}
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
