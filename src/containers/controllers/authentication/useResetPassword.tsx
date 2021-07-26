import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';
import { resetPassword } from '../../database/authentication/resetPassword';

interface Variables {
  email: string;
}
type Data = unknown;
type UseResetPassword = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useResetPassword: UseResetPassword = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();
  const mutateFn = (variables: Variables) => resetPassword(variables);

  return useMutation(mutateFn, {
    onSuccess: () => history.push(ROUTE_PATHS.ログイン),
    onError: (error: Error) =>
      handleApiError(error, 'パスワードのリセットに失敗しました'),
    ...options,
  });
};
