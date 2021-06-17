import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
}
type Data = { orchestras: Orchestra[] };
type UseFetchConcerts = (
  options?: UseQueryOptions<Data, unknown, Data, string>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestras: UseFetchConcerts = (options) => {
  const queryFn = async () => {
    const response = await axios.get<Data>(`${BASE_URL}/orchestras`);

    return response.data;
  };

  return useQuery(QUERY.orchestras, queryFn, {
    ...options,
  });
};
