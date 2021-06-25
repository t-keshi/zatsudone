import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/env';
import { Prefecture } from '../../../constants/prefectures';
import { QUERY } from '../../../constants/query';
import { ConcertResponse } from '../../../types';

type Data = ConcertResponse;
interface Variables {
  orderBy?: 'updateTime' | 'date';
  prefecture?: Prefecture;
}
type UseFetchConcert = (
  variables?: Variables,
  options?: UseQueryOptions<
    Data,
    unknown,
    Data,
    [string, string | undefined, string | undefined]
  >,
) => UseQueryResult<Data, unknown>;

export const useFetchConcert: UseFetchConcert = (variables, options) => {
  const params: { concertId: string } = useParams();
  const { concertId } = params;

  const queryFn = async () => {
    const response = await axios.get<Data>(
      `${BASE_URL}/concerts/${concertId}`,
      {
        params: {
          orderBy: variables?.orderBy,
          prefecture: variables?.prefecture,
        },
      },
    );

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
