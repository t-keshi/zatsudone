import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { belongOrchestra } from '../../database/belong/belongOrchestra';
import { QUERY } from '../../entities/query';
import { Orchestra } from '../orchestra/useFetchOrchestra';
import { User } from '../user/useFetchUserInfo';

interface MemberResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
    displayName: string;
    part: string;
  };
}
interface Variables {
  orchestra: Orchestra;
  toggle: 'add' | 'remove';
}
type Data = unknown;
type UseBelongOrchestra = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useBelongOrchestra: UseBelongOrchestra = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const params: { orchestraId: string } = useParams();
  const { currentUser } = firebase.auth();
  const userInfo: User | undefined = queryClient.getQueryData([QUERY.user]);
  const mutateFn = (variables: Variables) =>
    belongOrchestra({
      orchestra: variables.orchestra,
      uid: currentUser?.uid ?? '',
      photoURL: userInfo?.photoURL ?? '',
      displayName: userInfo?.displayName ?? '',
      part: userInfo?.part ?? '',
      toggle: variables?.toggle ?? '',
    });

  return useMutation(mutateFn, {
    onMutate: async (variables: Variables) => {
      await queryClient.cancelQueries([QUERY.belong, params.orchestraId]);
      const previousBelong = queryClient.getQueryData<MemberResponse[]>([
        QUERY.belong,
        params.orchestraId,
      ]);

      if (!previousBelong) {
        console.error(variables, 'error');

        return;
      }

      if (variables.toggle === 'add') {
        queryClient.setQueryData<MemberResponse[]>(
          [QUERY.participation, params.orchestraId],
          [
            ...previousBelong,
            {
              userSnippets: {
                uid: currentUser?.uid ?? '',
                photoURL: '',
                displayName: '',
                part: '',
              },
            },
          ],
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries([QUERY.belong, params.orchestraId]);
    },
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
