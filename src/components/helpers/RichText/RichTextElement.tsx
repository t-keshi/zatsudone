/* eslint-disable react/jsx-props-no-spreading */
import { List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { RenderElementProps } from 'slate-react';

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'inside',
  },
}));

export const RichTextElement: React.VFC<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  const classes = useStyles();
  switch (element.type) {
    case 'h1':
      return (
        <Typography variant="h5" {...attributes}>
          {children}
        </Typography>
      );
    case 'h2':
      return (
        <Typography variant="h6" {...attributes}>
          {children}
        </Typography>
      );
    case 'li':
      return <li {...attributes}>{children}</li>;
    case 'ul':
      return (
        <List component="ul" className={classes.list} {...attributes}>
          {children}
        </List>
      );
    default:
      return (
        <Typography variant="body1" {...attributes}>
          {children}
        </Typography>
      );
  }
};
