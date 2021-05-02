import { Box } from '@material-ui/core';
import React from 'react';
import { InfoDetailForm } from './InfoDetailForm';
import { NotificationForm } from './NotificationForm';

export const OrchestraForms: React.VFC = () => (
  <>
    <NotificationForm />
    <Box mt={5} />
    <InfoDetailForm />
  </>
);
