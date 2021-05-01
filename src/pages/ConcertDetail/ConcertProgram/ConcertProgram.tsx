import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { Program } from '../../../type';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(1),
  },
}));

interface Props {
  program: Program;
}

export const ConcertProgram: React.VFC<Props> = ({ program }) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h4">サマーコンサート</Typography>
      <List>
        {program.map((part) => (
          <Fragment key={part.id}>
            <ListItem>
              <ListItemText
                primary={part.title}
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
            <List component="div" disablePadding>
              {part.symphonies.map((symphony) => (
                <Fragment key={symphony.id}>
                  <ListItem className={classes.nested}>
                    <ListItemText primary={symphony.title} />
                    <ListItemText secondary={symphony.composer} />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
