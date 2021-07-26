import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useSnackbar } from './containers/contexts/snackbar';

export const AppUtility: React.VFC = () => {
  const [snackbarState, snackbarDispatch] = useSnackbar();

  return (
    <Snackbar
      open={snackbarState.isOpen}
      onClose={() => snackbarDispatch({ type: 'close' })}
      autoHideDuration={5000}
    >
      <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
    </Snackbar>
  );
};
