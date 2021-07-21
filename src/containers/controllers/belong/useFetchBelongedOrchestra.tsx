import firebase from 'firebase/app';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { ConcertType } from '../../../types';
import { fetchParticipation } from '../../database/participation/fetchParticipation';
import { QUERY } from '../../entities/query';

interface ParticipationResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
  };
  concertSnippets: ConcertType;
}
type FnData = ParticipationResponse[];
type Data = ParticipationResponse[];
type UseFetchParticipants = (
  options?: UseQueryOptions<FnData, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchParticipation: UseFetchParticipants = (options) => {
  const params: { uid: string | undefined } = useParams();
  const { currentUser } = firebase.auth();
  const myPageUid = currentUser?.uid ?? '';
  const uid = params.uid ?? myPageUid;

  const queryFn = () => fetchParticipation(uid);

  return useQuery([QUERY.belong, uid], queryFn, {
    ...options,
  });
};
