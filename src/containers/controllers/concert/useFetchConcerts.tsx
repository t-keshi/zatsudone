import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { ConcertsResponse } from '../../../types';
import { fetchConcerts } from '../../database/concert/fetchConcerts';
import { Prefecture } from '../../entities/prefectures';
import { QUERY } from '../../entities/query';

type Data = ConcertsResponse;
type OrderBy = 'createdAt' | 'date';
interface Variables {
  orderBy?: OrderBy;
  prefecture?: Prefecture;
}
type UseFetchConcerts = (
  variables?: Variables,
  options?: UseQueryOptions<
    Data,
    unknown,
    Data,
    [string, OrderBy | undefined, string | undefined]
  >,
) => UseQueryResult<Data, unknown>;

export const useFetchConcerts: UseFetchConcerts = (variables, options) => {
  const queryFn = () => fetchConcerts(variables);

  return useQuery(
    [QUERY.concerts, variables?.orderBy, variables?.prefecture],
    queryFn,
    {
      ...options,
    },
  );
};
