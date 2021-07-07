import { onlineManager } from 'react-query';
import { useSnackbar } from '../../containers/contexts/snackbar';

type UseHandleApiErrorReturnType = (error: Error, errorMessage: string) => void;

export const useHandleApiError = (): UseHandleApiErrorReturnType => {
  const [, snackbarDispatch] = useSnackbar();
  const isOnline = onlineManager.isOnline();
  if (!isOnline) {
    snackbarDispatch({
      type: 'open',
      payload: {
        severity: 'warning',
        message: 'インターネット接続がありません',
      },
    });
  }
  const handleApiError = (error: Error, errorMessage: string) => {
    console.error(error, errorMessage);
    snackbarDispatch({
      type: 'open',
      payload: { severity: 'error', message: errorMessage },
    });
  };

  return handleApiError;
};
