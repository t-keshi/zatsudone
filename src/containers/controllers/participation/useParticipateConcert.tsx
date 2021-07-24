import firebase from 'firebase/app';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router';
import { ConcertResponse, ConcertType } from '../../../types';
import { asyncDelay } from '../../../utility/asyncDelay';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { participateConcert } from '../../database/participation/participateConcert';
import { QUERY } from '../../entities/query';
import { User } from '../user/useFetchUserInfo';

interface ParticipationResponse {
  concertSnippets: {
    id: string;
  };
  userSnippets: {
    uid: string;
    photoURL: string;
  };
}
interface Variables {
  concert: ConcertType;
  toggle: 'add' | 'remove';
}
type Data = unknown;
type UseParticipateConcert = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useParticipateConcert: UseParticipateConcert = (options) => {
  const handleApiError = useHandleApiError();
  const queryClient = useQueryClient();
  const params: { concertId: string } = useParams();
  const { currentUser } = firebase.auth();
  const userInfo: User | undefined = queryClient.getQueryData([QUERY.user]);
  const mutateFn = (variables: Variables) =>
    participateConcert({
      concert: variables.concert,
      uid: currentUser?.uid ?? '',
      photoURL: userInfo?.photoURL ?? '',
      toggle: variables.toggle,
    });

  return useMutation(mutateFn, {
    onMutate: async (variables: Variables) => {
      await queryClient.cancelQueries([QUERY.participation, params.concertId]);
      await queryClient.cancelQueries([QUERY.concert, params.concertId]);
      const previousParticipation = queryClient.getQueryData<
        ParticipationResponse[]
      >([QUERY.participation, params.concertId]);
      const previousConcert = queryClient.getQueryData<ConcertResponse>([
        QUERY.concert,
        params.concertId,
      ]);

      if (!previousParticipation || !previousConcert) {
        console.error(variables, 'error');

        return;
      }

      if (variables.toggle === 'add') {
        queryClient.setQueryData<ParticipationResponse[]>(
          [QUERY.participation, params.concertId],
          [
            ...previousParticipation,
            {
              concertSnippets: {
                id: params.concertId,
              },
              userSnippets: {
                uid: currentUser?.uid ?? '',
                photoURL: '',
              },
            },
          ],
        );
        queryClient.setQueryData<ConcertResponse>(
          [QUERY.concert, params.concertId],
          {
            ...previousConcert,
            participants: [...previousConcert.participants, params.concertId],
          },
        );
      }

      if (variables.toggle === 'remove') {
        queryClient.setQueryData<ParticipationResponse[]>(
          [QUERY.participation, params.concertId],
          previousParticipation.filter(
            (participation) =>
              participation.userSnippets.uid !== currentUser?.uid ?? '',
          ),
        );
        queryClient.setQueryData<ConcertResponse>(
          [QUERY.concert, params.concertId],
          {
            ...previousConcert,
            participants: previousConcert.participants.slice(
              0,
              previousConcert.participants.length - 1,
            ),
          },
        );
      }
    },
    onSettled: async () => {
      void queryClient.invalidateQueries([
        QUERY.participation,
        params.concertId,
      ]);
      await asyncDelay(2000);
      void queryClient.invalidateQueries([QUERY.concert, params.concertId]);
    },
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
