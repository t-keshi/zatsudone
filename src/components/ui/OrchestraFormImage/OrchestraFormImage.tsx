import React from 'react';
import { useToggle } from '../../../utility/hooks/useToggle';
import { CoverImage } from '../../helpers/CoverImage/CoverImage';
import { OrchestraFormImageModal } from './OrchestraFormImageModal';

interface Props {
  image: string;
}

export const OrchestraFormImage: React.VFC<Props> = ({ image }) => {
  const [isModalOpen, handleIsModalOpen] = useToggle(false);

  return (
    <div>
      <CoverImage
        title="大阪大学吹奏楽団"
        image={image}
        editModal={() => handleIsModalOpen(true)}
      />
      <OrchestraFormImageModal
        isModalOpen={isModalOpen}
        closeModal={() => handleIsModalOpen(false)}
      />
    </div>
  );
};
