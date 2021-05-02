import { Container, Box } from '@material-ui/core';
import React from 'react';

interface Props {
  index: number;
  value: number;
}

export const TabPanel: React.FC<Props> = ({ index, value, children }) => (
  <div hidden={value !== index}>
    {value === index && (
      <Container maxWidth={false}>
        <Box py={2}>{children}</Box>
      </Container>
    )}
  </div>
);
