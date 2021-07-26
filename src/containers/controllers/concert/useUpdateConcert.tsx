import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { updateConcert } from '../../database/concert/updateConcert';
import { QUERY } from '../../entities/query';

interface Variables {
  id: string;
  title?: string;
  description?: string;
  coverUrl?: File;
  date?: Date;
  startAt?: Date;
  openAt?: Date;
  closeAt?: Date;
  address?: string;
  placeId?: string;
  prefecture?: string | null;
  programs?: string;
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateConcert: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const params: { concertId: string } = useParams();
  const mutateFn = (variables: Variables) => updateConcert(variables);

  return useMutation(mutateFn, {
    onSettled: () =>
      queryClient.invalidateQueries([QUERY.concert, params.concertId]),
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの更新に失敗しました'),
    ...options,
  });
};
