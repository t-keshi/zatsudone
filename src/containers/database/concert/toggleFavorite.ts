import firebase from 'firebase/app';
import { ConcertResponse } from '../../../types';

interface Variables {
  concertId: string;
  uid: string | undefined;
  toggle: 'add' | 'remove';
}

export const toggleFavorite = async (variables: Variables): Promise<void> => {
  if (variables.uid === undefined) {
    throw Error('Invalid value of uid');
  }

  const db = firebase.firestore();
  const concertsRef = db.collection(
    'concert',
  ) as firebase.firestore.CollectionReference<ConcertResponse>;
  const concertRef = concertsRef.doc(variables.concertId);
  if (variables.toggle === 'add') {
    await concertRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(variables.uid),
    });
  } else {
    await concertRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(variables.uid),
    });
  }
};
