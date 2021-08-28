import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMembers } from '../../containers/contexts/members';
import {
  TopicResponse,
  useFetchTopic,
} from '../../containers/controllers/useFetchTopic';
import { DisplayTopic } from './DisplayTopic';

interface TopicGroup {
  count: number;
  topic: TopicResponse;
  answerMembers: string[];
}

const BACKEND_API =
  'https://pgxath08x1.execute-api.us-west-2.amazonaws.com/default/hackathon-topics';

const api = () =>
  axios.get<AxiosResponse<TopicResponse>>(BACKEND_API, {
    params: {
      intimacyLevel: 1,
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });

export const Topic: React.VFC = () => {
  console.log(api());
  const [count, setCount] = useState<number>(0);
  const [members] = useMembers();
  const intimacyLevel = useMemo(() => {
    if (count > 10) {
      return 2;
    }
    if (count > 5) {
      return 1;
    }

    return 0;
  }, [count]);
  const { data, refetch } = useFetchTopic(intimacyLevel, {
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const generateRandThree = useCallback(() => {
    const getRandomInt = (max: number): number =>
      Math.floor(Math.random() * max);
    const first = getRandomInt(members.members.length);
    const second = getRandomInt(members.members.length);
    const third = getRandomInt(members.members.length);
    const generated = new Set([first, second, third]);

    return Array.from(generated);
  }, [members.members.length]);
  const [topicGroup, setTopicGroup] = useState<TopicGroup[]>([]);

  console.log(topicGroup);
  const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
  const rand = getRandomInt(count);
  const getMembers = () => {
    const first = getRandomInt(members.members.length);
    const second = getRandomInt(members.members.length);
    const third = getRandomInt(members.members.length);
    const generated = new Set([first, second, third]);
    const randomThree = Array.from(generated);
    const answerMembers = randomThree.map((random) => members.members[random]);

    return answerMembers;
  };

  useEffect(() => {
    const randomThree = generateRandThree();
    const answerMembers = randomThree.map((random) => members.members[random]);
    if (!data) {
      return console.log('no data');
    }

    return setTopicGroup((prevTopicGroup) => {
      const newTopicGroup = { count, topic: data, answerMembers };
      if (!prevTopicGroup) {
        return [newTopicGroup];
      }

      return [...prevTopicGroup, newTopicGroup];
    });
  }, [count, data, generateRandThree, members.members]);

  return (
    <>
      <Box p={8}>
        <Button
          disabled={members.members.length === 0}
          size="large"
          fullWidth
          onClick={() => {
            void refetch();
            setCount((prevCount) => prevCount + 1);
          }}
        >
          話題提供開始
        </Button>
        {members.members.length === 0 && (
          <Typography variant="h6">
            右の欄からメンバーを追加してください
          </Typography>
        )}
      </Box>
      <DisplayTopic />
      <List>
        {topicGroup
          .slice(topicGroup.length - 1, topicGroup.length)
          .map((topicGroupItem) => (
            <ListItem key={topicGroupItem.count}>
              <ListItemText
                primary={`${count}. ${topicGroupItem.topic.text}`}
                secondary={`回答者: ${getMembers().join(', ')}`}
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};
