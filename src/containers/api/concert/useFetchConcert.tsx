import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';
import { ConcertResponse } from '../../../types';

type Data = ConcertResponse;
type UseFetchConcert = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchConcert: UseFetchConcert = (options) => {
  const params: { concertId: string } = useParams();
  const { concertId } = params;

  const queryFn = async () => {
    const response = await axios.get<Data>(
      `${BASE_URL}/concerts/${concertId}`,
      {
        params: {
          prefecture: 'all',
        },
      },
    );

    return response.data;
  };

  return useQuery([QUERY.concerts, concertId], queryFn, {
    ...options,
  });
};
