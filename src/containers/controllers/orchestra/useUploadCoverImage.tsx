import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { uploadCoverImage } from '../../database/orchestra/uploadCoverImage';
import { QUERY } from '../../entities/query';

interface Variables {
  name: string;
  orchestraId: string;
  coverImage?: File;
  avatarImage?: File;
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUploadCoverImage: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const mutate = (variables: Variables) => uploadCoverImage(variables);

  return useMutation(mutate, {
    onSuccess: () => queryClient.invalidateQueries([QUERY.orchestra]),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
