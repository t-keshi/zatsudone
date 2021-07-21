import firebase from 'firebase/app';
import { pickBy } from '../../../utility/pickBy';

interface Variables {
  orchestraId: string;
  description?: string;
  membersCount?: number;
  conductor?: string;
  subConductor?: string;
  homePage?: string;
}

export const updateOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const orchestraRef = db.collection('orchestra').doc(variables.orchestraId);

  await orchestraRef.update(
    pickBy({
      description: variables.description,
      membersCount: variables.membersCount,
      conductor: variables.conductor,
      subConductor: variables.subConductor,
      homePage: variables.homePage,
    }),
  );
};
