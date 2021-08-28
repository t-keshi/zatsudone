import { useState } from 'react';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export interface TopicResponse {
  topicId: number;
  text: string;
}
type Data = TopicResponse;
type UseFetchMembers = (
  intimacy: number,
  options?: UseQueryOptions<Data, Error, Data, [string]>,
) => UseQueryResult<Data, Error>;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const useFetchTopic: UseFetchMembers = (intimacy, options) => {
  const [topicIds, setTopicIds] = useState<number[]>([]);
  const queryFn = async () => {
    await sleep();
    const req = () => {
      console.log('req');

      return 1;
    };
    const resId = 1;
    if (topicIds.includes(resId)) {
      req();
    }
    setTopicIds((prevTopicIds) => {
      const id = req();
      if (!prevTopicIds) {
        return [id];
      }

      return [...prevTopicIds, id];
    });

    return {
      topicId: 1,
      text: '趣味は何ですか',
    };
  };

  return useQuery(['topic'], queryFn, { ...options });
};
