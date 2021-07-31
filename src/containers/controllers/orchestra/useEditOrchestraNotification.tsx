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
    onSettled: (_, __, variables) => {
      void queryClient.refetchQueries([QUERY.orchestra, variables.orchestraId]);
    },
    onError: (error: Error) =>
      handleApiError(error, 'お知らせの変更に失敗しました'),
    ...options,
  });
};
