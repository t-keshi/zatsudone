import React from 'react';
import { useToggle } from '../../../../utility/hooks/useToggle';
import { CoverImage } from '../../../helpers/CoverImage/CoverImage';
import { ConcertFlayerFormDialog } from './ConcertFlayerFormDialog';

interface Props {
  name: string;
  coverImage: string;
  orchestraId: string;
}

export const ConcertFlayerForm: React.VFC<Props> = ({
  name,
  coverImage,
  orchestraId,
}) => {
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  return (
    <div>
      <CoverImage
        title={name}
        image={coverImage}
        editModal={() => handleIsModalOpen(true)}
      />
      <ConcertFlayerFormDialog
        name={name}
        orchestraId={orchestraId}
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
      />
    </div>
  );
};
