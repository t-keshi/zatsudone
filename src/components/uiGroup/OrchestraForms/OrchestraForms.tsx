import { Box } from '@material-ui/core';
import React from 'react';
import { OrchestraDetailInfoForm } from '../../ui/OrchestraDetailInfo/OrchestraDetailInfoForm';
import { OrchestraDescriptionForm } from '../../ui/OrchestraDiscription/OrchestraDescriptionForm';
import { OrchestraFormNotification } from '../../ui/OrchestraFormNotification/OrchestraFormNotification';

export const OrchestraForms: React.VFC = () => (
  <>
    <OrchestraDescriptionForm />
    <Box mt={5} />
    <OrchestraFormNotification />
    <Box mt={5} />
    <OrchestraDetailInfoForm />
  </>
);
