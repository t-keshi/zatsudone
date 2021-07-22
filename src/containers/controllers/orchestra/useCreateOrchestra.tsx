import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createOrchestra } from '../../database/orchestra/createOrchestra';
import { Prefecture } from '../../entities/prefectures';
import { QUERY } from '../../entities/query';
import { User } from '../user/useFetchUserInfo';
import { Orchestra } from './useFetchOrchestra';

interface Variables {
  name: string;
  description: string;
  prefecture: Prefecture;
}
type Data = Orchestra;
type UseCreateOrchestra = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateOrchestra: UseCreateOrchestra = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const mutateFn = (variables: Variables) => createOrchestra(variables);

  return useMutation(mutateFn, {
    onSettled: async (res) => {
      await queryClient.cancelQueries([QUERY.user]);
      const previousUser = queryClient.getQueryData<User>([QUERY.user]);

      if (!previousUser) {
        return;
      }

      void queryClient.setQueryData<User>([QUERY.user], {
        ...previousUser,
        managementOrchestraId: res?.id ?? '',
      });

      void queryClient.invalidateQueries([QUERY.orchestra, res?.id ?? '']);
    },
    onError: (error: Error) =>
      handleApiError(error, '楽団の作成に失敗しました'),
    ...options,
  });
};
