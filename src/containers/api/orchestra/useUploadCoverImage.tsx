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
  imageName: string;
  imageDataUrl: string;
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUploadCoverImage: UseUploadCoverImage = (options) => {
  const { history } = useRouter();
  const mutate = async (variables: Variables) => {
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(variables.imageName);
    const uploadTask = imagesRef
      .putString(variables.imageDataUrl, 'data_url')
      .on('state_changed') as () => Promise<void>;
    await uploadTask();
  };

  return useMutation(mutate, {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
