import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
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
  const params: { orchestraId: string } = useParams();
  const mutate = (variables: Variables) => uploadCoverImage(variables);

  return useMutation(mutate, {
    onSettled: () =>
      queryClient.refetchQueries([QUERY.orchestra, params.orchestraId]),
    onError: (error: Error) =>
      handleApiError(error, '楽団情報の変更に失敗しました'),
    ...options,
  });
};
