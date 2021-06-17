import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { handleApiError } from '../../../utility/handleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';

interface Variables {
  email: string;
  password: string;
}
type Data = unknown;
type UseLogIn = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useLogIn: UseLogIn = (options) => {
  const { history } = useRouter();

  return useMutation(
    (variables: Variables) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(variables.email, variables.password),
    {
      onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
      onError: (error: Error) =>
        handleApiError(error, 'ログインに失敗しました'),
      ...options,
    },
  );
};
