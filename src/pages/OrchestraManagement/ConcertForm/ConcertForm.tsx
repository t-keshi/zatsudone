import { Box, Button, Divider } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { ConcertListItem } from '../../../components/ui/ConcertListItem/ConcertListItem';
import { useToggle } from '../../../utility/hooks/useToggle';
import { concertListResponse } from '../../RecentConcerts/ConcertList/dummy';
import { ConcertFormModal } from './ConcertFormModal';

export const ConcertForm: React.VFC = () => {
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button startIcon={<Add />} onClick={() => handleIsModalOpen(true)}>
          演奏会を追加
        </Button>
      </Box>
      <ConcertFormModal
        isModalOpen={isModalOpen}
        handleIsModalOpen={handleIsModalOpen}
      />
      {concertListResponse.map((concert, index) => (
        <Fragment key={concert.id}>
          <Box mt={2} />
          {index !== 0 && <Divider />}
          <Box mt={4} />
          <ConcertListItem concert={concert} />
        </Fragment>
      ))}
    </>
  );
};
