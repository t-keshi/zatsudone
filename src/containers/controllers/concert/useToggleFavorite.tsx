import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { ConcertResponse } from '../../../types';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { toggleFavorite } from '../../database/concert/toggleFavorite';
import { QUERY } from '../../entities/query';

type UseToggleFavorite = (
  options?: UseMutationOptions<void, Error, void>,
) => UseMutationResult<void, Error, void>;

export const useToggleFavorite: UseToggleFavorite = (options) => {
  const handleApiError = useHandleApiError();
  const params: { concertId: string } = useParams();
  const queryClient = useQueryClient();
  const currentLikes = queryClient.getQueryData<ConcertResponse>([
    QUERY.concert,
    params.concertId,
  ])?.likes;
  const { currentUser } = firebase.auth();
  const uid = currentUser?.uid ?? '';
  const currentIsLikes = currentLikes?.includes(uid) ?? false;
  const toggle = currentIsLikes ? 'remove' : 'add';

  const mutateFn = () =>
    toggleFavorite({
      uid,
      concertId: params.concertId,
      toggle,
    });

  return useMutation(mutateFn, {
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY.concert, params.concertId]);
      const previousConcert = queryClient.getQueryData<ConcertResponse>([
        QUERY.concert,
        params.concertId,
      ]);

      if (!previousConcert) {
        return;
      }

      if (currentIsLikes === false) {
        queryClient.setQueryData<ConcertResponse>(
          [QUERY.concert, params.concertId],
          {
            ...previousConcert,
            likes: [...previousConcert.likes, uid],
            likesCount: previousConcert.likesCount + 1,
          },
        );
      } else {
        queryClient.setQueryData<ConcertResponse>(
          [QUERY.concert, params.concertId],
          {
            ...previousConcert,
            likes: previousConcert.likes.filter((like) => like !== uid),
            likesCount: previousConcert.likesCount - 1,
          },
        );
      }
    },
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
