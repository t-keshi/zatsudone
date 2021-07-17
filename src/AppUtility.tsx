import { Snackbar } from '@material-ui/core';
import React from 'react';
import { useSnackbar } from './containers/contexts/snackbar';

export const AppUtility: React.VFC = () => {
  const [snackbarState, snackbarDispatch] = useSnackbar();

  return (
    <Snackbar
      open={snackbarState.isOpen}
      onClose={() => snackbarDispatch({ type: 'close' })}
      message={snackbarState.message}
      autoHideDuration={5000}
    />
  );
};
