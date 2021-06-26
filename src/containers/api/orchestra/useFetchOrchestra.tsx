import axios from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants/env';
import { QUERY } from '../../../constants/query';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
}
type Data = Orchestra;
type UseFetchOrchestra = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestra: UseFetchOrchestra = (options) => {
  const params: { orchestraId: string } = useParams();
  const { orchestraId } = params;
  const queryFn = async () => {
    const response = await axios.get<Data>(
      `${BASE_URL}/orchestras/${orchestraId}`,
    );

    return response.data;
  };

  return useQuery([QUERY.orchestra, orchestraId], queryFn, {
    ...options,
  });
};
