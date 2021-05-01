import { Concert, Orchestra, Program, Part } from '../../type';

const orchestra: Orchestra = {
  id: 1,
  name: '大阪大学吹奏楽団',
};
const part1: Part = {
  id: 1,
  title: 'Ⅰ. シンフォニックステージ',
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
  title: 'Ⅱ. ポップスステージ',
  symphonies: [
    {
      id: 1,
      title: 'ディズニーランドセレブレーション',
      composer: 'マイケル・ブラウン',
    },
    {
      id: 2,
      title: '青春の輝き',
      composer: 'カーペンターズ, 星出尚志編',
    },
    {
      id: 3,
      title: 'キャラバンの到着',
      composer: '福田洋介編',
    },
    {
      id: 4,
      title: 'ディスコキッド',
      composer: '東海林修',
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
