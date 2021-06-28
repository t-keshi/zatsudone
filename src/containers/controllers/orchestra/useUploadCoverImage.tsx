import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';
import { uploadCoverImage } from '../../database/orchestra/uploadCoverImage';

interface Variables {
  imageName: string;
  imageDataUrl: string;
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUploadCoverImage: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();
  const mutate = (variables: Variables) => uploadCoverImage(variables);

  return useMutation(mutate, {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
