import firebase from 'firebase/app';
import { Prefecture } from '../../entities/prefectures';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}
interface Variables {
  prefecture?: Prefecture;
}
type Data = { orchestras: Orchestra[] };

export const fetchOrchestras = async (
  variables: Variables | undefined,
): Promise<Data> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection(
    'orchestra',
  ) as firebase.firestore.CollectionReference<Orchestra>;
  const concertRefFiltered =
    variables?.prefecture === undefined
      ? orchestrasRef
      : orchestrasRef.where('prefecture', '==', variables.prefecture);
  const querySnapshot = await concertRefFiltered.get();
  const orchestras = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const orchestra = {
      id: doc.id,
      name: data.name,
      description: data.description,
      avatarUrl: data.avatarUrl,
    };

    return orchestra;
  });

  return { orchestras };
};
