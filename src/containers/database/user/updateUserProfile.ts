import firebase from 'firebase/app';
import { uploadImage } from '../utilities/uploadImage';

interface Variables {
  uid: string;
  displayName: string;
  image?: File;
}

export const updateUserProfile = async (
  variables: Variables,
): Promise<void> => {
  const db = firebase.firestore();
  const userRef = db.collection('user').doc(variables.uid);
  if (variables.image) {
    const photoURL = await uploadImage(
      variables.image,
      `profile/${variables.uid}`,
    );
    await userRef.update({
      photoURL,
      displayName: variables.displayName,
    });
  } else {
    await userRef.update({
      displayName: variables.displayName,
    });
  }
};
