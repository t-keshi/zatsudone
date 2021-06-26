import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { BASE_URL } from '../../../constants/env';
import { Prefecture } from '../../../constants/prefectures';
import { QUERY } from '../../../constants/query';
import { ConcertsResponse } from '../../../types';

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
  const queryFn = async () => {
    const response = await axios.get<Data>(`${BASE_URL}/concerts`, {
      params: {
        orderBy: variables?.orderBy,
        prefecture: variables?.prefecture,
      },
    });

    return response.data;
  };

  return useQuery(
    [QUERY.concerts, variables?.orderBy, variables?.prefecture],
    queryFn,
    {
      ...options,
    },
  );
};
