import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchOrchestra } from '../../database/orchestra/fetchOrchestra';
import { QUERY } from '../../entities/query';

export interface Orchestra {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
  coverUrl: string;
  avatarUrl: string;
}
type Data = Orchestra;
type UseFetchOrchestra = (
  orchestraId: string,
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestra: UseFetchOrchestra = (orchestraId, options) => {
  const queryFn = () => fetchOrchestra(orchestraId);

  return useQuery([QUERY.orchestra, orchestraId], queryFn, {
    ...options,
  });
};
