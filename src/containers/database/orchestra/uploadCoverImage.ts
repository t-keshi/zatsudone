import firebase from 'firebase/app';
import { pickBy } from '../../../utility/pickBy';
import { uploadImage } from '../utilities/uploadImage';

interface Variables {
  name: string;
  orchestraId: string;
  coverImage?: File;
  avatarImage?: File;
}

export const uploadCoverImage = async ({
  name,
  orchestraId,
  coverImage,
  avatarImage,
}: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestraRef = db.collection('orchestra').doc(orchestraId);
  const coverUrl = coverImage
    ? await uploadImage(coverImage, `orchestraCover/${orchestraId}`)
    : undefined;
  const avatarUrl = avatarImage
    ? await uploadImage(avatarImage, `orchestraAvatar/${orchestraId}`)
    : undefined;

  await orchestraRef.update(pickBy({ name, coverUrl, avatarUrl }));
};
