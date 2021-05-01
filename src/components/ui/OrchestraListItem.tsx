import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import musicNote from '../../assets/musicNote.png';
import { ROUTE_PATHS } from '../../routes/type';
import { Orchestra } from '../../type';

const useStyles = makeStyles(() => ({
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
    <Box display="flex" style={{ columnGap: '24px' }}>
      <img className={classes.image} alt="musicNote" src={musicNote} />
      <Box>
        <Typography
          component={Link}
          variant="h6"
          gutterBottom
          to={ROUTE_PATHS.楽団詳細}
        >
          {orchestra.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          大阪大学吹奏楽団は団員数100名を超える、関西でも最大級の規模を誇る吹奏楽団です。年2回の演奏会の開催を目指し、日々練習に励んでいます。
        </Typography>
      </Box>
    </Box>
  );
};
