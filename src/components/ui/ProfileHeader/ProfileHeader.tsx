import React from 'react';
import musicNote from '../../../assets/musicNote.png';
import { CoverImage } from '../../helpers/CoverImage/CoverImage';

interface Props {
  displayName: string;
  photoURL: string;
  hasRadiusTop?: boolean;
}

export const ProfileHeader: React.VFC<Props> = ({
  displayName,
  photoURL,
  hasRadiusTop,
}) => (
  <>
    <CoverImage
      title={displayName}
      image={musicNote}
      avatar={photoURL}
      hasRadiusTop={hasRadiusTop}
    />
  </>
);
