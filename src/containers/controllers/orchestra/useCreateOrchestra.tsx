import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createOrchestra } from '../../database/orchestra/createOrchestra';
import { Prefecture } from '../../entities/prefectures';

interface Variables {
  name: string;
  description: string;
  prefecture: Prefecture;
}
type Data = unknown;
type UseCreateOrchestra = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateOrchestra: UseCreateOrchestra = (options) => {
  const handleApiError = useHandleApiError();
  const mutateFn = (variables: Variables) => createOrchestra(variables);

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, '楽団の作成に失敗しました'),
    ...options,
  });
};
