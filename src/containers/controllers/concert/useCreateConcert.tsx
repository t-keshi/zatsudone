import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createConcert } from '../../database/concert/createConcert';
import { QUERY } from '../../entities/query';
import { Orchestra } from '../orchestra/useFetchOrchestra';

interface Variables {
  title: string;
  date: Date;
  address: string;
  placeId: string;
  prefecture: string | null;
  symphonies: string[];
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateConcert: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const params: { orchestraId: string } = useParams();
  const orchestra: Orchestra | undefined = queryClient.getQueryData<Orchestra>([
    QUERY.orchestra,
    params.orchestraId,
  ]);
  console.log(orchestra, 'orche');
  const mutateFn = (variables: Variables) =>
    createConcert({
      ...variables,
      orchestra: { id: orchestra?.id ?? '', name: orchestra?.name ?? '' },
    });

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
