import firebase from 'firebase/app';

interface Variables {
  name: string;
}

export const createOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection('orchestra');

  await orchestrasRef.add({
    name: variables.name,
  });
};
