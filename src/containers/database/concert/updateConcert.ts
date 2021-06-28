import firebase from 'firebase/app';

interface Variables {
  id: string;
  title: string;
  date: Date;
  address: string;
  placeId: string;
  prefecture: string | null;
  symphonies: string[];
  orchestra: {
    id: string;
    name: string;
  };
}

export const updateConcert = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const concertRef = db.collection('concert').doc(variables.id);
  await concertRef.update({
    title: variables.title,
    date: firebase.firestore.Timestamp.fromDate(variables.date),
    address: variables.address,
    placeId: variables.placeId,
    prefecture: variables.prefecture,
    symphonies: variables.symphonies,
    orchestra: variables.orchestra,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
