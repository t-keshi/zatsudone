import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { format } from 'date-fns';
import musicNote from '../../../assets/musicNote.png';
import { concertResponse } from './dummy';

const useStyles = makeStyles(() => ({
  image: {
    objectFit: 'contain',
    height: 500,
    width: '100%',
  },
}));

export const ConcertDetailInfo: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box>
      <img className={classes.image} alt="musicNote" src={musicNote} />
      <Box>
        <Box
          bgcolor="primary.main"
          display="inline-flex"
          paddingRight="8px"
          paddingLeft="8px"
          mb={1}
        >
          <Typography variant="button" display="block">
            {format(concertResponse.date, 'yyyy/MM/dd')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
