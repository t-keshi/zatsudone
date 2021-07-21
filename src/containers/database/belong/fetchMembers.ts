import firebase from 'firebase/app';

interface MembersResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
    displayName: string;
    part: string;
  };
  orchestraSnippets: {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
  };
}

export const fetchMembers = async (
  orchestraId: string,
): Promise<MembersResponse[]> => {
  const db = firebase.firestore();
  const belongRef = db.collection(
    'belong',
  ) as firebase.firestore.CollectionReference<MembersResponse>;
  const belongRefFiltered = belongRef.where(
    'orchestraSnippets.id',
    '==',
    orchestraId,
  );
  const belongRefOrdered = belongRefFiltered.orderBy(
    'userSnippets.part',
    'asc',
  );
  const querySnapshot = await belongRefOrdered.get();
  const members = querySnapshot.docs.map((doc) => {
    const { id } = doc;
    const data = doc.data();

    return {
      id,
      userSnippets: {
        uid: data.userSnippets.uid,
        photoURL: data.userSnippets.photoURL,
        displayName: data.userSnippets.displayName,
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

  return members;
};
