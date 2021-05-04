import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { handleApiError } from '../../../helpers/handleApiError';
import { useRouter } from '../../../helpers/hooks/useRouter';
import { ROUTE_PATHS } from '../../../routes/type';

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
    async (variables: Variables) => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(variables.email, variables.password);
    },
    {
      onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
      onError: (error: Error) =>
        handleApiError(error, 'ログインに失敗しました'),
      ...options,
    },
  );
};
