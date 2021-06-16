import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import musicNote from '../../../assets/musicNote.png';
import { ROUTE_PATHS } from '../../../routes/type';
import { Orchestra } from '../../../type';
import { StyledLink } from '../../helpers/StyledLink/StyledLink';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(3),
  },
  image: {
    objectFit: 'contain',
    height: 120,
    width: 120,
  },
}));

interface Props {
  orchestra: Orchestra;
}

export const OrchestraListItem: React.VFC<Props> = ({ orchestra }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img className={classes.image} alt="musicNote" src={musicNote} />
      <Box>
        <Typography
          component={StyledLink}
          variant="h6"
          color="textPrimary"
          underline="always"
          to={`/${ROUTE_PATHS.楽団詳細.split('/')[1]}/${orchestra.id}`}
        >
          {orchestra.name}
        </Typography>
        <Box mt={1} />
        <Typography variant="body2" color="textSecondary">
          大阪大学吹奏楽団は団員数100名を超える、関西でも最大級の規模を誇る吹奏楽団です。年2回の演奏会の開催を目指し、日々練習に励んでいます。
        </Typography>
      </Box>
    </Box>
  );
};
