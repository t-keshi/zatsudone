import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ConcertList } from '../components/ui/ConcertList/ConcertList';
import { ContentHeader } from '../components/ui/ContentHeader/ContentHeader';
import { FilterByPrefecture } from '../components/ui/FilterByPrefeture/FilterByPrefecture';
import { Prefecture } from '../constants/prefectures';
import { useFetchConcerts } from '../containers/api/concert/useFetchConcerts';
import { useSelect } from '../utility/hooks/useSelect';
import { useTitle } from '../utility/hooks/useTitle';

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(3),
  },
  filterWrapper: {
    marginLeft: 'auto',
  },
}));

export const ConcertsRecent: React.VFC = () => {
  const classes = useStyles();
  const [selectedPrefecture, handleSelectPrefecture] = useSelect<
    Prefecture | 'すべて'
  >('すべて');
  const { data } = useFetchConcerts({
    orderBy: 'createdAt',
    prefecture:
      selectedPrefecture === 'すべて' ? undefined : selectedPrefecture,
  });

  useTitle('SymphonyForum | 新着のコンサート');

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
      <ConcertList concerts={data?.concerts} />
    </Layout>
  );
};
