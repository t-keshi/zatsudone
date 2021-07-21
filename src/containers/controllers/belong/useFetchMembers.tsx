import firebase from 'firebase/app';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchMembers } from '../../database/belong/fetchMembers';
import { QUERY } from '../../entities/query';

export interface MemberResponse {
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
type FnData = MemberResponse[];
type Data = {
  members: MemberResponse[];
  isUserBelong: boolean;
};
type UseFetchMembers = (
  options?: UseQueryOptions<FnData, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchMembers: UseFetchMembers = (options) => {
  const params: { orchestraId: string } = useParams();
  const { orchestraId } = params;
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  const queryFn = () => fetchMembers(orchestraId);

  return useQuery([QUERY.belong, orchestraId], queryFn, {
    select: (data: FnData) => {
      const uids =
        data && data.length > 0
          ? data.map((datum) => datum.userSnippets.uid)
          : [];

      return {
        members: data,
        isUserBelong: uid ? Boolean(uids.includes(uid)) : false,
      };
    },
    ...options,
  });
};
