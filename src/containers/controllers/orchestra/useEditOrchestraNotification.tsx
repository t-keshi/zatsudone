import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { editOrchestraNotification } from '../../database/orchestra/editOrchestraNotification';
import { QUERY } from '../../entities/query';

interface Variables {
  orchestraId: string;
  notification: string;
  manipulation: 'add' | 'delete';
}
type Data = unknown;
type UseUpdateOrchestra = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useEditOrchestraNotification: UseUpdateOrchestra = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const mutate = (variables: Variables) => editOrchestraNotification(variables);

  return useMutation(mutate, {
    onSuccess: () => queryClient.invalidateQueries([QUERY.orchestra]),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
