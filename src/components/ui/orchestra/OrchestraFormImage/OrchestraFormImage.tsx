import React from 'react';
import { useToggle } from '../../../../utility/hooks/useToggle';
import { CoverImage } from '../../../helpers/CoverImage/CoverImage';
import { OrchestraFormImageDialog } from './OrchestraFormImageDialog';

interface Props {
  name: string;
  coverImage: string;
  orchestraId: string;
}

export const OrchestraFormImage: React.VFC<Props> = ({
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
      <OrchestraFormImageDialog
        name={name}
        orchestraId={orchestraId}
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
      />
    </div>
  );
};
