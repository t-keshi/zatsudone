import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { handleApiError } from '../../../helpers/handleApiError';

interface Variables {
  email: string;
  password: string;
}
type Data = unknown;
type UseLogIn = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useLogIn: UseLogIn = (options) =>
  useMutation(
    (variables: Variables) =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(variables.email, variables.password),
    {
      onError: (error: Error) => handleApiError(error, '認証に失敗しました'),
      ...options,
    },
  );
