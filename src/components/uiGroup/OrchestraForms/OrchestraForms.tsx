import { Box } from '@material-ui/core';
import React from 'react';
import { OrchestraDetailInfoForm } from '../../ui/OrchestraDetailInfo/OrchestraDetailInfoForm';
import { OrchestraDescriptionForm } from '../../ui/OrchestraDiscription/OrchestraDescriptionForm';
import { OrchestraNotificationForm } from '../../ui/OrchestraNotification/OrchestraNotificationForm';

export const OrchestraForms: React.VFC = () => (
  <>
    <OrchestraDescriptionForm />
    <Box mt={5} />
    <OrchestraNotificationForm />
    <Box mt={5} />
    <OrchestraDetailInfoForm />
  </>
);
