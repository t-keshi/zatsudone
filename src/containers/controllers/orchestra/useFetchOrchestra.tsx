import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { fetchOrchestra } from '../../database/orchestra/fetchOrchestra';
import { Prefecture } from '../../entities/prefectures';
import { QUERY } from '../../entities/query';

export interface Orchestra {
  id: string;
  name: string;
  prefecture: Prefecture;
  description: string;
  managementUserId: string;
  membersCount: number;
  conductor: string;
  subConductor: string;
  homePage: string;
  coverUrl: string;
  avatarUrl: string;
  notifications: string[];
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
