import firebase from 'firebase/app';
import { Orchestra } from '../../controllers/orchestra/useFetchOrchestra';
import { Prefecture } from '../../entities/prefectures';

interface Variables {
  name: string;
  description: string;
  prefecture: Prefecture;
}

export const createOrchestra = async (
  variables: Variables,
): Promise<Orchestra> => {
  const db = firebase.firestore();
  const orchestrasRef = db.collection('orchestra');
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  const response = (await orchestrasRef.add({
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
  })) as firebase.firestore.DocumentReference<Orchestra>;

  const res = await response.get();
  const data = res.data();
  const newId = response.id;

  return {
    id: newId,
    name: data?.name ?? '',
    description: data?.description ?? '',
    prefecture: data?.prefecture ?? '東京都',
    managementUserId: data?.managementUserId ?? '',
    avatarUrl: data?.avatarUrl ?? '',
    coverUrl: data?.coverUrl ?? '',
    conductor: data?.conductor ?? '',
    subConductor: data?.subConductor ?? '',
    homePage: data?.homePage ?? '',
    membersCount: data?.membersCount ?? 0,
    notifications: data?.notifications ?? [],
  };
};
