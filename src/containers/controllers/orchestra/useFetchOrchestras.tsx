import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY } from '../../../constants/query';
import { fetchOrchestras } from '../../database/orchestra/fetchOrchestras';

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
  const queryFn = () => fetchOrchestras();

  return useQuery(QUERY.orchestras, queryFn, {
    ...options,
  });
};
