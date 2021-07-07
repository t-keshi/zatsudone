import firebase from 'firebase';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY } from '../../entities/query';

export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  managementOrchestraId: string;
  twitterUserLink: string | undefined;
  facebookUserLink: string | undefined;
}
type Data = User;
type UseFetchUserInfo = (
  options?: UseQueryOptions<Data, unknown, Data, [string]>,
) => UseQueryResult<Data, unknown>;

const fetchUserInfo = async () => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const usersRef = db.collection(
    'user',
  ) as firebase.firestore.CollectionReference<User>;
  const userRef = usersRef.where('uid', '==', user?.uid ?? undefined);
  const documentSnapshot = await userRef.get();
  const data = documentSnapshot.docs[0].data();

  if (!data) {
    throw Error('data not found');
  }

  const userInfo = {
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    uid: data.uid,
    managementOrchestraId: data.managementOrchestraId,
    twitterUserLink: data.twitterUserLink,
    facebookUserLink: data.facebookUserLink,
  };

  return userInfo;
};

export const useFetchUserInfo: UseFetchUserInfo = (options) => {
  const queryFn = () => fetchUserInfo();

  return useQuery([QUERY.user], queryFn, {
    ...options,
  });
};
