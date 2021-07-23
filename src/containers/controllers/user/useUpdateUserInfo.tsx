import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { updateUserInfo } from '../../database/user/updateUserInfo';
import { QUERY } from '../../entities/query';

interface Variables {
  profile?: string;
  homePage?: string;
  part?: string;
}
type Data = unknown;
type UseUpdateUserInfo = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateUserInfo: UseUpdateUserInfo = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();

  return useMutation((variables: Variables) => updateUserInfo(variables), {
    onSettled: () => queryClient.invalidateQueries([QUERY.user]),
    onError: (error: Error) =>
      handleApiError(error, 'Googleログインに失敗しました'),
    ...options,
  });
};
