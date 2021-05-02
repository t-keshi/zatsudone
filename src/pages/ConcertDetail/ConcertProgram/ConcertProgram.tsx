import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { TypographyWithLabel } from '../../../components/ui/TypographyWithLabel';
import { Program } from '../../../type';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(1),
  },
  composer: {
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  program: Program;
}

export const ConcertProgram: React.VFC<Props> = ({ program }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box mt={3} />
      <TypographyWithLabel variant="h5" paragraph>
        プログラム
      </TypographyWithLabel>
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
    </Box>
  );
};
