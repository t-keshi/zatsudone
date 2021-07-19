import firebase from 'firebase/app';
import { ConcertType } from '../../../types';

interface Variables {
  concert: ConcertType;
  toggle: 'add' | 'remove';
}

interface Participation {
  concertSnippets: ConcertType;
  userSnippets: {
    uid: string;
    photoURL: string;
  };
}

export const participateConcert = async (
  variables: Variables,
): Promise<void> => {
  const db = firebase.firestore();
  const participationRef = db.collection(
    'participation',
  ) as firebase.firestore.CollectionReference<Participation>;
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? '';
  const photoURL = currentUser?.photoURL ?? '';
  if (variables.toggle === 'add') {
    await participationRef.add({
      concertSnippets: {
        id: variables.concert.id,
        title: variables.concert.title,
        address: variables.concert.address,
        placeId: variables.concert.placeId,
        prefecture: variables.concert.prefecture,
        date: variables.concert.date,
        symphonies: variables.concert.symphonies,
        orchestra: variables.concert.orchestra,
      },
      userSnippets: {
        uid,
        photoURL,
      },
    });
  } else {
    const participationItemRef = participationRef
      .where('userSnippets.uid', '==', uid)
      .where('concertSnippets.id', '==', variables.concert.id);
    const querySnapshot = await participationItemRef.get();
    const queryDocumentSnapshot = querySnapshot.docs[0];
    await queryDocumentSnapshot.ref.delete();
  }
};
