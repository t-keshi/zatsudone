import firebase from 'firebase/app';

interface Variables {
  name: string;
  description: string;
}

export const createOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection('orchestra');
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  await orchestrasRef.add({
    name: variables.name,
    description: variables.description,
    managementUserId: uid,
  });
};
