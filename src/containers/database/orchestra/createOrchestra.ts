import firebase from 'firebase/app';
import { Prefecture } from '../../entities/prefectures';

interface Variables {
  name: string;
  description: string;
  prefecture: Prefecture;
}

export const createOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection('orchestra');
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  await orchestrasRef.add({
    name: variables.name,
    description: variables.description,
    prefecture: variables.prefecture,
    managementUserId: uid,
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/symphony-forum.appspot.com/o/orchestraAvatar%2FmusicNote.png?alt=media&token=aa3f5354-2f7b-41d7-b7c9-4e67dd45e667',
    coverUrl:
      'https://firebasestorage.googleapis.com/v0/b/symphony-forum.appspot.com/o/orchestraCover%2ForchestraCover.jpg?alt=media&token=ffcfe84d-09b3-4c98-a3a6-d6ceff5dee8d',
    conductor: '',
    subConductor: '',
    homePage: '',
    membersCount: null,
    notifications: [],
  });
};
