import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { FilterByPrefecture } from '../components/ui/FilterByPrefeture/FilterByPrefecture';
import { useFetchConcerts } from '../containers/controllers/concert/useFetchConcerts';
import { Prefecture } from '../containers/entities/prefectures';
import { useSelect } from '../utility/hooks/useSelect';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(3),
  },
}));

export const ConcertsUpcoming: React.VFC = () => {
  const classes = useStyles();
  const [selectedPrefecture, handleSelectPrefecture] = useSelect<
    Prefecture | 'すべて'
  >('すべて');
  const { data } = useFetchConcerts({
    orderBy: 'date',
    prefecture:
      selectedPrefecture === 'すべて' ? undefined : selectedPrefecture,
  });

  useTitle('SymphonyForum | 近日中のコンサート');

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
      <ConcertList concerts={data?.concerts} />
    </Layout>
  );
};
