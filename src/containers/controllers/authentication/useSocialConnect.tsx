import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';
import { socialConnect } from '../../database/authentication/socialConnect';

type SocialApp = 'twitter' | 'facebook';
type Data = unknown;
type UseSocialConnect = (
  options?: UseMutationOptions<Data, Error, SocialApp>,
) => UseMutationResult<Data, Error, SocialApp>;

export const useSocialConnect: UseSocialConnect = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();

  return useMutation((socialApp: SocialApp) => socialConnect(socialApp), {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) =>
      handleApiError(error, 'ソーシャルログインに失敗しました'),
    ...options,
  });
};
