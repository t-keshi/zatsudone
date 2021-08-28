import React from 'react';
import { useTitle } from '../utility/hooks/useTitle';
import { Layout } from './layout/Layout';
import { Topic } from './topic/Topic';

export const Top: React.VFC = () => {
  useTitle('zatsudone | 話題提供アプリ');

  return (
    <Layout>
      <Topic />
    </Layout>
  );
};
