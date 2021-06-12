import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';
import { OrchestrasResponse } from '../../../types';

type Data = OrchestrasResponse;
type UseFetchOrchestras = (
  options?: UseQueryOptions<Data, unknown, Data, string>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestras: UseFetchOrchestras = (options) => {
  const queryFn = async () => {
    const response = await axios.get<Data>(`${BASE_URL}/orchestras`);

    return response.data;
  };

  return useQuery(QUERY.concerts, queryFn, {
    ...options,
  });
};
