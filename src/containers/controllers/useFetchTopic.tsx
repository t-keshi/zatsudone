import { useState } from 'react';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { topics } from './topics';

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
    const getRandomInt = (max: number): number =>
      Math.floor(Math.random() * max);
    const req = () => topics[getRandomInt(5)];
    const result = req();
    if (topicIds.includes(result.topicId)) {
      throw Error('');
    }

    setTopicIds((prevTopicIds) => {
      const id = req().topicId;
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

  return useQuery(['topic'], queryFn, {
    onError: () => console.log('err'),
    retry: 100,
    ...options,
  });
};
