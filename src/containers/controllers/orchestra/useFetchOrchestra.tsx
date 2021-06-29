import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
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
}
type Data = Orchestra;
type UseFetchOrchestra = (
  options?: UseQueryOptions<Data, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

export const useFetchOrchestra: UseFetchOrchestra = (options) => {
  const params: { orchestraId: string } = useParams();
  const { orchestraId } = params;
  const queryFn = () => fetchOrchestra(orchestraId);

  return useQuery([QUERY.orchestra, orchestraId], queryFn, {
    ...options,
  });
};
