import { Box, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchConcerts } from '../../../../containers/controllers/concert/useFetchConcerts';
import { ROUTE_PATHS } from '../../../../routes/type';
import { useToggle } from '../../../../utility/hooks/useToggle';
import { ConcertList } from '../../concerts/ConcertList/ConcertList';
import { OrchestraConcertFormDialog } from './OrchestraConcertFormDialog';

export const OrchestraConcertForm: React.VFC = () => {
  const { data } = useFetchConcerts();
  const [isModalOpen, handleIsModalOpen] = useToggle(false);
  const params: { orchestraId: string } = useParams();

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button startIcon={<Add />} onClick={() => handleIsModalOpen(true)}>
          演奏会の作成
        </Button>
      </Box>
      <OrchestraConcertFormDialog
        isModalOpen={isModalOpen}
        handleIsModalOpen={handleIsModalOpen}
      />
      <ConcertList
        concerts={data?.concerts ?? undefined}
        linkParam={`/${ROUTE_PATHS.楽団運営コンサート編集.split('/')[1]}/${
          params.orchestraId
        }`}
      />
    </>
  );
};
