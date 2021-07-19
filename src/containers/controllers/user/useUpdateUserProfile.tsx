import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { updateUserProfile } from '../../database/user/updateUserProfile';
import { QUERY } from '../../entities/query';

interface Variables {
  displayName: string;
  image?: File;
}
type Data = unknown;
type UseUpdateUserInfo = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateUserProfile: UseUpdateUserInfo = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? '';

  return useMutation(
    (variables: Variables) => updateUserProfile({ ...variables, uid }),
    {
      onSettled: () => queryClient.invalidateQueries([QUERY.user]),
      onError: (error: Error) =>
        handleApiError(error, 'プロフィールの更新に失敗しました'),
      ...options,
    },
  );
};
