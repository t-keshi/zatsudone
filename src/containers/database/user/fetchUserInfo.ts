import firebase from 'firebase';

interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  managementOrchestraId: string;
  profile: string | undefined;
  twitterUserLink: string | undefined;
  facebookUserLink: string | undefined;
  userHomePage: string | undefined;
}

export const fetchUserInfo = async (): Promise<User> => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection(
    'user',
  ) as firebase.firestore.CollectionReference<User>;
  const userRef = usersRef.where('uid', '==', user?.uid ?? undefined);
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
    twitterUserLink: data.twitterUserLink,
    facebookUserLink: data.facebookUserLink,
    userHomePage: data.userHomePage,
  };

  return userInfo;
};
