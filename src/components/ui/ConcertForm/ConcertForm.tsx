import { Box, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { ConcertsResponse } from '../../../types';
import { useToggle } from '../../../utility/hooks/useToggle';
import { ConcertList } from '../ConcertList/ConcertList';
import { ConcertFormModal } from './ConcertFormModal';

interface Props {
  concerts: ConcertsResponse['concerts'] | undefined;
}

export const ConcertForm: React.VFC<Props> = ({ concerts }) => {
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button startIcon={<Add />} onClick={() => handleIsModalOpen(true)}>
          演奏会の作成
        </Button>
      </Box>
      <ConcertFormModal
        isModalOpen={isModalOpen}
        handleIsModalOpen={handleIsModalOpen}
      />
      <ConcertList concerts={concerts} />
    </>
  );
};
