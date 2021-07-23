import firebase from 'firebase/app';
import { ConcertsResponse, ConcertType } from '../../../types';
import { Prefecture } from '../../entities/prefectures';

type OrderBy = 'createdAt' | 'date';
interface Variables {
  orderBy?: OrderBy;
  prefecture?: Prefecture;
}
interface FetchConcertsReturnType {
  concerts: ConcertsResponse['concerts'];
  lastConcert: firebase.firestore.QueryDocumentSnapshot<ConcertType>;
  isLast: boolean;
}

export const fetchConcerts = async (
  variables: Variables | undefined,
  lastVisible?: firebase.firestore.QueryDocumentSnapshot<ConcertType>,
): Promise<FetchConcertsReturnType> => {
  const db = firebase.firestore();
  const concertsRef = db.collection(
    'concert',
  ) as firebase.firestore.CollectionReference<ConcertType>;
  const concertRefFiltered =
    variables?.prefecture === undefined
      ? concertsRef
      : concertsRef.where('prefecture', '==', variables.prefecture);
  const concertRefOrdered =
    variables?.orderBy === undefined
      ? concertRefFiltered
      : concertRefFiltered.orderBy(variables.orderBy, 'desc');
  const concertRefPaginated =
    lastVisible === undefined
      ? concertRefOrdered.limit(30)
      : concertRefOrdered.startAfter(lastVisible).limit(3);
  const querySnapshot = await concertRefPaginated.get();
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
