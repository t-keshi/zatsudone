import firebase from 'firebase/app';

interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  managementOrchestraId: string;
  profile: string | undefined;
  part: string;
  twitterUserLink: string | undefined;
  facebookUserLink: string | undefined;
  userHomePage: string | undefined;
}

export const fetchUserInfo = async (uid: string): Promise<User> => {
  const db = firebase.firestore();
  const usersRef = db.collection(
    'user',
  ) as firebase.firestore.CollectionReference<User>;
  const userRef = usersRef.where('uid', '==', uid ?? undefined);
  const documentSnapshot = await userRef.get();
  const data = documentSnapshot.docs[0].data();

  if (!data) {
    throw Error('data not found');
  }

  const userInfo = {
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    uid: data.uid,
    managementOrchestraId: data.managementOrchestraId,
    profile: data.profile,
    part: data.part,
    twitterUserLink: data.twitterUserLink,
    facebookUserLink: data.facebookUserLink,
    userHomePage: data.userHomePage,
  };

  return userInfo;
};
