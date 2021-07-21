import { Box } from '@material-ui/core';
import React from 'react';
import { ContainerSpacer } from '../ContainerSpacer/ContainerSpacer';

interface Props {
  index: number;
  value: number;
  gutter?: boolean;
  unmountOnSwitch?: boolean;
}

export const TabPanel: React.FC<Props> = ({
  index,
  value,
  children,
  gutter = true,
  unmountOnSwitch = false,
}) => {
  if (unmountOnSwitch && value !== index) {
    return null;
  }

  return (
    <div hidden={value !== index}>
      {value === index && gutter ? (
        <ContainerSpacer py={2}>{children}</ContainerSpacer>
      ) : (
        <Box py={2}>{children}</Box>
      )}
    </div>
  );
};
