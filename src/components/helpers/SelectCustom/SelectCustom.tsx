import { MenuProps, Select, SelectProps } from '@material-ui/core';
import React from 'react';

interface StyleProps {
  displayRowsCount?: number;
  align?: 'left' | 'center' | 'right';
}

type Props = StyleProps & SelectProps;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const SelectCustom: React.VFC<Props> = ({
  children,
  displayRowsCount,
  align = 'left',
  ...rest
}) => {
  const defaultMenuProps: Partial<MenuProps> = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: align,
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: align,
    },
    PaperProps: {
      style: {
        maxHeight:
          displayRowsCount === undefined
            ? 'auto'
            : ITEM_HEIGHT * displayRowsCount + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <Select
      MenuProps={defaultMenuProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Select>
  );
};
