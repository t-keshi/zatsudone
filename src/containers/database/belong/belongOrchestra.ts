import firebase from 'firebase/app';
import { Orchestra } from '../../controllers/orchestra/useFetchOrchestra';

interface Variables {
  orchestra: Orchestra;
  uid: string;
  photoURL: string;
  displayName: string;
  part: string;
  toggle: 'add' | 'remove';
}

interface Belong {
  orchestraSnippets: {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
  };
  userSnippets: {
    uid: string;
    photoURL: string;
    displayName: string;
    part: string;
  };
}

export const belongOrchestra = async (variables: Variables): Promise<void> => {
  const db = firebase.firestore();
  const belongRef = db.collection(
    'belong',
  ) as firebase.firestore.CollectionReference<Belong>;
  if (variables.toggle === 'add') {
    await belongRef.add({
      orchestraSnippets: {
        id: variables.orchestra.id,
        name: variables.orchestra.name,
        description: variables.orchestra.description,
        avatarUrl: variables.orchestra.avatarUrl,
      },
      userSnippets: {
        uid: variables.uid,
        photoURL: variables.photoURL,
        displayName: variables.displayName,
        part: variables.part,
      },
    });
  } else {
    const belongItemRef = belongRef
      .where('userSnippets.uid', '==', variables.uid)
      .where('orchestraSnippets.id', '==', variables.orchestra.id);
    const querySnapshot = await belongItemRef.get();
    const queryDocumentSnapshot = querySnapshot.docs[0];
    await queryDocumentSnapshot.ref.delete();
  }
};
