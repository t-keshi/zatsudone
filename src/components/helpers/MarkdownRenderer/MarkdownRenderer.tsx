import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'markdown-to-jsx';
import React from 'react';

interface Props {
  markdown: string;
}

const useStyles = makeStyles(() => ({
  root: {
    whiteSpace: 'pre-wrap',
  },
}));

export const MarkdownRenderer: React.VFC<Props> = ({ markdown }) => {
  const classes = useStyles();

  return (
    <Markdown
      className={classes.root}
      options={{
        wrapper: 'div',
        overrides: {
          h1: {
            component: Typography,
            props: {
              variant: 'h1',
            },
          },
          h2: {
            component: Typography,
            props: {
              variant: 'h2',
            },
          },
          h3: {
            component: Typography,
            props: {
              variant: 'h3',
            },
          },
          h4: {
            component: Typography,
            props: {
              variant: 'h4',
            },
          },
          h5: {
            component: Typography,
            props: {
              variant: 'h5',
            },
          },
          h6: {
            component: Typography,
            props: {
              variant: 'h6',
            },
          },
          p: {
            component: Typography,
            props: {
              variant: 'body1',
              component: 'small',
            },
          },
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};
