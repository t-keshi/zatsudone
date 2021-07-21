import firebase from 'firebase/app';

interface Orchestra {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
  coverUrl: string;
  avatarUrl: string;
  notifications: string[];
}
type OmitId<T = unknown> = Omit<T, 'id'>;

export const fetchOrchestra = async (
  orchestraId: string,
): Promise<Orchestra> => {
  const db = firebase.firestore();
  const orchestraRef = db.collection('orchestra').doc(orchestraId);
  const documentSnapshot = await orchestraRef.get();
  const { id } = documentSnapshot;
  const data = documentSnapshot.data() as OmitId<Orchestra>;

  const orchestra: Orchestra = {
    id,
    name: data.name,
    description: data.description,
    membersCount: data.membersCount,
    conductor: data.conductor,
    subConductor: data.subConductor,
    homePage: data.homePage,
    coverUrl: data.coverUrl,
    avatarUrl: data.avatarUrl,
    notifications: data.notifications,
  };

  return orchestra;
};
