import imageCompression from 'browser-image-compression';
import firebase from 'firebase/app';

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
    const compressed = await imageCompression(variables.image, {
      maxSizeMB: 3,
    });
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(`profile/${variables.uid}`);
    const uploadTask = await imagesRef.put(compressed);
    const photoURL = (await uploadTask.ref.getDownloadURL()) as string;
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
