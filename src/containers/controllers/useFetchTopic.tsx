import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export interface TopicResponse {
  id: number;
  topic: string;
}
type Data = TopicResponse;
type UseFetchMembers = (
  intimacy: number,
  options?: UseQueryOptions<Data, Error, Data, [string]>,
) => UseQueryResult<Data, Error>;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const useFetchTopic: UseFetchMembers = (intimacy, options) => {
  const queryFn = async () => {
    await sleep();
    console.log(intimacy);

    return {
      id: 1,
      topic: '趣味は何ですか',
    };
  };

  return useQuery(['topic'], queryFn, { ...options });
};
