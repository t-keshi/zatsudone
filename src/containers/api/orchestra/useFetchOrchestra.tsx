import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';
import { OrchestraResponse } from '../../../types';

type Data = OrchestraResponse;
type UseFetchOrchestras = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestras: UseFetchOrchestras = (options) => {
  const params: { id: string } = useParams();
  const { id } = params;

  const queryFn = async () => {
    const response = await axios.get<Data>(`${BASE_URL}/orchestras/${id}`);

    return response.data;
  };

  return useQuery([QUERY.concerts, id], queryFn, {
    ...options,
  });
};
