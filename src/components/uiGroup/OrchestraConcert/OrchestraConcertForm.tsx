import { Box, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useFetchConcerts } from '../../../containers/controllers/concert/useFetchConcerts';
import { useToggle } from '../../../utility/hooks/useToggle';
import { ConcertList } from '../../ui/ConcertList/ConcertList';
import { OrchestraConcertFormModal } from './OrchestraConcertFormModal';

export const OrchestraConcertForm: React.VFC = () => {
  const { data } = useFetchConcerts();
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button startIcon={<Add />} onClick={() => handleIsModalOpen(true)}>
          演奏会の作成
        </Button>
      </Box>
      <OrchestraConcertFormModal
        isModalOpen={isModalOpen}
        handleIsModalOpen={handleIsModalOpen}
      />
      <ConcertList concerts={data?.concerts ?? undefined} />
    </>
  );
};