import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { updateOrchestra } from '../../database/orchestra/updateOrchestra';
import { QUERY } from '../../entities/query';

interface Variables {
  orchestraId: string;
  description?: string;
  membersCount?: number;
  conductor?: string;
  subConductor?: string;
  homePage?: string;
}
type Data = unknown;
type UseUpdateOrchestra = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateOrchestra: UseUpdateOrchestra = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const params: { orchestraId: string } = useParams();
  const mutate = (variables: Variables) => updateOrchestra(variables);

  return useMutation(mutate, {
    onSuccess: () =>
      queryClient.invalidateQueries([QUERY.orchestra, params.orchestraId]),
    onError: (error: Error) =>
      handleApiError(error, '楽団情報の変更に失敗しました'),
    ...options,
  });
};
