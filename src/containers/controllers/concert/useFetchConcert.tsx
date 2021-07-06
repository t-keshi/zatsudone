import firebase from 'firebase/app';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { ConcertResponse } from '../../../types';
import { fetchConcert } from '../../database/concert/fetchConcert';
import { QUERY } from '../../entities/query';

type FnData = ConcertResponse;
interface Data extends ConcertResponse {
  isUserLike: boolean;
}
type UseFetchConcert = (
  options?: UseQueryOptions<FnData, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchConcert: UseFetchConcert = (options) => {
  const params: { concertId: string } = useParams();
  const { concertId } = params;
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? undefined;

  const queryFn = () => fetchConcert(concertId);

  return useQuery([QUERY.concert, concertId], queryFn, {
    select: (data: FnData) => ({
      ...data,
      isUserLike: uid ? data.likes.includes(uid) : false,
    }),
    ...options,
  });
};
