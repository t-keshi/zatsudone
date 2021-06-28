import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createConcert } from '../../database/concert/createConcert';

interface Variables {
  title: string;
  date: Date;
  address: string;
  placeId: string;
  prefecture: string | null;
  symphonies: string[];
  orchestra: {
    id: string;
    name: string;
  };
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateConcert: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const mutateFn = (variables: Variables) => createConcert(variables);

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
