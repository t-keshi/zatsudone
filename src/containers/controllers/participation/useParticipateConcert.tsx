import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router';
import { ConcertType } from '../../../types';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { participateConcert } from '../../database/participation/participateConcert';
import { QUERY } from '../../entities/query';

interface ParticipationResponse {
  userSnippets: {
    uid: string;
    photoURL: string;
  };
  concertSnippets: ConcertType;
}
interface ParticipationData {
  participation: ParticipationResponse[];
  isUserParticipants: boolean;
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
  const mutateFn = (variables: Variables) =>
    participateConcert({
      concert: variables.concert,
      toggle: variables.toggle,
    });

  return useMutation(mutateFn, {
    onMutate: async (variables: Variables) => {
      await queryClient.cancelQueries([QUERY.participation, params.concertId]);
      const previousConcert = queryClient.getQueryData<ParticipationData>([
        QUERY.participation,
        params.concertId,
      ]);

      if (!previousConcert) {
        console.error(variables, 'error');

        return;
      }

      if (variables.toggle === 'add') {
        queryClient.setQueryData<ParticipationData>(
          [QUERY.participation, params.concertId],
          {
            participation: previousConcert.participation,
            isUserParticipants: true,
          },
        );
      } else {
        queryClient.setQueryData<ParticipationData>(
          [QUERY.participation, params.concertId],
          {
            participation: previousConcert.participation,
            isUserParticipants: false,
          },
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries([QUERY.participation, params.concertId]),
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
