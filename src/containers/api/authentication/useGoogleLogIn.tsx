import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { handleApiError } from '../../../utility/handleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';

type Data = unknown;
type UseGoogleLogIn = (
  options?: UseMutationOptions<Data, Error, void>,
) => UseMutationResult<Data, Error, void>;

export const useGoogleLogIn: UseGoogleLogIn = (options) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const { history } = useRouter();

  return useMutation(() => firebase.auth().signInWithPopup(provider), {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) =>
      handleApiError(error, 'Googleログインに失敗しました'),
    ...options,
  });
};
