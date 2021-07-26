import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOrchestraConcerts } from '../../../../containers/controllers/orchestra/useFetchOrchestraConcerts';
import { ROUTE_PATHS } from '../../../../routes/type';
import { ConcertList } from '../../concerts/ConcertList/ConcertList';

export const OrchestraConcert: React.VFC = () => {
  const { data: concertData } = useFetchOrchestraConcerts();
  const params: { orchestraId: string } = useParams();

  return (
    <ConcertList
      concerts={concertData?.concerts ?? undefined}
      linkParam={`/${ROUTE_PATHS.楽団運営コンサート編集.split('/')[1]}/${
        params.orchestraId
      }`}
    />
  );
};
