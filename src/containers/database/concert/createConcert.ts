import firebase from 'firebase/app';

interface Variables {
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

export const createConcert = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const concertsRef = db.collection('concert');
  await concertsRef.add({
    title: variables.title,
    date: firebase.firestore.Timestamp.fromDate(variables.date),
    address: variables.address,
    placeId: variables.placeId,
    prefecture: variables.prefecture,
    symphonies: variables.symphonies,
    orchestra: variables.orchestra,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    programs: null,
    openAt: null,
    startAt: null,
    closeAt: null,
    likes: [],
    participants: [],
  });
};
