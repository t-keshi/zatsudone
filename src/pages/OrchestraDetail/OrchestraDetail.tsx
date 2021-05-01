import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { CoverImage } from '../../components/ui/CoverImage';
import { useTitle } from '../../helpers/hooks/useTitle';

export const Orchestras: React.VFC = () => {
  useTitle('SymphonyForum | 大阪大学吹奏楽団');

  return (
    <Layout>
      <CoverImage />
      楽団リスト
    </Layout>
  );
};
