import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';
import { createOrchestra } from '../../database/orchestra/createOrchestra';

interface Variables {
  name: string;
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateConcert: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const mutateFn = (variables: Variables) => createOrchestra(variables);

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};

// const response = await axios.post<Data>(
//   `${BASE_URL}/concerts`,
//   {
//     title,
//     date,
//     address,
//     placeId,
//     prefecture,
//     symphonies,
//     orchestra,
//   },
//   {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'content-type': 'application/json',
//       // 'access-control-allow-credentials': 'include',
//     },
//     // withCredentials: true,
//   },
// );
