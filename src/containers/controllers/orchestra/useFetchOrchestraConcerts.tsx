import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { ConcertsResponse } from '../../../types';
import { fetchOrchestraConcerts } from '../../database/orchestra/fetchOrchestraConcerts';
import { QUERY } from '../../entities/query';

type Data = ConcertsResponse;
type UseFetchConcerts = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestraConcerts: UseFetchConcerts = (options) => {
  const params: { orchestraId: string } = useParams();
  const queryFn = () =>
    fetchOrchestraConcerts({ orchestraId: params.orchestraId });

  return useQuery([QUERY.concerts, params.orchestraId], queryFn, {
    ...options,
  });
};
