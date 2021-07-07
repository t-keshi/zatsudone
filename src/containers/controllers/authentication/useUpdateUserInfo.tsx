import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { updateUserInfo } from '../../database/authentication/updateUserInfo';

interface Variables {
  profile?: string;
  userHomePage?: string;
  instrument?: string;
}
type Data = unknown;
type UseUpdateUserInfo = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateUserInfo: UseUpdateUserInfo = (options) => {
  const handleApiError = useHandleApiError();

  return useMutation((variables: Variables) => updateUserInfo(variables), {
    onError: (error: Error) =>
      handleApiError(error, 'Googleログインに失敗しました'),
    ...options,
  });
};
