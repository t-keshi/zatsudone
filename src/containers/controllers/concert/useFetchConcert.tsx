import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { QUERY } from '../../../constants/query';
import { ConcertResponse } from '../../../types';
import { fetchConcert } from '../../database/concert/fetchConcert';

type Data = ConcertResponse;
type UseFetchConcert = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchConcert: UseFetchConcert = (options) => {
  const params: { concertId: string } = useParams();
  const { concertId } = params;

  const queryFn = () => fetchConcert(concertId);

  return useQuery([QUERY.concerts, concertId], queryFn, {
    ...options,
  });
};
