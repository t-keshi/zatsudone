import { Box, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import musicNote from '../../../assets/musicNote.png';
import { Orchestra } from '../../../containers/controllers/orchestra/useFetchOrchestras';
import { ROUTE_PATHS } from '../../../routes/type';
import { StyledLink } from '../../helpers/StyledLink/StyledLink';
import { TextLabel } from '../../helpers/TextLabel/TextLabel';

const IMAGE_SIZE = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    columnGap: theme.spacing(3),
  },
  image: {
    objectFit: 'contain',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
}));

interface Props {
  orchestra: Orchestra | undefined;
}

export const OrchestraListItem: React.VFC<Props> = ({ orchestra }) => {
  const classes = useStyles();

  if (orchestra === undefined) {
    return (
      <Box className={classes.root}>
        <Hidden xsDown implementation="css">
          <Skeleton className={classes.image} variant="rect" />
        </Hidden>
        <Box>
          <Skeleton width={100}>
            <TextLabel gutterBottom />
          </Skeleton>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Hidden xsDown implementation="css">
        <img className={classes.image} alt="musicNote" src={musicNote} />
      </Hidden>
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
