import { Box } from '@material-ui/core';
import React from 'react';
import { OrchestraFormInfo } from '../../ui/OrchestraFormInfo/OrchestraFormInfo';
import { OrchestraFormNotification } from '../../ui/OrchestraFormNotification/OrchestraFormNotification';

export const OrchestraForms: React.VFC = () => (
  <>
    <OrchestraFormNotification />
    <Box mt={5} />
    <OrchestraFormInfo />
  </>
);
