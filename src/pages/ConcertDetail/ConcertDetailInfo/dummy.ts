import { Concert, Orchestra, Part, Program } from '../../../type';

const orchestra: Orchestra = {
  id: 1,
  name: '大阪大学吹奏楽団',
};
const part1: Part = {
  id: 1,
  title: 'シンフォニックステージ',
  symphonies: [
    {
      id: 1,
      title: 'モンタニャールの詩',
      composer: 'ヤン・ヴァンデルロースト',
    },
    {
      id: 2,
      title: '宇宙の音楽',
      composer: 'P・スパーク',
    },
    {
      id: 3,
      title: 'ドラゴンの年 2017年版',
      composer: 'P・スパーク',
    },
    {
      id: 4,
      title: 'シンフォニア・ノビリッシマ',
      composer: 'R・ジェイガー',
    },
  ],
};
const part2: Part = {
  id: 1,
  title: 'シンフォニックステージ',
  symphonies: [
    {
      id: 1,
      title: 'モンタニャールの詩',
      composer: 'ヤン・ヴァンデルロースト',
    },
    {
      id: 2,
      title: '宇宙の音楽',
      composer: 'P・スパーク',
    },
    {
      id: 3,
      title: 'ドラゴンの年 2017年版',
      composer: 'P・スパーク',
    },
    {
      id: 4,
      title: 'シンフォニア・ノビリッシマ',
      composer: 'R・ジェイガー',
    },
  ],
};
const program: Program = [part1, part2];
export const concertResponse: Concert = {
  id: 1,
  title: 'サマーコンサート',
  orchestra,
  program,
  prefecture: '兵庫県',
  location: '〒660-0881 兵庫県尼崎市昭和通２丁目７−１６',
  date: new Date(2021, 6, 13),
  startAt: '',
  openAt: '',
  closeAt: '',
};
