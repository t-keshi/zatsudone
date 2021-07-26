import { Box, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useToggle } from '../../../../utility/hooks/useToggle';
import { OrchestraConcert } from './OrchestraConcert';
import { OrchestraConcertFormDialog } from './OrchestraConcertFormDialog';

export const OrchestraConcertForm: React.VFC = () => {
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

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
      <OrchestraConcert />
    </>
  );
};
