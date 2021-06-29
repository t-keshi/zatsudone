import firebase from 'firebase/app';
import { ConcertsResponse, ConcertType } from '../../../types';
import { Prefecture } from '../../entities/prefectures';

type OrderBy = 'createdAt' | 'date';
interface Variables {
  orderBy?: OrderBy;
  prefecture?: Prefecture;
}

export const fetchConcerts = async (
  variables: Variables | undefined,
): Promise<ConcertsResponse> => {
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
      date: ((data.date as unknown) as firebase.firestore.Timestamp).toDate(),
      symphonies: data.symphonies,
      orchestra: data.orchestra,
    };
  });

  return { concerts };
};
