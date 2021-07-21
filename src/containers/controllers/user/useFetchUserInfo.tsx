import firebase from 'firebase/app';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router';
import { fetchUserInfo } from '../../database/user/fetchUserInfo';
import { QUERY } from '../../entities/query';

export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  managementOrchestraId: string;
  profile: string | undefined;
  part: string | undefined;
  twitterUserLink: string | undefined;
  facebookUserLink: string | undefined;
  userHomePage: string | undefined;
}
type Data = User;
type UseFetchUserInfo = (
  options?: UseQueryOptions<Data, unknown, Data, [string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchUserInfo: UseFetchUserInfo = (options) => {
  const params: { uid: string | undefined } = useParams();
  const { currentUser } = firebase.auth();
  const myUid = currentUser?.uid ?? '';
  const uid = params.uid ?? myUid;
  const queryFn = () => fetchUserInfo(uid);

  return useQuery([QUERY.user], queryFn, {
    ...options,
  });
};
