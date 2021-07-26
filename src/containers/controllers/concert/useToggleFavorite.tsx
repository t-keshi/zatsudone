import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes/type';
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
  const history = useHistory();
  const uid = currentUser?.uid ?? '';
  const currentIsLikes = currentLikes?.includes(uid) ?? false;
  const toggle = currentIsLikes ? 'remove' : 'add';

  const mutateFn = () => {
    if (currentUser === null) {
      history.push(ROUTE_PATHS.ログイン);
    }

    return toggleFavorite({
      uid,
      concertId: params.concertId,
      toggle,
    });
  };

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
          },
        );
      } else {
        queryClient.setQueryData<ConcertResponse>(
          [QUERY.concert, params.concertId],
          {
            ...previousConcert,
            likes: previousConcert.likes.filter((like) => like !== uid),
          },
        );
      }
    },
    onError: (error: Error) =>
      handleApiError(error, 'お気に入りの変更にしました'),
    ...options,
  });
};
