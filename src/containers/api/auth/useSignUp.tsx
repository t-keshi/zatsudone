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
  displayName: string;
  email: string;
  password: string;
}
type Data = unknown;
type UseSignUp = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useSignUp: UseSignUp = (options) => {
  const { history } = useRouter();

  return useMutation(
    async (variables: Variables) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(variables.email, variables.password);
      const { currentUser } = firebase.auth();
      if (user) {
        return (
          currentUser?.updateProfile({ displayName: variables.displayName }) ??
          console.warn('damn!')
        );
      }

      return console.warn('note');
    },
    {
      onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
      onError: (error: Error) =>
        handleApiError(error, '新規登録に失敗しました'),
      ...options,
    },
  );
};
