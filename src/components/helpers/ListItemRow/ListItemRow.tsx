/* eslint-disable react/jsx-props-no-spreading */
import { ListItem, ListItemText, ListItemTextProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface StyleProps {
  rowWidth: number;
}

interface Props extends StyleProps {
  label: string;
  value: string;
  listItemTextProps?: ListItemTextProps<'span', 'p' | 'a'>;
}

const useStyles = makeStyles(() => ({
  listItemText: {
    display: 'inline-flex',
    width: '100%',
    maxWidth: ({ rowWidth }: StyleProps) => rowWidth,
  },
  label: {
    width: '50%',
  },
  value: {
    width: '50%',
  },
}));

export const ListItemRow: React.VFC<Props> = ({
  label,
  value,
  rowWidth,
  listItemTextProps,
}) => {
  const classes = useStyles({ rowWidth });

  return (
    <ListItem dense>
      <ListItemText
        classes={{
          root: classes.listItemText,
          primary: classes.label,
          secondary: classes.value,
        }}
        primary={label}
        secondary={value}
        {...listItemTextProps}
      />
    </ListItem>
  );
};
