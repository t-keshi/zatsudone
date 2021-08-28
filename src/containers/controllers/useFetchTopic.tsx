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

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1));

export const useFetchTopic: UseFetchMembers = (intimacy, options) => {
  const [topicIds, setTopicIds] = useState<number[]>([]);
  const queryFn = async () => {
    const req = async (): Promise<{ data: TopicResponse }> => {
      const BACKEND_API =
        'https://pgxath08x1.execute-api.us-west-2.amazonaws.com/default/hackathon-topics';

      // const api = await axios.get<AxiosResponse<TopicResponse>>(BACKEND_API, {
      //   params: {
      //     intimacyLevel: intimacy,
      //   },
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //   },
      // });
      // console.log(api);
      await sleep();

      const getRandomInt = (max: number): number =>
        Math.floor(Math.random() * max);
      const int = getRandomInt(10);
      console.log(int);

      return {
        data: topics[int],
      };
    };

    const res = await req();
    if (topicIds.includes(res.data.topicId)) {
      throw Error('');
    }

    setTopicIds((prevTopicIds) => {
      const id = res.data.topicId;
      if (!prevTopicIds) {
        return [id];
      }

      return [...prevTopicIds, id];
    });

    return res.data;
  };

  return useQuery(['topic'], queryFn, {
    onError: () => console.log('err'),
    retry: 100,
    ...options,
  });
};
