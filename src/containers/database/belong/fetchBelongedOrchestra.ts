import firebase from 'firebase/app';

interface ParticipationResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
    part: string;
  };
  orchestraSnippets: {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
  };
}

export const fetchBelongedOrchestra = async (
  uid: string,
): Promise<ParticipationResponse[]> => {
  const db = firebase.firestore();
  const belongRef = db.collection(
    'belong',
  ) as firebase.firestore.CollectionReference<ParticipationResponse>;
  const belongRefFiltered = belongRef.where('userSnippets.uid', '==', uid);
  const querySnapshot = await belongRefFiltered.get();

  const orchestras = querySnapshot.docs.map((doc) => {
    const { id } = doc;
    const data = doc.data();

    return {
      id,
      userSnippets: {
        uid: data.userSnippets.uid,
        photoURL: data.userSnippets.photoURL,
        part: data.userSnippets.part,
      },
      orchestraSnippets: {
        id: data.orchestraSnippets.id,
        name: data.orchestraSnippets.name,
        description: data.orchestraSnippets.description,
        avatarUrl: data.orchestraSnippets.avatarUrl,
      },
    };
  });

  return orchestras;
};
