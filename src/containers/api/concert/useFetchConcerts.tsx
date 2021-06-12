import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';
import { ConcertsResponse } from '../../../types';

type Data = ConcertsResponse;
type UseFetchConcerts = (
  options?: UseQueryOptions<Data, unknown, Data, string>,
) => UseQueryResult<Data, unknown>;

export const useFetchConcerts: UseFetchConcerts = (options) => {
  const queryFn = async () => {
    const response = await axios.get<Data>(`${BASE_URL}/concerts`);

    return response.data;
  };

  return useQuery(QUERY.concerts, queryFn, {
    ...options,
  });
};
