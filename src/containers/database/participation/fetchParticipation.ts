import firebase from 'firebase/app';
import { ConcertType } from '../../../types';

interface ParticipationResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
  };
  concertSnippets: ConcertType;
}

export const fetchParticipation = async (
  uid: string,
): Promise<ParticipationResponse[]> => {
  const db = firebase.firestore();
  const participationRef = db.collection(
    'participation',
  ) as firebase.firestore.CollectionReference<ParticipationResponse>;
  const participationRefFiltered = participationRef.where(
    'userSnippets.uid',
    '==',
    uid,
  );
  const participationRefOrdered = participationRefFiltered.orderBy(
    'concertSnippets.date',
    'desc',
  );
  const querySnapshot = await participationRefOrdered.get();

  const participants = querySnapshot.docs.map((doc) => {
    const { id } = doc;
    const data = doc.data();

    return {
      id,
      userSnippets: {
        uid: data.userSnippets.uid,
        photoURL: data.userSnippets.photoURL,
      },
      concertSnippets: {
        id: data.concertSnippets.id,
        title: data.concertSnippets.title,
        address: data.concertSnippets.address,
        placeId: data.concertSnippets.placeId,
        prefecture: data.concertSnippets.prefecture,
        date: (
          data.concertSnippets.date as unknown as firebase.firestore.Timestamp
        ).toDate(),
        symphonies: data.concertSnippets.symphonies,
        orchestra: data.concertSnippets.orchestra,
      },
    };
  });

  return participants;
};
