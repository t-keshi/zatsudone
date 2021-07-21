import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
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
  const mutate = (variables: Variables) => updateOrchestra(variables);

  return useMutation(mutate, {
    onSuccess: () => queryClient.invalidateQueries([QUERY.orchestra]),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
