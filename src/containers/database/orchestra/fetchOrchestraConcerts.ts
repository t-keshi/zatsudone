import firebase from 'firebase/app';
import { ConcertsResponse, ConcertType } from '../../../types';

interface Variables {
  orchestraId: string;
}
interface FetchConcertsReturnType {
  concerts: ConcertsResponse['concerts'];
  lastConcert: firebase.firestore.QueryDocumentSnapshot<ConcertType>;
  isLast: boolean;
}

export const fetchOrchestraConcerts = async (
  variables: Variables,
): Promise<FetchConcertsReturnType> => {
  const db = firebase.firestore();
  const concertsRef = db.collection(
    'concert',
  ) as firebase.firestore.CollectionReference<ConcertType>;
  const concertRefFiltered = concertsRef.where(
    'orchestra.id',
    '==',
    variables.orchestraId,
  );
  const concertRefOrdered = concertRefFiltered.orderBy('date', 'desc');
  const querySnapshot = await concertRefOrdered.get();
  const concerts = querySnapshot.docs.map((doc) => {
    const { id } = doc;
    const data = doc.data();

    return {
      id,
      title: data.title,
      address: data.address,
      placeId: data.placeId,
      prefecture: data.prefecture,
      date: (data.date as unknown as firebase.firestore.Timestamp).toDate(),
      symphonies: data.symphonies,
      orchestra: data.orchestra,
    };
  });
  const lastConcert = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { concerts, lastConcert, isLast: lastConcert === undefined };
};
