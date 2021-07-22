import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { ROUTE_PATHS } from '../../../routes/type';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { useRouter } from '../../../utility/hooks/useRouter';
import { socialLogIn } from '../../database/authentication/socialLogIn';

type SocialApp = 'google' | 'twitter' | 'facebook';
type Data = unknown;
type UseSocialLogIn = (
  options?: UseMutationOptions<Data, Error, SocialApp>,
) => UseMutationResult<Data, Error, SocialApp>;

export const useSocialLogIn: UseSocialLogIn = (options) => {
  const handleApiError = useHandleApiError();
  const { history } = useRouter();

  return useMutation((socialApp: SocialApp) => socialLogIn(socialApp), {
    onSuccess: () => history.push(ROUTE_PATHS.近日中のコンサート),
    onError: (error: Error) => handleApiError(error, 'ログインに失敗しました'),
    ...options,
  });
};
