import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchUserInfo } from '../../database/authentication/fetchUserInfo';
import { QUERY } from '../../entities/query';

export interface User {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
  managementOrchestraId: string;
  profile: string | undefined;
  twitterUserLink: string | undefined;
  facebookUserLink: string | undefined;
  userHomePage: string | undefined;
}
type Data = User;
type UseFetchUserInfo = (
  options?: UseQueryOptions<Data, unknown, Data, [string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchUserInfo: UseFetchUserInfo = (options) => {
  const queryFn = () => fetchUserInfo();

  return useQuery([QUERY.user], queryFn, {
    ...options,
  });
};
