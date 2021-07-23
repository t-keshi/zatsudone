import React from 'react';
import { useFetchOrchestraConcerts } from '../../../containers/controllers/orchestra/useFetchOrchestraConcerts';
import { ConcertList } from '../../ui/ConcertList/ConcertList';

export const OrchestraConcert: React.VFC = () => {
  const { data: concertData } = useFetchOrchestraConcerts();

  return <ConcertList concerts={concertData?.concerts ?? undefined} />;
};
