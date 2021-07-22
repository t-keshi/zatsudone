import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchOrchestras } from '../../database/orchestra/fetchOrchestras';
import { Prefecture } from '../../entities/prefectures';
import { QUERY } from '../../entities/query';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}
type Data = { orchestras: Orchestra[] };
interface Variables {
  prefecture?: Prefecture;
}
type UseFetchConcerts = (
  variables?: Variables,
  options?: UseQueryOptions<Data, unknown, Data, [string, string | undefined]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestras: UseFetchConcerts = (variables, options) => {
  const queryFn = () => fetchOrchestras(variables);

  return useQuery(
    [QUERY.orchestras, variables?.prefecture ?? undefined],
    queryFn,
    {
      ...options,
    },
  );
};
