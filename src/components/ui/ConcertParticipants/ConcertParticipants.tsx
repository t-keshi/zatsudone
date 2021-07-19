import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes/type';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

interface Participant {
  uid: string;
  photoURL: string;
}

interface Props {
  participants: Participant[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(1),
    columnGap: theme.spacing(2),
  },
}));

export const ConcertParticipants: React.VFC<Props> = ({ participants }) => {
  const classes = useStyles();
  const history = useHistory();

  console.log(ROUTE_PATHS.プロフィール);

  return (
    <>
      <SubHeading variant="h5" paragraph>
        来場予定者
      </SubHeading>
      <div className={classes.root}>
        {participants.map((participant) => (
          <IconButton
            key={participant.uid}
            size="small"
            onClick={() =>
              history.push(
                `/${ROUTE_PATHS.プロフィール.split('/')[1]}/${participant.uid}`,
              )
            }
          >
            <Avatar alt="participant" src={participant.photoURL} />
          </IconButton>
        ))}
      </div>
    </>
  );
};
