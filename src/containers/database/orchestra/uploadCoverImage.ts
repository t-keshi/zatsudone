import firebase from 'firebase/app';

interface Variables {
  imageName: string;
  imageDataUrl: string;
}

export const uploadCoverImage = async (variables: Variables): Promise<void> => {
  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child(variables.imageName);
  const uploadTask = imagesRef
    .putString(variables.imageDataUrl, 'data_url')
    .on('state_changed') as () => Promise<void>;
  await uploadTask();
};
