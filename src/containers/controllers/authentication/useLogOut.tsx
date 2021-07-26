import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';

type Data = unknown;
type UseLogIn = (
  options?: UseMutationOptions<Data, Error, void>,
) => UseMutationResult<Data, Error, void>;

export const useLogOut: UseLogIn = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();

  return useMutation(() => firebase.auth().signOut(), {
    onSuccess: () => history.push(ROUTE_PATHS.ログイン),
    onError: (error: Error) =>
      handleApiError(error, 'ログアウトに失敗しました'),
    ...options,
  });
};
