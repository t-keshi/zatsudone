import axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { BASE_URL } from '../../../constants/env';
import { useHandleApiError } from '../../../utility/hooks/useHandleApiError';

interface Variables {
  title: string;
  date: Date;
  address: string;
  placeId: string;
  prefecture: string | null;
  symphonies: string[];
  orchestra: {
    id: string;
    name: string;
  };
}
type Data = unknown;
type UseUploadCoverImage = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useCreateConcert: UseUploadCoverImage = (options) => {
  const handleApiError = useHandleApiError();
  const mutateFn = async (variables: Variables) => {
    const {
      title,
      date,
      address,
      placeId,
      prefecture,
      symphonies,
      orchestra,
    } = variables;
    const response = await axios.post<Data>(
      `${BASE_URL}/concerts`,
      {
        title,
        date,
        address,
        placeId,
        prefecture,
        symphonies,
        orchestra,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/json',
          // 'access-control-allow-credentials': 'include',
        },
        // withCredentials: true,
      },
    );

    return response.data;
  };

  return useMutation(mutateFn, {
    onError: (error: Error) =>
      handleApiError(error, 'コンサートの作成に失敗しました'),
    ...options,
  });
};
