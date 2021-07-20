import imageCompression from 'browser-image-compression';
import firebase from 'firebase/app';

export const uploadImage = async (
  image: File,
  storagePath: string,
): Promise<string> => {
  const compressed = await imageCompression(image, {
    maxSizeMB: 1,
  });
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child(storagePath);
  const uploadTask = await imagesRef.put(compressed);
  const photoURL = (await uploadTask.ref.getDownloadURL()) as string;

  return photoURL;
};
