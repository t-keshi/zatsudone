import firebase from 'firebase/app';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
}
type Data = { orchestras: Orchestra[] };

export const fetchOrchestras = async (): Promise<Data> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection(
    'orchestra',
  ) as firebase.firestore.CollectionReference<Orchestra>;
  const querySnapshot = await orchestrasRef.get();
  const orchestras = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const orchestra = {
      id: doc.id,
      name: data.name,
      description: data.description,
    };

    return orchestra;
  });

  return { orchestras };
};
