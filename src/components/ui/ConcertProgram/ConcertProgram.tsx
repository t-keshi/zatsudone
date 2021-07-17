import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { Program } from '../../../type';
import { Part } from '../../../types';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(1),
  },
  composer: {
    marginLeft: theme.spacing(2),
  },
}));

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
  id: 2,
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

export const ConcertProgram: React.VFC = () => {
  const classes = useStyles();

  return (
    <div>
      <SubHeading variant="h5" paragraph>
        プログラム
      </SubHeading>
      <List>
        {program.map((part) => (
          <Fragment key={part.id}>
            <ListItem dense>
              <ListItemText
                primary={part.title}
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
            <List component="div" disablePadding>
              {part.symphonies.map((symphony) => (
                <Fragment key={symphony.id}>
                  <ListItem className={classes.nested} dense>
                    <ListItemText
                      classes={{ secondary: classes.composer }}
                      primary={`『${symphony.title}』`}
                      primaryTypographyProps={{ display: 'inline' }}
                      secondary={`／${symphony.composer}`}
                      secondaryTypographyProps={{ display: 'inline' }}
                    />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Fragment>
        ))}
      </List>
    </div>
  );
};
