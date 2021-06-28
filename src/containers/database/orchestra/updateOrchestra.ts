import firebase from 'firebase/app';

interface Variables {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  conductor?: string;
  subConductor?: string;
  homePage: string | null;
}

export const updateOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestraRef = db.collection('orchestra').doc(variables.id);

  await orchestraRef.update({
    name: variables.name,
    membersCount: variables.membersCount,
    conductor: variables.conductor,
    subConductor: variables.subConductor,
    homePage: variables.homePage,
  });
};
