import firebase from 'firebase/app';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { ConcertType } from '../../../types';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { fetchParticipants } from '../../database/participation/fetchParticipants';
import { QUERY } from '../../entities/query';

interface ParticipationResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
  };
  concertSnippets: ConcertType;
}
type FnData = ParticipationResponse[];
interface Data {
  participation: ParticipationResponse[];
  isUserParticipants: boolean;
}
type UseFetchParticipants = (
  options?: UseQueryOptions<FnData, Error, Data, [string, string]>,
) => UseQueryResult<Data, Error>;

export const useFetchParticipants: UseFetchParticipants = (options) => {
  const handleApiError = useHandleApiError();
  const params: { concertId: string } = useParams();
  const { concertId } = params;
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  const queryFn = () => fetchParticipants(concertId);

  return useQuery([QUERY.participation, concertId], queryFn, {
    select: (data: FnData) => {
      const uids =
        data && data.length > 0
          ? data.map((datum) => datum.userSnippets.uid)
          : [];

      return {
        participation: data,
        isUserParticipants: uid ? Boolean(uids.includes(uid)) : false,
      };
    },
    onError: (error: Error) =>
      handleApiError(error, '参加者の読み込みに失敗しました'),
    ...options,
  });
};
