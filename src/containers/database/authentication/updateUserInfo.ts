import firebase from 'firebase/app';
import { pickBy } from '../../../utility/pickBy';

interface Variables {
  profile?: string;
  userHomePage?: string;
  instrument?: string;
}

export const updateUserInfo = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid;
  try {
    const userRef = db.collection('user').doc(uid);
    await userRef.update(pickBy(variables));
  } catch (error) {
    console.warn(error);
  }
};
